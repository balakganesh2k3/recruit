/* eslint-disable react/prop-types */
// Results.js
import React from 'react'
import './testresult.css'

const Results = ({ score, maxScore }) => {
  const isPass = score >= maxScore * 0.4
  const status = isPass ? 'Pass' : 'Fail'

  return (
    <div className="results-container">
      <h2 className="results-title">Test Results</h2>
      <p className="results-score">
        Score: {score} / {maxScore}
      </p>
      <p className={`results-status ${isPass ? 'pass' : 'fail'}`}>Status: {status}</p>
      <p className="results-message">
        {isPass ? 'Congratulations! You passed the test.' : 'Better luck next time!'}
      </p>
    </div>
  )
}

export default Results
