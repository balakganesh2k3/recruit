import React from 'react';

function QuestionNavigation({ currentQuestion, setCurrentQuestion, totalQuestions }) {
  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="buttons">
      <button className="back" onClick={handleBack}>
        Back
      </button>
      <button className="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default QuestionNavigation;
