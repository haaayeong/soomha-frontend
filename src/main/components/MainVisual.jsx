import '../styles/MainVisual.css'

function MainVisual() {
  return (
    <div className="main-visual">
      <figure>
        <p><img src="/images/banner.jpg" alt="" /></p>
        <figcaption>
          <span>내일<strong>"내위치"</strong> 미세먼지 농도가 <strong>"좋음</strong>으로 예측되고 있어요!</span>
          <span>현장학습을 준비해 주세요!</span>
        </figcaption>
      </figure>
    </div>
  )
}

export default MainVisual;