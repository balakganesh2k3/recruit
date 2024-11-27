import React, { useState, useEffect } from 'react'

function Timer() {
  const [timeLeft, setTimeLeft] = useState(12 * 60) // 12 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer) // Cleanup on component unmount
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return <div className="timer">{formatTime(timeLeft)}</div>
}

export default Timer
