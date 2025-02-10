import React from 'react';

function QuizBox({ title, onClick }) {
  return (
    <div className="quiz-box-item" onClick={onClick}>
      <h4>{title}</h4>
    </div>
  );
}

export default QuizBox;
