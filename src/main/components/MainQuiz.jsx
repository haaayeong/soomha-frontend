import '../styles/MainQuiz.css'

function MainQuiz(){
  return(
    <section className="main-quiz">
      <div className="main-place-top main-quiz-top">
        <h2>오늘의 퀴즈</h2>
        <p></p>
      </div>
      <article className="main-quiz-box">
        <div className='main-quiz-text'>지름이 2.5㎛ 이하의 먼지를 미세먼지라고 한다.</div>
        <div className="ox-box">
          <div className="o-box">
            <p></p>
          </div>
          <div className="x-box">
            <p></p>
            <p></p>
          </div>
        </div>
      </article>
    </section>
  )
}

export default MainQuiz;