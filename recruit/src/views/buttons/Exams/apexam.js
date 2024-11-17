import React, { useState } from 'react';
import Header from './header';
import Question from './question';
import Timer from './timer';
import QuestionNavigation from './questionav';
import './apexam.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      text: "More needs to be done to capitalise on the power of the peer-to-peer networks that many music downloaders still use...",
      options: ["True", "False", "Cannot Say"],
      correctAnswer: "True",
    },
    // Add more questions as necessary
  ];

  return (
    <div className="container">
      <Header />
      <div className="exam-question">
        <div className="question-header">
          <span>QUESTION {currentQuestion + 1}/24</span>
          <Timer />
        </div>
        <Question question={questions[currentQuestion]} />
        <QuestionNavigation
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
}

export default App;
