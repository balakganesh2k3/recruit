// SubmitPage.js (inside views/submit)
// import React from "react";

// function SubmitPage() {
//   return (
//     <div>
//       <h1>Test Submitted Successfully!</h1>
//       <p>Thank you for completing the test. Your results will be shared soon.</p>
//     </div>
//   );
// }

// App.js
import React from 'react'
import { useLocation } from 'react-router-dom'
import Results from '../../theme/typography/results'

function SubmitPage() {
  const location = useLocation() // Access the state from navigate
  const { score, totalQuestions } = location.state

  return (
    <div className="SubmitPage">
      <h1>Test Results Summary</h1>
      <Results score={score} maxScore={totalQuestions} />
    </div>
  )
}

export default SubmitPage
