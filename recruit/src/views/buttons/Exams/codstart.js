import React from 'react';
import { useNavigate } from 'react-router-dom';

const CodingStartPage = () => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate('/coding-exam'); // Navigate to the coding exam page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Coding Exam</h1>
      <p>Get ready to showcase your coding skills!</p>
      <button onClick={handleStartExam} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Start Coding Exam
      </button>
    </div>
  );
};

export default CodingStartPage;
