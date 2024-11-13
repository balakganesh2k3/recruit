import React from 'react';
import './ExamCard.css'; // Import the CSS file

const ExamCard = () => {
  return (
    <div className="exam-card">
      <div className="exam-card-header">
        <div className="exam-icon">
          <i className="fas fa-file-alt"></i> {/* Add the icon for file */}
        </div>
      </div>
      <div className="exam-card-body">
        <h3 className="exam-card-title">2024 & 2025 _TCS NQT_ Mock and Practice Assessments</h3>
        <p className="status">Enrolled, Not Started</p>
        <p className="progress">0%</p>
        <div className="exam-details">
          <div className="detail-item">
            <i className="fas fa-list"></i>
            <span>26 Assessments</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-clipboard-list"></i>
            <span>-- Practice Test</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-calendar-alt"></i>
            <span>Start Date: 3 Apr, 24</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-calendar-alt"></i>
            <span>End Date: 30 Jun, 25</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
