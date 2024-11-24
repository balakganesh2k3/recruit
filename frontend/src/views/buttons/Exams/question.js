/* eslint-disable react/prop-types */
import React from 'react'

function Question({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="question-text">
      <p>{question.questionText}</p> {/* Display question text */}
      <div className="options">
        {question.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option} // Mark selected option
              onChange={() => onAnswerSelect(option)} // Handle selection
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

export default Question
