import React from 'react'
import { useNavigate } from 'react-router-dom'
import './testStart.css'

const TestStartPage = () => {
  const navigate = useNavigate()

  const handleStartTest = () => {
    navigate('/apexam')
  }

  return (
    <div className="test-start-page">
      <div className="test-instructions">
        <h2>Instructions</h2>
        <ul>
          <li>Please ensure you are in a quiet and distraction-free environment.</li>
          <li>Avoid using your phone or any other electronic devices during the test.</li>
          <li>Keep all necessary materials, such as pens and paper, nearby.</li>
          <li>Once started, you may not pause the test, so plan accordingly.</li>
          <li>Read each question carefully before answering.</li>
          <li>Manage your time well, and try not to spend too long on any single question.</li>
        </ul>
      </div>
      <div className="test-content">
        <h1>Get Ready to Start Your Test!</h1>
        <p>Prepare yourself and start the test when you are ready.</p>
        <button className="start-test-button" onClick={handleStartTest}>
          Start Test
        </button>
      </div>
    </div>
  )
}

export default TestStartPage
