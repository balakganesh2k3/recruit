import React from "react";
import { useNavigate } from "react-router-dom";

function QuestionNavigation({
  currentQuestion,
  setCurrentQuestion,
  totalQuestions,
  onSubmit,
}) {
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

  const navigate = useNavigate();
  const handleOnSubmit = () =>{
    navigate("/submit"); 
  }

  return (
    <div className="buttons">
      <button
        className="back"
        onClick={handleBack}
        disabled={currentQuestion === 0} // Disable back on the first question
      >
        Back
      </button>
      {currentQuestion < totalQuestions - 1 ? (
        <button className="next" onClick={handleNext}>
          Next
        </button>
      ) : (
        <button className="submit" onClick={handleOnSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}

export default QuestionNavigation;

