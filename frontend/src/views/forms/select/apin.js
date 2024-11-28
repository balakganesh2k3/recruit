/* eslint-disable prettier/prettier */
// import React from 'react'
import './aiint.css'
// import io from 'socket.io-client';
import avatarImage from '../../../assets/images/images.png' // Replace this with the path to your robot avatar image

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
    const [isListening, setIsListening] = useState(false);
    const [allresponses, setAllResponses] = useState([]);
    const [allquestions, setAllQuestions] = useState([]);
    const [count, setCount] = useState(1);
    const recognitionRef = useRef(null);
    const Resume = localStorage.getItem('uploadedResume');
    const JobDescription = localStorage.getItem('jobDescription');

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
        setIsListening(!isListening);
    };

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
            setAllResponses([...allresponses, newTranscript]);
        };

        recognition.onerror = (event) => {
            console.error('Speech Recognition Error:', event.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    const stopListening = async () => {
        if (recognitionRef.current) recognitionRef.current.stop();

        setCount(prevCount => prevCount + 1);
        console.log(count);
        if(count > 3){
            await getfeedback();
            speakText('Thankyou your interview has ended');
            setCount(1);
            return;
        }
        if (transcript.trim() && count <= 3) {
            try {
                const response = await fetch('http://localhost:5000/api/gemini', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ transcription: transcript, resume: Resume, jobDescription: JobDescription }),
                });
                const data = await response.json();
                setAllQuestions([...allquestions, data.question]);
                setQuestion(data.question || 'No question received');
                speakText(data.question || 'No question received'); // Read aloud the question
            } catch (error) {
                console.error('Error fetching question:', error);
            } finally {
                setTranscript(''); // Clear transcript after handling
            }
        }
    };
    const getfeedback = async () => {
        if (transcript.trim()) {
            try {
                const response = await fetch('http://localhost:5000/api/gemini/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ allquestions: allquestions, allresponses: allresponses, jobDescription: JobDescription }),
                });
                const data = await response.json();
                speakText("Thank you for your time. Here is some feedback for you.");
                setQuestion(data.question || 'No feedback received');
                speakText(data.question || 'No feedback received'); // Read aloud the question
            } catch (error) {
                console.error('Error fetching feedback:', error);
            } finally {
                setTranscript(''); // Clear transcript after handling
            }
        }
    }

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        } else {
            alert('Your browser does not support text-to-speech.');
        }
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    return (
        <div className="chat-bubble-container">
          <div className="chat-bubble">
                  <img src={avatarImage} alt="Robot Avatar" className="robot-avatar" />
                </div>
                <div className="speech-box">
                  <p>{count>=3 ? 'Feedback' : 'Question'}: {question}</p>

                </div>
            <button className="reply-button" onClick={toggleListening}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
        </div>
          //     <div className="chat-bubble-container">
          //       <div className="chat-bubble">
          //         <img src={avatarImage} alt="Robot Avatar" className="robot-avatar" />
          //       </div>
          //       <div className="speech-box">
          //         <p>Hello! I’m here to help you with your interview preparation.</p>
          //       </div>
          //       <button className="reply-button" onClick={handleSpeech}>Speak your response</button>
          //     </div>
    );
};

export default RealTimeTranscription;
