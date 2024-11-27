/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import './CodeEditor.css'
import TestCaseResults from './TestCaseResults'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { runCode } from './Services/CodeEditorService';

const CodeEditorPage = () => {
  const [code, setCode] = useState('// Start coding here...')
  const [language, setLanguage] = useState('javascript') // Default language
  const [theme, setTheme] = useState('vs-dark') // Default theme
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [hasRunCode, setHasRunCode] = useState(false)
  const [testResults, setTestResults] = useState([]) // Ensure testCaseResults is a state variable
  const location = useLocation() // Access the state from navigate
  const { score, totalQuestions } = location.state
  const navigate = useNavigate()

  // Update code state when user types
  const handleEditorChange = (value) => {
    setCode(value)
  }
  // Update code state when user types
  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  // Handle language change

  const callback = ({ apiStatus, data, message }) => {
    console.log('Callback triggered:', { apiStatus, data, message })
    if (apiStatus === 'loading') {
      setShowLoader(true)
    } else if (apiStatus === 'error') {
      setShowLoader(false)
      setOutput('Something went wrong: ' + message)
    } else if (apiStatus === 'success') {
      setShowLoader(false)
      setOutput(data.stdout || data.stderr || JSON.stringify(data))
    }
  }
  const languageCodes = {
    cpp: 54,
    java: 91,
    python: 92,
    javascript: 93,
  }

  // async function makeSubmission({code, language, callback, stdin}) {
  //     const url = 'https://judge0-ce.p.rapidapi.com/submissions?fields=*';
  //     const options = {
  //         method: 'POST',
  //         params: {fields: '*'},
  //         headers: {
  //             'x-rapidapi-key': 'b3e1f81a49msh387150401c94310p1d0981jsn85559cac8768',
  //             'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
  //             'Content-Type': 'application/json'
  //         },
  //         data: JSON.stringify({
  //                 language_id: 93,
  //                 source_code: 'console.log(9)',
  //             })
  //     };
  //     try {
  //         const response = await fetch(url, options);
  //         const result = await response.json();
  //         console.log("Response Data:", result); // Debugging log
  //         const token = result.data.token;

  //         if (token) {
  //             console.log("Submission Token:", token);
  //             return token;
  //         } else {
  //             console.error("No token received in response.");
  //         }

  //     } catch (error) {
  //         if (error.response) {
  //             console.error("Error Response Data:", error.response.data); // Detailed error data from API
  //             console.error("Status Code:", error.response.status);
  //         } else {
  //             console.error("Error:", error.message);
  //         }
  //         return null; // Return null to handle error in `runCode`
  //     }
  // }

  async function makeSubmission({ code, language, callback, stdin }) {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?fields=*' // query params added directly in the URL
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'b3e1f81a49msh387150401c94310p1d0981jsn85559cac8768',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language_id: languageCodes[language], // Example language ID for JavaScript
        source_code: code, // Your dynamic code goes here
        stdin: stdin && typeof stdin === 'string' ? stdin : '', // Optional stdin for input, can be empty
      }),
    }

    try {
      const response = await fetch(url, options)

      // Check if response is OK (status 200-299)
      if (!response.ok) {
        console.error('Error:', response.statusText)
        return null
      }

      const result = await response.json()
      console.log('Response Data:', result) // Debugging log
      const token = result.token // Fixing the token extraction

      if (token) {
        // console.log("Submission Token:", token);
        return token
      } else {
        console.error('No token received in response.')
      }
    } catch (error) {
      callback({
        apiStatus: 'error',
        message: JSON.stringify('Error in makeSubmission promise not resolved: ' + error),
      })
      return null // Return null to handle error in `runCode`
    }
  }

  async function getSubmission({ token, callback }) {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*` // Query params added directly in the URL
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'b3e1f81a49msh387150401c94310p1d0981jsn85559cac8768',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      },
    }

    try {
      // Poll until the execution is complete
      callback({ apiStatus: 'loading' })
      let status = 'In Queue'
      let result

      while (status === 'In Queue' || status === 'Processing') {
        try {
          const response = await fetch(url, options)
          result = await response.json()
          console.log('Result Data:', result) // Debugging log
          status = result.status.description
          console.log('Result Data:', result.status.description) // Debugging log
          if (status === 'In Queue' || status === 'Processing') {
            console.log('Waiting for execution to complete...')
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
          }
        } catch (error) {
          callback({
            apiStatus: 'error',
            message: JSON.stringify('Error in getSubmission promise not resolved: ' + error),
          })
          return
        }
      }

      const output = result.stdout ? atob(result.stdout) : result.stderr || result

      return output
    } catch (error) {
      callback({
        apiStatus: 'error',
        message: `Error in getSubmission: ${error.message || error}`,
      })
      return null // Return null to handle error in `runCode`
    }
  }

  async function runCode2({ code, language, callback, stdin }) {
    console.log('input:', stdin) // Debugging log
    callback({ apiStatus: 'loading' }) // Signal the start of submission
    const token = await makeSubmission({ code, language, callback, stdin })

    if (token) {
      const result = await getSubmission({ token, callback })

      if (result) {
        console.log('Final Result:', result) // Debugging log
        callback({
          apiStatus: 'success',
          data: result,
        })
        return result // Return the final result
      } else {
        // If result is null, there was an error already handled in getSubmission
        console.log('No result returned from getSubmission.')
      }
    } else {
      console.log('No token received from makeSubmission.')
    }
  }

  // const handleRunCode = useCallback(({code, language}) => {
  //     runCode({code, language, callback, input});
  // }, [input]);

  const testCases = [
    { input: 2, expected: 1 },
    { input: 15, expected: 3 },
    { input: 23, expected: 1 },
    { input: 50, expected: 2 },
  ] // Define test cases as intended

  const handleRunCode = async () => {
    setShowLoader(true)
    setOutput('') // Clear previous output

    const newResults = [] // Temp array to store results dynamically

    // Use a for...of loop to ensure the async process completes before moving to the next test case
    for (const [index, test] of testCases.entries()) {
      try {
        const result = await runCode2({ code, language, callback, stdin: String(test.input) })
        const isCorrect = result == test.expected
        console.log('isCorrect: ', isCorrect)
        newResults.push(
          `Test Case ${index + 1}: ${
            isCorrect ? 'Passed' : `Failed (Expected: ${test.expected}, Got: ${result})`
          }`,
        )

        // Log the intermediate result for debugging
        console.log(`Test Case ${index + 1} Result:`, newResults)

        // Update the output dynamically
        setOutput(newResults.join('\n'))
        setHasRunCode(true)
      } catch (error) {
        newResults.push(`Test Case ${index + 1}: Failed (Error: ${error.message})`)
        console.error(`Error for Test Case ${index + 1}:`, error)
      }
    }

    // After all test cases are processed, update final results
    setTestResults(newResults)
    setShowLoader(false)
    console.log('Final Test Results:', newResults)
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  // Handle theme change
  const handleThemeChange = (event) => {
    setTheme(event.target.value)
  }
  // Navigate to the submit page
  const handleSubmit = () => {
    navigate('/submit', { state: { score, totalQuestions: totalQuestions } })
  }

  // return (
  //     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  //         <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
  //             <select value={language} onChange={(e) => setLanguage(e.target.value)}>
  //                 <option value="javascript">JavaScript</option>
  //                 <option value="python">Python</option>
  //                 <option value="java">Java</option>
  //                 <option value="csharp">C#</option>
  //                 <option value="html">HTML</option>
  //                 <option value="css">CSS</option>
  //             </select>
  //             <select value={theme} onChange={(e) => setTheme(e.target.value)}>
  //                 <option value="vs-dark">Dark</option>
  //                 <option value="light">Light</option>
  //             </select>
  //             <button onClick={() => handleRunCode()} style={{ padding: '10px' }}>
  //                 Run Code
  //             </button>
  //         </div>

  //         <Editor
  //             height="60vh"
  //             language={language}
  //             value={code}
  //             onChange={handleEditorChange}
  //             theme={theme}
  //         />

  //         <div style={{ display: 'flex', padding: '1px', borderTop: '1px solid #ccc', height: '30vh' }}>
  //             {/* Input Section */}
  //             <div style={{ flex: 1, padding: '2px', borderRight: '1px solid #ccc' }}>
  //                 <h4>Input:</h4>
  //                 <textarea
  //                     value={input}
  //                     onChange={handleInputChange}
  //                     placeholder="Enter your input here"
  //                     style={{ width: '95%', height: '60%', resize: 'none', fontSize: '16px', padding: '1px', justifyContent: 'center' }}
  //                 />
  //             </div>

  //             {/* Output Section */}
  //             <div style={{ flex: 1, padding: '10px' }}>
  //                 <h4>Output:</h4>
  //                 <pre style={{ whiteSpace: 'pre-wrap', fontSize: '16px' }}>
  //                     {output.split("\n").map((item, index) => (
  //                         <div key={index}>{item}</div>
  //                     ))}
  //                 </pre>
  //             </div>
  //         </div>

  //         {showLoader && (
  //             <div style={{
  //                 position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  //                 backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
  //                 justifyContent: "center", alignItems: "center"
  //             }}>
  //                 <div className='loader'></div>
  //             </div>
  //         )}
  //     </div>
  // );
  // };




  // return (
  //   <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa' }}>
  //     {/* Left Section: Exam Question */}
  //     <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
  //       <h2>Exam Question</h2>
  //       <div>
  //         <p>
  //           Write a function that checks if a number is prime. If the number is prime, return 1;
  //           otherwise, return its smallest divisor greater than 1.
  //         </p>
  //         <p>
  //           <strong>Input:</strong> Integer n
  //         </p>
  //         <p>
  //           <strong>Output:</strong> Integer
  //         </p>
  //         <p>
  //           <strong>Constraints:</strong> 2 ≤ n ≤ 10<sup>12</sup>
  //         </p>
  //       </div>
  //     </div>

  //     {/* Right Section: Code Editor and Output */}
  //     <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
  //       {/* Editor Toolbar */}
  //       <div
  //         style={{
  //           display: 'flex',
  //           justifyContent: 'space-between',
  //           padding: '10px',
  //           borderBottom: '1px solid #ccc',
  //         }}
  //       >
  //         <select value={language} onChange={(e) => setLanguage(e.target.value)}>
  //           <option value="javascript">JavaScript</option>
  //           <option value="python">Python</option>
  //           <option value="java">Java</option>
  //         </select>
  //         <select value={theme} onChange={(e) => setTheme(e.target.value)}>
  //           <option value="vs-dark">Dark</option>
  //           <option value="light">Light</option>
  //         </select>
  //         <button onClick={handleRunCode} style={{ padding: '10px' }}>
  //           Run Code
  //         </button>
  //       </div>

  //       {/* Code Editor */}
  //       <Editor
  //         height="50vh"
  //         language={language}
  //         value={code}
  //         onChange={handleEditorChange}
  //         theme={theme}
  //       />

  //       {hasRunCode && <TestCaseResults results={testResults} />}
  //       {!hasRunCode && (
  //         <div
  //           style={{
  //             padding: '20px',
  //             backgroundColor: '#0d335f', // Dark blue background
  //             borderRadius: '8px',
  //             border: '1px solid #2563eb', // Bright blue border
  //             boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
  //             margin: '20px',
  //             color: '#ffffff', // White text
  //           }}
  //         >
  //           <h4
  //             style={{
  //               color: '#93c5fd', // Light blue header text
  //               marginBottom: '15px',
  //             }}
  //           >
  //             Sample Test Case
  //           </h4>

  //           {/* Input Container */}
  //           <div
  //             style={{
  //               backgroundColor: '#104e9e', // Slightly lighter blue for contrast
  //               padding: '10px 15px',
  //               borderRadius: '6px',
  //               border: '1px solid #3b82f6', // Brighter blue border
  //               marginBottom: '10px',
  //             }}
  //           >
  //             <p>
  //               <strong>Input:</strong>
  //             </p>
  //             <pre
  //               style={{
  //                 backgroundColor: '#1e293b', // Dark slate blue
  //                 color: '#93c5fd', // Light blue text
  //                 padding: '10px',
  //                 borderRadius: '6px',
  //                 fontSize: '14px',
  //               }}
  //             >
  //               n = 29
  //             </pre>
  //           </div>

  //           {/* Output Container */}
  //           <div
  //             style={{
  //               backgroundColor: '#104e9e', // Slightly lighter blue for contrast
  //               padding: '10px 15px',
  //               borderRadius: '6px',
  //               border: '1px solid #3b82f6', // Brighter blue border
  //             }}
  //           >
  //             <p>
  //               <strong>Output:</strong>
  //             </p>
  //             <pre
  //               style={{
  //                 backgroundColor: '#1e293b', // Dark slate blue
  //                 color: '#93c5fd', // Light blue text
  //                 padding: '10px',
  //                 borderRadius: '6px',
  //                 fontSize: '14px',
  //               }}
  //             >
  //               1
  //             </pre>
  //           </div>

  //           <p
  //             style={{
  //               fontStyle: 'italic',
  //               color: '#cbd5e1', // Muted gray-blue for additional info
  //               marginTop: '15px',
  //             }}
  //           >
  //             Test your solution against this case by clicking <strong>Run Code</strong>.
  //           </p>
  //         </div>
  //       )}

  //       {/* Output Section */}
  //       {/* <div style={{ flex: 1, padding: '10px' }}>
  //               <h4>Output</h4>
  //               <pre style={{ whiteSpace: 'pre-wrap', fontSize: '16px' }}>
  //                   {output}
  //               </pre>
  //           </div> */}
  //     </div>

  //     {/* Loader */}
  //     {showLoader && (
  //       <div
  //         style={{
  //           position: 'fixed',
  //           top: 0,
  //           left: 0,
  //           right: 0,
  //           bottom: 0,
  //           backgroundColor: 'rgba(0,0,0,0.6)',
  //           display: 'flex',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <div className="loader"></div>
  //       </div>
  //     )}
  //   </div>
  // )


return (
  <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa' }}>
    {/* Left Section: Exam Question */}
    <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
      <h2>Exam Question</h2>
      <div>
        <p>
          Write a function that checks if a number is prime. If the number is prime, return 1;
          otherwise, return its smallest divisor greater than 1.
        </p>
        <p>
          <strong>Input:</strong> Integer n
        </p>
        <p>
          <strong>Output:</strong> Integer
        </p>
        <p>
          <strong>Constraints:</strong> 2 ≤ n ≤ 10<sup>12</sup>
        </p>
      </div>
    </div>

    {/* Right Section: Code Editor and Output */}
    <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
      {/* Editor Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <div>
          <button onClick={handleRunCode} style={{ padding: '10px', marginRight: '10px' }}>
            Run Code
          </button>
          <button onClick={handleSubmit} style={{ padding: '10px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Submit
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <Editor
        height="50vh"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme={theme}
      />

      {hasRunCode && <TestCaseResults results={testResults} />}
      {!hasRunCode && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#1e293b', // Dark blue background
            borderRadius: '8px',
            border: '1px solid #2563eb', // Bright blue border
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            margin: '20px',
            color: '#ffffff', // White text
          }}
        >
          <h4
            style={{
              color: '#93c5fd', // Light blue header text
              marginBottom: '15px',
            }}
          >
            Sample Test Case
          </h4>

          {/* Input Container */}
          <div
            style={{
              backgroundColor: '#1e293b', // Dark matte blue
              padding: '10px 15px',
              borderRadius: '8px',
              border: '3px solid #112d4e', // Slightly brighter blue
              marginBottom: '15px',
            }}
          >
            <p style={{ color: '#dbe2ef', fontWeight: 'bold' }}>Input:</p>
            <pre
              style={{
                backgroundColor: '#112d4e', // Slightly lighter matte blue
                color: '#f9f7f7', // Off-white text for better contrast
                padding: '10px',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
          n = 29
            </pre>
          </div>

          {/* Output Container */}
          <div
            style={{
              backgroundColor: '#1e293b', // Dark matte blue
              padding: '10px 15px',
              borderRadius: '8px',
              border: '3px solid #112d4e', // Slightly brighter blue
            }}
          >
            <p style={{ color: '#dbe2ef', fontWeight: 'bold' }}>Output:</p>
            <pre
              style={{
                backgroundColor: '#112d4e', // Slightly lighter matte blue
                color: '#f9f7f7', // Off-white text for better contrast
                padding: '10px',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
          1
            </pre>
          </div>


          <p
            style={{
              fontStyle: 'italic',
              color: '#cbd5e1', // Muted gray-blue for additional info
              marginTop: '15px',
            }}
          >
            Test your solution against this case by clicking <strong>Run Code</strong>.
          </p>
        </div>
      )}

      {/* Loader */}
      {showLoader && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="loader"></div>
        </div>
      )}
    </div>
  </div>
);

}
export default CodeEditorPage
