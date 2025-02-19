import '../styles/MainHealth.css'

function MainHealth({pageHandler}){
  return(
    <section className="main-health">
      <div className="main-place-top main-health-top">
        <h2>오늘의 건강 예측 정보</h2>
        <p onClick={()=>pageHandler('/healthInfo')}></p>
      </div>
      <article className="main-health-box">
          <div className="main-health-content">
              <p className="main-health-text-box">
                <span>오늘의<strong>"내위치"</strong>미세먼지 농도를 기반으로 예상되는<span className='br'></span> 비염,천식,아토피 환자 수를 확인하세요.</span> <br/>
                <small>과거 데이터를 분석하여 지역별·연령대별 건강 영향을 예측합니다.</small>
              </p>
              <div className="main-health-count-box">
                <div>
                  <p>비염</p>
                  <p>10명</p>
                </div>
                <div>
                  <p>천식</p>
                  <p>5명</p>
                </div>
                <div>
                  <p>아토피</p>
                  <p>5명</p>
                </div>
              </div>
              <div className='main-health-warning'>
                오늘은 내 아이의 <span>"비염"</span> 주의해 주세요.
              </div>
          </div>
      </article>
    </section>
  )
}


export default MainHealth;