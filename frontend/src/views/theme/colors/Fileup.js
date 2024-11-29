/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import * as pdfjs from 'pdfjs-dist/build/pdf'
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url'
import './resumeup.css';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

const FileUpload = ({ setResumeData }) => {
  const [resumeText, setResumeText] = useState('')
  const [resumeSize, setResumeSize] = useState(null)
  const [jobDescription, setJobDescription] = useState('')

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setResumeSize((selectedFile.size / 1024).toFixed(2)) // Convert size to KB

      // Extract text from the PDF
      const text = await extractTextFromPDF(selectedFile)
      setResumeText(text)
      localStorage.setItem('uploadedResume', text)
      console.log('Extracted Text:', text)
    } else {
      alert('Please upload a valid PDF file.')
    }
  }

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
    let extractedText = ''

    // Loop through all pages and extract text
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item) => item.str).join(' ')
      extractedText += `${pageText} `
    }

    return extractedText.trim()
  }

  const handleSubmit = () => {
    localStorage.setItem('jobDescription', jobDescription)
    console.log('Data saved to localStorage')
  }

  return (
    <form>
      <div>
        <input type="file" onChange={handleFileChange} accept="application/pdf" required />
        {resumeSize && (
          <div>
            <p>
              <strong>File Size:</strong> {resumeSize} KB
            </p>
          </div>
        )}
      </div>

      <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        required
      />

      <button type="button" onClick={handleSubmit}>
        Save Data
      </button>

      {resumeText && (
        <div>
          <h3>Extracted Resume Text:</h3>
          <pre>{resumeText}</pre>
        </div>
      )}
    </form>
  )
}

export default FileUpload
