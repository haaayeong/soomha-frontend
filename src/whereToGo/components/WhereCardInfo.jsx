function WhereCardInfo({ isNextWeek }) {
  return (
    <div className="where-card-info">
      <p className="card-title">서울 롯데월드</p>
      <p className="card-addr">서울특별시 송파구 올림픽로 240</p>
      <div className="card-filter">
        <span>실내</span>
        <span>민간</span>
        <span>놀이제공영업소</span>
      </div>

      <div className="card-weather-box">
        {!isNextWeek && (
          <>
            <div className="card-weather card-weather-temp">
              <p>기온</p>
              <i className="fa-solid fa-sun"></i>
              <p>-5 / 6 도</p>
            </div>
            <div className="card-weather card-weather-precip">
              <p>강수확률</p>
              <p>10%</p>
            </div>
          </>
        )}

        <div className="card-weather card-weather-dust">
          <div className="dust-index">
            <p>미세먼지</p>
            <p>30 µg/m³</p>
          </div>
          <div className="dust-icon">
            <p>매우좋음</p>
            <i className="fa-solid fa-face-smile"></i>
          </div>
          <div className="dust-line">
            <p></p>
          </div>
        </div>
        <div className="card-weather card-weather-dust">
          <div className="dust-index">
            <p>초미세먼지</p>
            <p>30 µg/m³</p>
          </div>
          <div className="dust-icon">
            <p>매우좋음</p>
            <i className="fa-solid fa-face-smile"></i>
          </div>
          <div className="dust-line">
            <p></p>
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