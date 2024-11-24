/* eslint-disable react/prop-types */
import React from 'react'

function QuestionNavigation({ currentQuestion, setCurrentQuestion, totalQuestions, onSubmit }) {
  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(true) // Pass `true` for navigating forward
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(false) // Pass `false` for navigating backward
    }
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
        <button className="submit" onClick={onSubmit}>
          Submit
        </button>
      )}
    </div>
  )
}

export default QuestionNavigation
