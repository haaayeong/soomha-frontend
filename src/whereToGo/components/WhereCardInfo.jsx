import { getDustLevel, getUltraDustLevel, getDustBarWidth } from '../../utils/getDustUtils';

function WhereCardInfo({ isNextWeek, place }) {

  const { weather } = place;
  const tempMin = weather?.tempMin ?? '점검';
  const tempMax = weather?.tempMax ?? '';
  const weatherIcon = weather?.icon ?? 'fa-cloud';
  const pop = weather?.pop ?? '점검중';


  const pm10Level = getDustLevel(place.pm10);
  const pm25Level = getUltraDustLevel(place.pm25);

  const pm10BarWidth = getDustBarWidth(place.pm10, 90);  // PM10의 최대값은 150
  const pm25BarWidth = getDustBarWidth(place.pm25, 45);   // PM2.5의 최대값은 75
  return (
    <div className="where-card-info">
      <p className="card-title">{place.pfctNm}</p>
      <p className="card-addr">{place.ronaAddr}</p>
      <div className="card-filter">
        <span>{place.idrodrCdNm}</span>
        <span>{place.prvtPblcYnCdNm}</span>
        <span>{place.instlPlaceCdNm}</span>
      </div>

      <div className="card-weather-box">
        {!isNextWeek && (
          <>
            <div className="card-weather card-weather-temp">
              <p>기온</p>
              <i className={`${weatherIcon}`}></i>
              <p>{tempMin} / {tempMax} ℃</p>
            </div>
            <div className="card-weather card-weather-precip">
              <p>강수확률</p>
              <p>{pop}</p>
            </div>
          </>
        )}

        <div className="card-weather card-weather-dust">
          <div className="dust-index">
            <p>미세먼지</p>
            <p>{place.pm10}µg/m³</p>
          </div>
          <div className="dust-icon">
            <p>{pm10Level.level}</p>
            <i className={`fa-solid ${pm10Level.icon}`} style={{ color: pm10Level.color }}></i>
          </div>
          <div className="dust-line">
            <p style={{ width: `${pm10BarWidth}%`, background: `linear-gradient(to right, ${pm10Level.color}, transparent` }}></p>
          </div>
        </div>
        <div className="card-weather card-weather-dust">
          <div className="dust-index">
            <p>초미세먼지</p>
            <p>{place.pm25} µg/m³</p>
          </div>
          <div className="dust-icon">
            <p>{pm25Level.level}</p>
            <i className={`fa-solid ${pm25Level.icon}`} style={{ color: pm25Level.color }}></i>
          </div>
          <div className="dust-line">
            <p style={{ width: `${pm25BarWidth}%`, background: `linear-gradient(to right, ${pm25Level.color}, transparent` }}></p>
          </div>
        </div>
      </div>

      <div className="comment-like where-cl">
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

export default WhereCardInfo;