import React, { useState, useEffect } from "react";
import './alerts.css';

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const mockMessages = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                sender: "Admin",
                subject: "Welcome!",
                content: "Thank you for signing up. We hope you enjoy using our services.",
                timestamp: "2024-11-19 10:00 AM",
                isRead: false,
              },
              {
                id: 2,
                sender: "Exam Alerts",
                subject: "Reminder: Upcoming Exam",
                content: "Your next coding exam is scheduled for tomorrow at 3:00 PM.",
                timestamp: "2024-11-18 5:00 PM",
                isRead: true,
              },
              {
                id: 3,
                sender: "Admin",
                subject: "New Message from Admin",
                content: "Please check the updates in your dashboard.",
                timestamp: "2024-11-17 2:30 PM",
                isRead: false,
              },
            ]),
          1000
        )
      );
      setMessages(mockMessages);
    };

    fetchMessages();
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, isRead: true } : msg
      )
    );
  };

  const handleBackToInbox = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="inbox-container">
      {!selectedMessage ? (
        <div className="message-list">
          <h2>Inbox</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Sender</th>
                <th>Subject</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className={message.isRead ? "read" : "unread"}
                  onClick={() => handleSelectMessage(message)}
                >
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{message.sender}</td>
                  <td>{message.subject}</td>
                  <td>{message.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="message-detail">
          <h2>{selectedMessage.subject}</h2>
          <p className="message-timestamp">{selectedMessage.timestamp}</p>
          <p className="message-content">{selectedMessage.content}</p>
          <button className="back-button" onClick={handleBackToInbox}>
            Back to Inbox
          </button>
        </div>
      )}
    </div>
  );
}

export default Inbox;
