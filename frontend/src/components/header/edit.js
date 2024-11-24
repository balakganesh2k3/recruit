import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './edit.css';

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: 'Alexa Rawles',
    nickName: 'Alex',
    gender: 'Female',
    country: 'United States',
    language: 'English',
    timeZone: 'GMT-5',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    console.log('Profile saved:', profile);
    navigate('/'); // Navigate back to the Profile Page
  };

  return (
    <div className="profile-page">
      <h1>Edit Profile</h1>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nick Name</label>
            <input
              type="text"
              name="nickName"
              value={profile.nickName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              name="language"
              value={profile.language}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Time Zone</label>
            <input
              type="text"
              name="timeZone"
              value={profile.timeZone}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="edit-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
