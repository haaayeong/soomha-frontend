import { useEffect, useRef, useState } from 'react';
import Comment from './Comment';
import '../styles/DetailWhere.css'
import DetailCardInfo from './DetailCardInfo';
import CommentInput from './CommentInput';
import { setupMap } from '../../utils/kakaoSearch';
import { useNavigate, useParams } from 'react-router-dom';

function DetailWhere() {
  const [comments, setComments] = useState([]);  // 댓글 목록 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const subImageContainerRef = useRef(null);  // 썸네일 스크롤을 조작할 ref
  const [images, setImages] = useState([]);  // 이미지 목록 상태

  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const params = useParams();
  const fetchPlace = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/place-detail/${params.pageNumber}`);
      const data = await response.json();
      setPlace(data);
    }
    catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchPlace();
  }, [params.pageNumber]);

  useEffect(() => {
    if (place && place.thumbnail) {
      // 썸네일이 없으면 빈 배열 설정
      if (place.thumbnail.length === 0) {
        setImages([]);
      } else {
        // 썸네일이 하나라도 배열로 처리
        setImages(Array.isArray(place.thumbnail) ? place.thumbnail.slice(0, 7) : [place.thumbnail]);
      }
    }
  }, [place]);  // place가 변경될 때 실행




  useEffect(() => {
    // const address = '서울 송파구 올림픽로 240'; // 디테일 페이지에 맞는 주소로 검색
    // setupMap(address); // 주소를 넘겨서 지도 생성
    if (place) {
      const lat = place?.latCrtsVl;
      const lng = place?.lotCrtsVl;
      const address = place?.ronaAddr;
      setupMap(address,lat,lng); // 주소를 넘겨서 지도 생성
    }

  }, [place]);

  useEffect(() => {
    if (subImageContainerRef.current && images.length > 0) {
      const targetThumbnail = subImageContainerRef.current.children[currentImageIndex];

      if (targetThumbnail) {
        targetThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentImageIndex, images]);  // `images`가 변경될 때만 실행

  const handleAddComment = (newCommentText) => {
    const newComment = {
      id: comments.length + 1,
      text: newCommentText,
      user: '햇님반어른이',  // 예시: 실제로는 로그인한 사용자 정보로 대체
      date: new Date().toLocaleDateString(),
      likes: 5,
    };
    setComments([...comments, newComment]);  // 새로운 댓글 추가
  };


  // 이미지 변경 함수
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // 다음 이미지로 이동
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // 이전 이미지로 이동
  };

  // 썸네일 클릭 처리 함수
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleGoBack = () => {
    navigate(-1); // -1은 이전 페이지로 돌아가라는 의미입니다.
  };

  return (
    <section className="detail-where">
      <button className='detail-back' onClick={handleGoBack}>
        <i className="fa-solid fa-chevron-left" ></i>뒤로가기
      </button>

      <article className="detail-img-box">
        <div className="detail-main-img">
          <img src={images[currentImageIndex]} alt="Main" />
          <button className="detail-img-btn-left" onClick={goToPrevImage}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="detail-img-btn-right" onClick={goToNextImage}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="detail-sub-img" ref={subImageContainerRef}>
          {images.length !== 1 && Array.isArray(images) && images.map((image, index) => (
            <p
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={index === currentImageIndex ? 'active' : ''}
            >
              {images.length}
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </p>
          ))}
        </div>
      </article>


      <article className="detail-dash-board">
        {place &&
          <DetailCardInfo place={place} />
        }
      </article>


      {place ? (
        <article className="detail-place-info">
          {/* 상세정보 섹션 */}
          <div className="detail-info">
            <h4>🏡 상세정보</h4>
            <ul>
              <li><strong>시설명:</strong> {place.pfctNm}</li>
              <li><strong>시설 번호:</strong> {place.pfctSn}</li>
              <li><strong>설치 장소:</strong> {place.instlPlaceCdNm}</li>
              <li>
                <strong>운영 상태:</strong>
                {place.operYnCdNm === "운영" ? (
                  <>
                    🟢 운영 중
                  </>
                ) : (
                  <>
                    🔴 이용 금지
                  </>
                )}
              </li>

              <li><strong>의무 여부:</strong> {place.dutyCdNm} 시설</li>
              <li><strong>공공/민간 여부:</strong> {place.prvtPblcYnCdNm} 시설</li>
            </ul>
          </div>

          {/* 위치정보 섹션 */}
          <div className="location-info">
            <h4>🗺️ 위치 정보</h4>
            <ul>
              <li><strong>주소:</strong> {place.ronaAddr}</li>
              {place.ronaDaddr === ''
                ? '' :
                <li><strong>상세 위치:</strong> {place.ronaDaddr}</li>
              }
              <li>
                <div id="detail-map"></div>
              </li>
            </ul>
          </div>

          {/* 운영 및 관리 정보 섹션 */}
          <div className="operation-info">
            <h4>✅ 운영 및 관리 정보</h4>
            <ul>
              <li>
                <strong>설치일:</strong>
                {place.instlYmd && (
                  <>
                    {place.instlYmd.slice(0, 4)}년 {place.instlYmd.slice(4, 6)}월 {place.instlYmd.slice(6, 8)}일
                  </>
                )}
              </li>
              <li><strong>실내/실외:</strong> {place.idrodrCdNm} 시설</li>
            </ul>
          </div>

        </article>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}

      <div className="detail-like">
        <button>
          <p>
            추천
            <i className="fa-solid fa-heart"></i>
          </p>
          <p>131</p>
        </button>
      </div>

      <article className="comment-box">
        <div className="comment-header">
          <h4>이용 후기 및 댓글</h4>
          <i className="fa-solid fa-comment fa-flip-horizontal"></i>
          <span>(101)</span>
        </div>
        <div className="best-comments">
          <Comment text="친구랑 같이 가서 사진만 300장 찍었어요! 📸 놀이기구보다 포토존이 더 재밌음 ㅋㅋ" user="햇님반어른이" date="2025.02.04" likes={50} />
        </div>
        <div className="comments">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              text={comment.text}
              user={comment.user}
              date={comment.date}
              likes={comment.likes}
            />
          ))}
          <CommentInput onSubmitComment={handleAddComment} />
        </div>
      </article>

    </section>
  )
}

export default DetailWhere;