/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import './TestCaseResults.css'

const TestCaseResults = ({ results }) => {
  const [activeTab, setActiveTab] = useState('testCases') // State to toggle tabs
  const [expandedTestCase, setExpandedTestCase] = useState(null)

  const toggleTestCase = (index) => {
    setExpandedTestCase(expandedTestCase === index ? null : index)
  }

  const parseResult = (resultString) => {
    const isPassed = resultString.includes('Passed')
    const detailsMatch = resultString.match(/\(Expected: (.*), Got: (.*)\)/)
    const expected = detailsMatch ? detailsMatch[1] : null
    const got = detailsMatch ? detailsMatch[2] : null
    return { isPassed, expected, got }
  }

  return (
    <div
      style={{
        padding: '10px',
        borderTop: '1px solid #ccc',
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tabs Header */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        <button
          onClick={() => setActiveTab('testCases')}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: activeTab === 'testCases' ? '#3b5071' : '#3a68b0',
            border: 'none',
            borderBottom: activeTab === 'testCases' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
          }}
        >
          Test Cases
        </button>
        <button
          onClick={() => setActiveTab('output')}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: activeTab === 'output' ? '#3b5071' : '#3a68b0',
            border: 'none',
            borderBottom: activeTab === 'output' ? '2px solid #007bff' : 'none',
            cursor: 'pointer',
          }}
        >
          Output
        </button>
      </div>

      {/* Tabs Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {activeTab === 'testCases' ? (
          <div>
            <h4>Test Cases</h4>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {results.map((resultString, index) => {
                const { isPassed, expected, got } = parseResult(resultString)
                return (
                  <li key={index} style={{ marginBottom: '10px', cursor: 'pointer' }}>
                    <div
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={() => toggleTestCase(index)}
                    >
                      {isPassed ? (
                        <FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />
                      ) : (
                        <FaTimesCircle style={{ color: 'red', marginRight: '8px' }} />
                      )}
                      <span>Test Case {index + 1}</span>
                    </div>

                    {expandedTestCase === index && (
                      <div style={{ marginLeft: '20px', marginTop: '5px', fontSize: '0.9em' }}>
                        <p>
                          <strong>Result:</strong> {resultString}
                        </p>
                        {!isPassed && (
                          <>
                            <p>
                              <strong>Expected Output:</strong> {expected}
                            </p>
                            <p>
                              <strong>Your Output:</strong> {got}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div>
            <h4>Output</h4>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontSize: '16px',
                backgroundColor: '#3b5071',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              {results.map((result, index) => (
                <div key={index}>{result}</div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestCaseResults
