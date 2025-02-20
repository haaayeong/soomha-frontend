import { useState } from 'react';
import QuizBox from './QuizBox';
import '../styles/QuizContent.css';

function QuizContent() {
  const [currentLevel, setCurrentLevel] = useState('lv01'); // 현재 레벨
  const [selectedQuiz, setSelectedQuiz] = useState(null); // 선택된 문제
  const [answeredQuestions, setAnsweredQuestions] = useState(0); // 푼 문제 개수
  const [selectedOption, setSelectedOption] = useState(null); // 객관식 선택 답
  const [result, setResult] = useState(null); // 정답/오답 상태
  const [clearedQuestions, setClearedQuestions] = useState({}); // 문제별 클리어 상태
  

  const quizData = {
    lv01: [
      { title: '초미세먼지 크기', question: '초미세먼지(PM2.5)의 크기는?', options: ['2.5μm 이하', '10μm 이하', '1μm 이하'], answer: '2.5μm 이하' },
      { title: '미세먼지 예보 기준', question: '미세먼지 나쁨 기준은?', options: ['50μg/m³ 이상', '100μg/m³ 이상', '200μg/m³ 이상'], answer: '50μg/m³ 이상' },
      { title: '미세먼지가 우리 몸의 미치는 영향', question: '미세먼지는 우리 몸의 어디에 가장 나쁜 영향을 줄까요?', options: ['머리카락', '손톱', '눈과 코, 폐', '발가락'], answer: '눈과 코, 폐' },
      { title: '미세먼지를 줄이기 위한 일', question: '미세먼지를 줄이기 위해 할 수 있는 일이 아닌 것은?', options: ['나무를 많이 심기', '자동차 대신 대중교통 이용하기', '쓰레기를 태우기', '전기를 아껴 쓰기'], answer: '쓰레기를 태우기' },
      { title: '미세먼지 발생시 보이는 하늘', question: '미세먼지가 심한 날 하늘은 어떻게 보일까요?', options: ['맑고 파란색', '뿌옇고 흐린 색', '무지개색', '반짝반짝 빛나는 색'], answer: '뿌옇고 흐린 색' },
      { title: '미세먼지가 나쁜이유', question: '미세먼지는 왜 나쁠까요?', options: ['공기를 깨끗하게 해주기 때문', '눈, 코, 목을 아프게 하고 숨쉬기 어렵게 만들기 때문', '친구들과 더 많이 놀게 해주기 때문', '미세먼지가 많으면 더운 날씨가 시원해지기 때문'], answer: '눈, 코, 목을 아프게 하고 숨쉬기 어렵게 만들기 때문' },
      { title: '미세먼지와 음식', question: '미세먼지가 많은 날, 우리가 먹으면 좋은 음식은?', options: ['신선한 과일과 채소', '사탕과 초콜릿', '감자튀김과 햄버거', '탄산음료와 아이스크림'], answer: '신선한 과일과 채소' },
      { title: '미세먼지 확인방법', question: '미세먼지를 확인할 수 있는 방법은?', options: ['날씨 앱이나 뉴스에서 확인하기', '친구한테 물어보기', '그냥 하늘을 보고 느낌으로 판단하기', '창문을 열고 공기를 직접 마셔보기'], answer: '날씨 앱이나 뉴스에서 확인하기' },

    ],

    lv02: [
      {
        title: '미세먼지는 건강에 좋다?',
        question: '미세먼지는 건강에 좋다?',
        options: ['O', 'X'],
        answer: 'X',
        explanation: '미세먼지는 건강에 해로워요. 특히 호흡기 질환을 유발할 수 있습니다.'
      },
      {
        title: '마스크는 미세먼지 차단에 효과적이다?',
        question: '마스크는 미세먼지 차단에 효과적이다?',
        options: ['O', 'X'],
        answer: 'O',
        explanation: 'KF94 마스크는 초미세먼지를 효과적으로 차단해줍니다.'
      },
      {
        title: '식물도 미세먼지를 흡수하여 공기를 깨끗하게 만드는 역할을 한다.',
        question: '식물도 미세먼지를 흡수하여 공기를 깨끗하게 만드는 역할을 한다.',
        options: ['O', 'X'],
        answer: 'O',
        explanation: '식물은 공기 중의 먼지를 흡수하여 공기를 깨끗하게 만들어요.'
      },
      {
        title: '숲이나 나무가 많은 곳에서는 미세먼지가 잘 쌓이지 않고 공기가 더 깨끗할 수 있다.?',
        question: '숲이나 나무가 많은 곳에서는 미세먼지가 잘 쌓이지 않고 공기가 더 깨끗할 수 있다.',
        options: ['O', 'X'],
        answer: 'O',
        explanation: '나무와 숲은 공기를 정화하는 역할을 해서 미세먼지를 줄이는 데 도움을 줄 수 있어요.'
      },
      {
        title: '비가 온 다음 날에는 공기가 깨끗해질 가능성이 높다.',
        question: '비가 온 다음 날에는 공기가 깨끗해질 가능성이 높다.',
        options: ['O', 'X'],
        answer: 'O',
        explanation: '비가 오면 공기 중의 먼지를 씻어내어 공기가 맑아질 수 있어요.'
      },
      {
        title: '미세먼지가 심한 날에는 창문을 닫고, 공기청정기 대신 선풍기를 돌리는 것이 좋다.',
        question: '미세먼지가 심한 날에는 창문을 닫고, 공기청정기 대신 선풍기를 돌리는 것이 좋다.',
        options: ['O', 'X'],
        answer: 'X',
        explanation: '공기청정기를 사용해야 미세먼지를 효과적으로 줄일 수 있어요.'
      },
      {
        title: '공기 중 미세먼지 농도가 높아지면 기온도 함께 상승한다.?',
        question: '공기 중 미세먼지 농도가 높아지면 기온도 함께 상승한다.',
        options: ['O', 'X'],
        answer: 'X',
        explanation: '미세먼지가 많아지면 햇빛이 차단되어 기온이 낮아질 수도 있습니다.'
      },
      {
        title: '고기와 생선을 구울 때 발생하는 연기에도 미세먼지가 포함될 수 있다.',
        question: '고기와 생선을 구울 때 발생하는 연기에도 미세먼지가 포함될 수 있다.',
        options: ['O', 'X'],
        answer: 'O',
        explanation: '고기나 생선을 구울 때 발생하는 연기 속에도 미세먼지가 포함될 수 있습니다.'
      },
      ],
      
      lv03: [
        { title: 'lv03은 추후 업로드 예정' },
        
      ],
  };

  const handleClick = (quizIndex) => {
    setSelectedQuiz({ ...quizData[currentLevel][quizIndex], index: quizIndex });
    setSelectedOption(null);
    setResult(null);
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === selectedQuiz.answer;
    const quizIndex = selectedQuiz.index;

    setResult({
      isCorrect,
      explanation: isCorrect ? '정답입니다!' : selectedQuiz.explanation,
    });

    setClearedQuestions((prev) => {
      const updated = { ...prev, [`${currentLevel}-${selectedQuiz.index}`]: isCorrect ? 'clear' : 'retry' };
      return updated;
    });

    if (isCorrect) {
      setAnsweredQuestions((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setSelectedQuiz(null);
    setResult(null);
  };

  const moveToNextLevel = () => {
    const levelOrder = ['lv01', 'lv02', 'lv03'];
    const currentIndex = levelOrder.indexOf(currentLevel);
    // 현재 레벨의 모든 문제를 클리어했는지 확인
    const allCleared = quizData[currentLevel].every((_, index) => clearedQuestions[`${currentLevel}-${index}`] === 'clear');

    if (allCleared) {
    if (currentIndex < levelOrder.length - 1) {
      setCurrentLevel(levelOrder[currentIndex + 1]);
      setAnsweredQuestions(0);
      setClearedQuestions({});
      setSelectedQuiz(null);
      setResult(null);
    } else {
      alert('모든 레벨을 완료했습니다!');
    }
  } else {
    alert('모든 문제를 맞혀야 다음 레벨로 이동할 수 있습니다!');
}
  };

return (
  <section className="quiz-content">
    <h3>문제를 풀어 레벨을 올려보세요!</h3>
    <p>현재 레벨: {currentLevel.toUpperCase()}</p>

    <article className={`quiz-box ${selectedQuiz === null ? '' : 'active'}`}>
      {selectedQuiz === null ? (
        <>
          {quizData[currentLevel].map((quiz, index) => {
            const status = clearedQuestions[`${currentLevel}-${index}`];
            return (
              <QuizBox key={index} title={quiz.title} onClick={() => handleClick(index)}>
                {status === 'clear' ? <span className="status clear">✅ Clear</span> : null}
                {status === 'retry' ? <span className="status retry">🔄 Re-challenge</span> : null}
              </QuizBox>
            );
          })}
          {answeredQuestions >= quizData[currentLevel].length && (
            <div className="next-level-container">
              <button className="next-level-button" onClick={moveToNextLevel}>
                다음 레벨로 이동
              </button>
            </div>
          )}
        </>
      ) : result === null ? (
        <div className="quiz-question">
          <button className="back-button" onClick={handleBack}>뒤로가기</button>
          <p>{selectedQuiz.question}</p>

          {currentLevel === 'lv01' ? (
            <div className="quiz-options">
              {selectedQuiz.options.map((option, index) => (
                <label key={index} className="multiple-choice-option">
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  {`${index + 1}. ${option}`}
                </label>
              ))}
              <button className="submit-answer" onClick={() => handleAnswer(selectedOption)}>
                답변 제출
              </button>
            </div>
          ) : currentLevel === 'lv02' ? (
            <div className="quiz-options ox-options">
              <button className="ox-button" onClick={() => handleAnswer('O')}>O</button>
              <button className="ox-button" onClick={() => handleAnswer('X')}>X</button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={`result-screen ${result.isCorrect ? 'correct' : 'incorrect'}`}>
          <h2>{result.isCorrect ? '✅ 정답입니다!' : '❌ 틀렸습니다!'}</h2>
          <p>{result.explanation}</p>
          <button className="back-button" onClick={handleBack}>돌아가기</button>
        </div>
      )}
    </article>
  </section>
);

}
export default QuizContent;