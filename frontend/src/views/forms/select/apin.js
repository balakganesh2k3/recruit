/* eslint-disable prettier/prettier */
// import React from 'react'
// import './aiint.css'
// import io from 'socket.io-client';
// import avatarImage from '../../../assets/images/images.png' // Replace this with the path to your robot avatar image

// function RobotChatBubble() {
//   const [userInput, setUserInput] = useState('');
//   const [botResponse, setBotResponse] = useState('');
//   const socket = io('http://localhost:5000');

//   const handleSpeech = async () => {
//     socket.emit('candidateMessage', {
//       resume: localStorage.getItem('resume'),
//       jobDesc: localStorage.getItem('jobDesc'),
//       candidateInput: userInput,
//     });

//     socket.on('botReply', (data) => {
//       setBotResponse(data.text);
//     });
//   }
//   return (
//     <div className="chat-bubble-container">
//       <div className="chat-bubble">
//         <img src={avatarImage} alt="Robot Avatar" className="robot-avatar" />
//       </div>
//       <div className="speech-box">
//         <p>Hello! I’m here to help you with your interview preparation.</p>
//       </div>
//       <button className="reply-button" onClick={handleSpeech}>Speak your response</button>
//     </div>
//   )
// }

// export default RobotChatBubble


import React, { useEffect, useRef, useState } from 'react';

const RealTimeTranscription = () => {
    const [transcript, setTranscript] = useState('');
    const [question, setQuestion] = useState('');
    const recognitionRef = useRef(null);
    const silenceTimer = useRef(null);

    const startListening = () => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            alert('Your browser does not support Speech Recognition');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
            const newTranscript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join('');
            setTranscript(newTranscript);

            // Reset silence timer on every speech event
            resetSilenceTimer(newTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    const resetSilenceTimer = (currentTranscript) => {
        if (silenceTimer.current) clearTimeout(silenceTimer.current);
        silenceTimer.current = setTimeout(() => {
            handleSilence(currentTranscript); // Handle silence after 2 seconds
        }, 2000);
    };

    const handleSilence = async (currentTranscript) => {
        if (!currentTranscript.trim()) return; // Do nothing for empty input

        try {
            const response = await fetch('http://localhost:5000/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcript: currentTranscript }),
            });
            const data = await response.json();
            setQuestion(data.question || 'No question received');
            setTranscript(''); // Clear transcript after handling
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            if (silenceTimer.current) clearTimeout(silenceTimer.current);
        };
    }, []);

    return (
        <div>
            <button onClick={startListening}>Start Listening</button>
            <p><strong>Transcript:</strong> {transcript}</p>
            <p><strong>Next Question:</strong> {question}</p>
        </div>
    );
};

export default RealTimeTranscription;

