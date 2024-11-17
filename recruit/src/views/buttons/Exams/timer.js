import React, { useState, useEffect } from 'react';

function Timer() {
  const [timeRemaining, setTimeRemaining] = useState(11 * 60 + 57); // 11:57 in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="timer" id="timer">
      {minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </div>
  );
}

export default Timer;
