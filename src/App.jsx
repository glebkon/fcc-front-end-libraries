import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Convert seconds to mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // Handle timer tick
  useEffect(() => {
    let id;
    if (isRunning) {
      id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            document.getElementById("beep").play().catch(console.error);
            const newLabel = timerLabel === "Session" ? "Break" : "Session";
            setTimerLabel(newLabel);
            return newLabel === "Session"
              ? sessionLength * 60
              : breakLength * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(id);
  }, [isRunning, timerLabel]);

  // Handle start/pause button click
  const handleStartPauseClick = () => {
    setIsRunning(!isRunning);
  };

  // Handle reset button click
  const handleResetClick = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    document.getElementById("beep").load();
  };

  // Handle increment/decrement buttons
  const handleIncrement = (type) => {
    if (!isRunning) {
      if (type === "session" && sessionLength < 60) {
        setSessionLength(sessionLength + 1);
        setTimeLeft((sessionLength + 1) * 60);
      } else if (type === "break" && breakLength < 60) {
        setBreakLength(breakLength + 1);
      }
    }
  };

  const handleDecrement = (type) => {
    if (!isRunning) {
      if (type === "session" && sessionLength > 1) {
        setSessionLength(sessionLength - 1);
        setTimeLeft((sessionLength - 1) * 60);
      } else if (type === "break" && breakLength > 1) {
        setBreakLength(breakLength - 1);
      }
    }
  };

  return (
    <div id="timer-container">
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <div
          id="break-decrement"
          className="btn-level button"
          onClick={() => handleDecrement("break")}
        >
          -
        </div>
        <div id="break-length" className="btn-level">
          {breakLength}
        </div>
        <div
          id="break-increment"
          className="btn-level button"
          onClick={() => handleIncrement("break")}
        >
          +
        </div>
      </div>
      <div className="length-control">
        <div id="session-label">Session Length</div>
        <div
          id="session-decrement"
          className="btn-level button"
          onClick={() => handleDecrement("session")}
        >
          -
        </div>
        <div id="session-length" className="btn-level">
          {sessionLength}
        </div>
        <div
          id="session-increment"
          className="btn-level button"
          onClick={() => handleIncrement("session")}
        >
          +
        </div>
      </div>
      <div id="timer">
        <div id="timer-wrapper">
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
      </div>
      <div id="timer-control">
        <div id="start_stop" className="button" onClick={handleStartPauseClick}>
          {isRunning ? "Pause" : "Start"}
        </div>
        <div id="reset" className="button" onClick={handleResetClick}>
          Reset
        </div>
      </div>
      <audio id="beep" src="src/assets/beep.mp3"></audio>
    </div>
  );
}

export default App;
