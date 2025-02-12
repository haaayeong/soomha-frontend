import { useState } from 'react';
import QuizBox from './QuizBox';
import '../styles/QuizContent.css';

function QuizContent() {
  const [selectedQuiz, setSelectedQuiz] = useState(null); // 클릭된 퀴즈 저장

  // 레벨에 따른 퀴즈 주제들
  const quizData = {
    lv01: [
      { title: '미세먼지의 단위', question: '미세먼지의 단위는 무엇인가요?', options: ['μg/m³', 'ppm', 'g/m³'] },
      { title: '미세먼지의 원인', question: '미세먼지의 주요 원인은 무엇인가요?', options: ['자동차 배출가스', '산업 공장', '둘 다'] },
      { title: '미세먼지가 인체에 미치는 영향', question: '미세먼지는 인체에 어떤 영향을 미치나요?', options: ['호흡기 질환', '심장 질환', '모두'] },
      { title: '미세먼지 예방법', question: '미세먼지를 예방하는 방법은 무엇인가요?', options: ['마스크 착용', '외출 자제', '둘 다'] },
      { title: '미세먼지와 날씨의 관계', question: '미세먼지와 날씨는 어떤 관계가 있나요?', options: ['비가 올 때 미세먼지 농도가 낮다', '미세먼지는 날씨와 관계없다', '비가 오지 않을 때 미세먼지 농도가 높다'] },
      { title: '미세먼지 측정 방법', question: '미세먼지 측정 방법은 무엇인가요?', options: ['PM10 측정', 'CO 측정', 'CO2 측정'] },
      { title: '미세먼지와 초미세먼지의 차이', question: '미세먼지와 초미세먼지의 차이는 무엇인가요?', options: ['입자의 크기', '미세먼지의 농도', '초미세먼지가 더 큰 입자'] },
      { title: '미세먼지 정책과 대책', question: '미세먼지에 대한 정부의 정책은 무엇인가요?', options: ['배출가스 규제 강화', '산업 공장 단속 강화', '둘 다'] },
    ],
    // lv02 ~ lv05에 대한 데이터를 추가할 수 있음
  };

  const handleClick = (quizIndex) => {
    setSelectedQuiz(quizData.lv01[quizIndex]); // 클릭된 퀴즈의 내용을 상태에 저장
  };

  const handleAnswer = (answer) => {
    alert(`선택한 답: ${answer}`);
  };

  const handleBack = () => {
    setSelectedQuiz(null); // 뒤로가기 버튼을 클릭하면 문제 리스트로 돌아감
  };

  return (
    <section className="quiz-content">
      <h3>문제를 풀어 레벨을 올려보세요!</h3>
      <div className="difficulty">
        <label htmlFor="difficulty-select">난이도</label>
        <select id="difficulty-select" className="difficulty-select">
          <option value="lv01">Lv01</option>
          <option value="lv02">Lv02</option>
          <option value="lv03">Lv03</option>
          <option value="lv04">Lv04</option>
          <option value="lv05">Lv05</option>
        </select>
      </div>

      <article className={`quiz-box ${selectedQuiz === null ? '':'active'}`}>
        {selectedQuiz === null ? (
          // 클릭된 퀴즈가 없으면 8개의 박스만 보여줌
          quizData.lv01.map((quiz, index) => (
            <QuizBox key={index} title={quiz.title} onClick={() => handleClick(index)} />
          ))
        ) : (
          // 클릭된 퀴즈가 있으면 해당 퀴즈만 보여줌
          <div className="quiz-question">
            <button className="back-button" onClick={handleBack}>뒤로가기</button>
            <p>{selectedQuiz.question}</p>
            <div className="quiz-options">
              {selectedQuiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="quiz-button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </section>
  );
}

export default QuizContent;
