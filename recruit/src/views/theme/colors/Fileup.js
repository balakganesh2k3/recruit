import React, { useState } from 'react';
import axios from 'axios';
// import '../colors/resumeup.css' // Import the CSS file
import './resumeup.css'

const FileUpload = ({ setResumeData }) => {
  const [resume, setResume] = useState(null);
  const [resumeSize, setResumeSize] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jobDescription);

    try {
      const res = await axios.post('http://localhost:5000/api/resume', formData);
      setResumeData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setResume(selectedFile);
      setResumeSize((selectedFile.size / 1024).toFixed(2)); // Convert size to KB and store
    }
  };

  return (
    <form onSubmit={handleResumeUpload}>
      <div>
        <input 
          type="file" 
          onChange={handleFileChange} 
          required 
        />
        {resume && (
          <div>
            <p><strong>File Name:</strong> {resume.name}</p>
            <p><strong>File Size:</strong> {resumeSize} KB</p>
          </div>
        )}
      </div>

      <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        required
      />

      <button type="submit">Upload Resume & JD</button>
    </form>
  );
};

export default FileUpload;
