import React from 'react';
import './aiint.css';
import avatarImage from "../../../assets/images/images.png"; // Replace this with the path to your robot avatar image



function RobotChatBubble() {
  return (
    <div className="chat-bubble-container">
      <div className="chat-bubble">
        <img src={avatarImage} alt="Robot Avatar" className="robot-avatar" />
      </div>
      <div className="speech-box">
        <p>Hello! I’m here to help you with your interview preparation.</p>
      </div>
      <button className="reply-button">Speak your response</button>
    </div>
  );
}

export default RobotChatBubble;


