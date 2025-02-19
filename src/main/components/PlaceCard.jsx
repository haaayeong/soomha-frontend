import '../styles/PlaceCard.css'
import { getDustLevel, getUltraDustLevel, getDustBarWidth } from '../../utils/getDustUtils';

function PlaceCard({ bool, pageHandler, place }) {
  if (!place) return <div>로딩 중...</div>;

  const { weather } = place;
  const tempMin = weather?.tempMin ?? '점검중';
  const tempMax = weather?.tempMax ?? '점검중';
  const weatherIcon = weather?.icon ?? 'fa-cloud';
  const pop = weather?.pop ?? '점검중';


  const pm10Level = getDustLevel(place.pm10);
  const pm25Level = getUltraDustLevel(place.pm25);

  const pm10BarWidth = getDustBarWidth(place.pm10, 90);  // PM10의 최대값은 150
  const pm25BarWidth = getDustBarWidth(place.pm25, 45);   // PM2.5의 최대값은 75

  return (
    // 나중에 pageHandler 각 장소의 아이디로 변경
    <div className="place-card" onClick={() => pageHandler(`/whereToGo/${place.id}`)}>
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
          <i className={`${weatherIcon}`}></i>
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
              <p>{place.pm10}µg/m³</p>
            </div>
            <div className="dust-icon-box">
              <p>{pm10Level.level}</p>
              <p><i className={`fa-solid ${pm10Level.icon}`} style={{color:pm10Level.color}}></i></p>
            </div>
            <div className="dust-line-box">
              <p style={{ width: `${pm10BarWidth}%`,background:`linear-gradient(to right, ${pm10Level.color}, transparent` }}></p>
            </div>
          </div>
          <div className="ultra-fine-dust-box">
            <div className='dust-text-box'>
              <p>초미세먼지</p>
              <p>{place.pm25} µg/m³</p>
            </div>
            <div className="dust-icon-box">
              <p>{pm25Level.level}</p>
              <p><i className={`fa-solid ${pm25Level.icon}`} style={{color:pm25Level.color}}></i></p>
            </div>
            <div className="dust-line-box">
              <p style={{ width: `${pm25BarWidth}%`,background:`linear-gradient(to right, ${pm25Level.color}, transparent` }}></p>
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