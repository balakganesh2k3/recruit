import React from 'react';

function Question({ question }) {
  return (
    <div className="question-text">
      <p>{question.text}</p>
      <div className="options">
        {question.options.map((option, index) => (
          <label key={index}>
            <input type="radio" name="answer" value={option} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;
