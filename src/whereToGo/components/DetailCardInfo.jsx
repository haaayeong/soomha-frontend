import { useEffect, useState } from "react";
import { fetchWeatherData } from "../../utils/weatherUtils";
import { getDustLevel, getUltraDustLevel, getDustBarWidth } from '../../utils/getDustUtils';

function DetailCardInfo({ place }) {
  const [weather, setWeather] = useState(null);


  const pm10Level = getDustLevel(place.pm10);
  const pm25Level = getUltraDustLevel(place.pm25);

  const pm10BarWidth = getDustBarWidth(place.pm10, 90);  // PM10의 최대값은 150
  const pm25BarWidth = getDustBarWidth(place.pm25, 45);   // PM2.5의 최대값은 75

  useEffect(() => {
    const getWeatherData = async () => {
      if (place && place.latCrtsVl && place.lotCrtsVl) {
        try {
          const weatherData = await fetchWeatherData(place.latCrtsVl, place.lotCrtsVl); // 날씨 데이터 요청
          setWeather(weatherData);  // 날씨 데이터 상태에 저장
        } catch (error) {
          console.error("날씨 정보 가져오기 실패:", error);
        }
      }
    };

    getWeatherData();  // 컴포넌트가 마운트되거나 place가 변경될 때마다 날씨 데이터 호출
  }, [place]);  // place가 변경될 때마다 실행됨

  return (
    <div className="where-card-info">
      <p className="card-title">{place.pfctNm}</p>
      <p className="card-addr">{place.ronaAddr}</p>
      <div className="card-filter">
        <span>{place.idrodrCdNm}</span>
        <span>{place.prvtPblcYnCdNm}</span>
        <span>{place.instlPlaceCdNm}</span>
      </div>

      {weather &&
        <div className="card-weather-box">
          <div className="card-weather card-weather-temp">
            <p>기온</p>
            <i className={`${weather.icon}`}></i>
            <p>{weather.tempMin} / {weather.tempMax}°C</p>
          </div>
          <div className="card-weather card-weather-precip">
            <p>강수확률</p>
            <p>{weather.pop}</p>
          </div>
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
              <p>{place.pm25}µg/m³</p>
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
      }

    </div>
  )
}

export default DetailCardInfo;