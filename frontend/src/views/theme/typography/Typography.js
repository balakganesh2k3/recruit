// App.js
import React from 'react'
import Results from './results'

function App() {
  const testScore = 78
  const maxTestScore = 100

  return (
    <div className="App">
      <h1>Test Results Summary</h1>
      <Results score={testScore} maxScore={maxTestScore} />
    </div>
  )
}

export default App
