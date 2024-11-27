import React from 'react'
import { useNavigate } from 'react-router-dom'
import './codstart.css' // Add CSS for styling

function CodeStartPage() {
  const navigate = useNavigate()

  const handleStartExam = () => {
    navigate('/code') // Navigate to the coding exam page
  }

  return (
    <div className="code-start-page">
      <h1>Welcome to the Coding Exam</h1>
      <p>Please read the instructions carefully before starting the exam:</p>
      <ul>
        <li>There are multiple coding questions in this exam.</li>
        <li>You will have a limited amount of time to complete all questions.</li>
        <li>Make sure to write efficient and clean code.</li>
        <li>You cannot navigate back after starting the exam.</li>
      </ul>
      <button className="start-exam-button" onClick={handleStartExam}>
        Start Exam
      </button>
    </div>
  )
}

export default CodeStartPage
