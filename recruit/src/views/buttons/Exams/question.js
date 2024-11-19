import React from "react";

function Question({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="question-text">
      <p>{question.text}</p>
      <div className="options">
        {question.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option} // Highlight selected answer
              onChange={() => onAnswerSelect(option)} // Handle answer selection
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;

