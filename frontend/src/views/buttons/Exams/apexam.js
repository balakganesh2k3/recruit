import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './header'
import Question from './question'
import Timer from './timer'
import QuestionNavigation from './questionav'
import axios from 'axios'
import './apexam.css'

function Exam() {
  const [questions, setQuestions] = useState([]) // Holds the list of questions
  const [currentQuestion, setCurrentQuestion] = useState(0) // Index of the current question
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const [responses, setResponses] = useState([]) // Tracks user responses for all questions

  const navigate = useNavigate() // For navigation between routes

  // Fetch questions from the backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions') // Adjust the URL based on your backend
        setQuestions(response.data) // Populate questions state
        setResponses(Array(response.data.length).fill(null)) // Initialize responses array
        setLoading(false) // Stop loading
      } catch (err) {
        setError(err.message) // Handle errors
        setLoading(false) // Stop loading on error
      }
    }

    fetchQuestions()
  }, [])

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    const updatedResponses = [...responses]
    updatedResponses[currentQuestion] = answer // Update response for the current question
    setResponses(updatedResponses)
  }

  // Calculate score based on responses
  const calculateScore = () => {
    let calculatedScore = 0 // Temporary score variable
    responses.forEach((response, index) => {
      if (response === questions[index]?.answer[0]) {
        calculatedScore += 1 // Increment score for correct answers
      }
    })
    return calculatedScore
  }

  // Handle navigation between questions
  const handleNavigation = (next) => {
    setCurrentQuestion((prev) => prev + (next ? 1 : -1)) // Navigate to the next or previous question
  }

  // Navigate to the submit page
  const handleSubmit = () => {
    const score = calculateScore() // Ensure the score is updated before submitting
    navigate('/code', { state: { score, totalQuestions: questions.length } })
  }

  // Calculate the progress percentage
  const progressPercentage = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0

  // Render loading or error state if applicable
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container">
      <Header />
      <div className="exam-question">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="question-header">
          <span>
            QUESTION {currentQuestion + 1}/{questions.length}
          </span>
          <Timer />
        </div>
        {questions.length > 0 && questions[currentQuestion] ? (
          <Question
            question={questions[currentQuestion]}
            selectedAnswer={responses[currentQuestion]} // Pass the stored response
            onAnswerSelect={handleAnswerSelect}
          />
        ) : (
          <div>No questions available</div>
        )}
        <QuestionNavigation
          currentQuestion={currentQuestion}
          setCurrentQuestion={handleNavigation}
          totalQuestions={questions.length}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Exam
