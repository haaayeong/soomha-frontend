import '../styles/PlaceCard.css'

function PlaceCard({ bool, pageHandler, place }) {
  if (!place) return <div>로딩 중...</div>;

  const { weather } = place;
  const tempMin = weather?.tempMin ?? 'N/A';
  const tempMax = weather?.tempMax ?? 'N/A';
  const weatherIcon = weather?.icon ?? 'fa-cloud';
  const pop = weather?.pop ?? 'N/A';


  return (
    // 나중에 pageHandler 각 장소의 아이디로 변경
    <div className="place-card" onClick={() => pageHandler('/whereToGo/1')}>
      <div className="place-card-img-box">
        <img src={place.thumbnail} alt="장소이미지" />
      </div>
      <h3>{place.pfctNm}</h3>
      <div className="main-weather-box">
        <div className="weather-box">
          <div className="temp-box">
            <p>기온</p>
            <p>{tempMin} / {tempMax} ℃</p>
          </div>
          <i className={`fa-solid ${weatherIcon}`}></i>
        </div>
        <div className="weather-box">
          <p>강수확률</p>
          <p>{pop}</p>
        </div>
      </div>

      {bool && (
        <div className="main-dust-box">
          <div className="fine-dust-box">
            <div className='dust-text-box'>
              <p>미세먼지</p>
              <p>30 µg/m³</p>
            </div>
            <div className="dust-icon-box">
              <p>매우좋음</p>
              <p><i className="fa-solid fa-face-smile-beam"></i></p>
            </div>
            <div className="dust-line-box">
              <p></p>
            </div>
          </div>
          <div className="ultra-fine-dust-box">
            <div className='dust-text-box'>
              <p>초미세먼지</p>
              <p>30 µg/m³</p>
            </div>
            <div className="dust-icon-box">
              <p>매우좋음</p>
              <p><i className="fa-solid fa-face-smile-beam"></i></p>
            </div>
            <div className="dust-line-box">
              <p></p>
            </div>
          </div>
        </div>
      )}

      <div className="comment-like">
        <div className="main-comment-box">
          <i className="fa-solid fa-comment fa-flip-horizontal"></i>
          <span>15</span>
        </div>
        <div className="main-like-box">
          <i className="fa-solid fa-heart"></i>
          <span>131</span>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard;