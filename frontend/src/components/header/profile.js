import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/edit'); // Navigate to the Edit Profile page
  };

  return (
    <div className="profile-page">
      <div className="header">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-avatar"
          />
          <div>
            <h1>John Wick</h1>
            <p>wick@gmail.com</p>
          </div>
        </div>
        <button className="edit-button" onClick={handleEditClick}>
          Edit
        </button>
      </div>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value="John Wick" disabled />
          </div>
          <div className="form-group">
            <label>Nick Name</label>
            <input type="text" value="Wick" disabled />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <input type="text" value="male" disabled />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" value="United States" disabled />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Language</label>
            <input type="text" value="English" disabled />
          </div>
          <div className="form-group">
            <label>Time Zone</label>
            <input type="text" value="GMT-5" disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

