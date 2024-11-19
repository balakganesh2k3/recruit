import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./header";
import Question from "./question";
import Timer from "./timer";
import QuestionNavigation from "./questionav";
import SubmitPage from "./submit"; // Import the SubmitPage component
import "./apexam.css";

function Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      text: "More needs to be done to capitalise on the power of the peer-to-peer networks that many music downloaders still use...",
      options: ["True", "False", "Cannot Say"],
      correctAnswer: "True",
    },
    {
      text: "The development of AI has brought significant changes to industries worldwide.",
      options: ["True", "False", "Cannot Say"],
      correctAnswer: "True",
    },
    {
      text: "Climate change is primarily caused by human activities.",
      options: ["True", "False", "Cannot Say"],
      correctAnswer: "True",
    },
    // Add more questions as needed
  ];

  const navigate = useNavigate(); // Hook to navigate between routes

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  const handleSubmit = () => {
    navigate("/submit"); // Navigate to the submit page
  };

  return (
    <div className="container">
      <Header />
      <div className="exam-question">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="question-header">
          <span>QUESTION {currentQuestion + 1}/{questions.length}</span>
          <Timer />
        </div>
        <Question question={questions[currentQuestion]} />
        <QuestionNavigation
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          totalQuestions={questions.length}
        />
        {/* Submit Button */}
        {currentQuestion === questions.length - 1 && (
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Exam />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </Router>
  );
}

export default App;

