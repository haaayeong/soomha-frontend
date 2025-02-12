import { useEffect, useRef, useState } from 'react';
import Comment from './Comment';
import '../styles/DetailWhere.css'
import DetailCardInfo from './DetailCardInfo';
import CommentInput from './CommentInput';
import { setupMap } from '../../utils/kakaoSearch';
import { useNavigate } from 'react-router-dom';

function DetailWhere() {
  const [comments, setComments] = useState([]);  // 댓글 목록 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const subImageContainerRef = useRef(null);  // 썸네일 스크롤을 조작할 ref
  const navigate = useNavigate();

  const images = [
    "/images/thumb.jpg",
    "/images/thumb2.jpg",
    "/images/thumb3.jpg",
    "/images/thumb4.jpg",
    "/images/thumb5.jpg"
  ]; // 이미지 목록 (예시)

  useEffect(() => {
    const address = '서울 송파구 올림픽로 240'; // 디테일 페이지에 맞는 주소로 검색
    setupMap(address); // 주소를 넘겨서 지도 생성
  }, []);

  useEffect(() => {
    // 썸네일 영역을 클릭된 이미지로 스크롤
    if (subImageContainerRef.current) {
      const targetThumbnail = subImageContainerRef.current.children[currentImageIndex];
      targetThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest'  });
    }
  }, [currentImageIndex]);

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
      <button className='detail-back'onClick={handleGoBack}>
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
          {images.map((image, index) => (
            <p
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={index === currentImageIndex ? 'active' : ''}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </p>
          ))}
        </div>
      </article>


      <article className="detail-dash-board">
        <DetailCardInfo />
      </article>

      <article className="detail-place-info">
        {/* 상세정보 섹션 */}
        <div className="detail-info">
          <h4>🏡 상세정보</h4>
          <ul>
            <li><strong>시설명:</strong> 세라젬웰파크 잠실롯데월드점</li>
            <li><strong>시설 번호:</strong> 587590</li>
            <li><strong>설치 장소:</strong> 놀이제공영업소</li>
            <li><strong>운영 상태:</strong> 🟢 운영 중</li>
            <li><strong>의무 여부:</strong> 비의무 시설</li>
            <li><strong>공공/민간 여부:</strong> 민간 시설</li>
          </ul>
        </div>

        {/* 위치정보 섹션 */}
        <div className="location-info">
          <h4>🗺️ 위치 정보</h4>
          <ul>
            <li><strong>주소:</strong> 서울 송파구 올림픽로 240</li>
            <li><strong>상세 위치:</strong> 아이스링크 어드벤처동 지하 3층 4, 7호</li>
            <li>
              <div id="detail-map"></div>
            </li>
          </ul>
        </div>

        {/* 운영 및 관리 정보 섹션 */}
        <div className="operation-info">
          <h4>✅ 운영 및 관리 정보</h4>
          <ul>
            <li><strong>설치일:</strong> 2023년 4월 19일</li>
            <li><strong>시설 면적:</strong> 437.36㎡</li>
            <li><strong>실내/실외:</strong> 실내 시설</li>
          </ul>
        </div>
      </article>

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