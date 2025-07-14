import React, { useState, useEffect, useRef } from "react";
import {
  profileImg as defaultProfileImg,
  workIcn,
  playIcn,
  exerciseIcn,
  studyIcn,
  selfcareIcn,
  socialIcn,
} from "./Index.jsx";
import { Link } from "react-router-dom";

// Utility function
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
}

// Stopwatch box component
function WatchBox({ label, icon, storageKey }) {
  const [elapsedTime, setElapsedTime] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved) : 0;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem(`${storageKey}-running`);
    return saved === "true";
  });

  const timerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(storageKey, elapsedTime);
  }, [elapsedTime, storageKey]);

  useEffect(() => {
    localStorage.setItem(`${storageKey}-running`, isRunning);
  }, [isRunning, storageKey]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setIsRunning(false);
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${storageKey}-running`);
  };

  return (
    <div>
      <div className={`icon-${label.toLowerCase().replace(" ", "-")}`}>
        <img src={icon} alt={label} />
      </div>
      <div className="time-boxes">
        <span>{label}</span>
        <img src="./time-tracking-dashboard-main/images/icon-ellipsis.svg" alt="" />
        <div className="h2-div">
          <div className="display">{formatTime(elapsedTime)}</div>
          <button className="startStopBtn" onClick={handleStartStop}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="resetBtn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// Main screen component
function Watch_screen() {
  const [profileImg, setProfileImg] = useState(defaultProfileImg);

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImg(URL.createObjectURL(file));

      // TODO: upload to backend if needed
    }
  };

  return (
    <div>
      <main>
        <div className="jeremy-info">
          <div className="Jeremy-div">
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="profilePhotoInput"
              style={{ display: "none" }}
              onChange={handleProfileImgChange}
            />

            {/* Clickable profile image */}
            <img
              className="img-jeremy cursor-pointer"
              src={profileImg}
              alt="Jeremy Robson"
              onClick={() => document.getElementById("profilePhotoInput").click()}
            />

            <div>
              <p>Report for</p>
              <h1>Jeremy Robson</h1>
            </div>
          </div>
          <div className="calender">
            <p>Daily</p>
            <p className="weekly">Weekly</p>
            <p>Monthly</p>
          </div>
        </div>

        <div>
          <div className="flex-box">
            <WatchBox label="Work" icon={workIcn} storageKey="stopwatch-work" />
            <WatchBox label="Play" icon={playIcn} storageKey="stopwatch-play" />
            <WatchBox label="Study" icon={studyIcn} storageKey="stopwatch-study" />
          </div>
          <div className="flex-box trouble">
            <WatchBox label="Exercise" icon={exerciseIcn} storageKey="stopwatch-exercise" />
            <WatchBox label="Social" icon={socialIcn} storageKey="stopwatch-social" />
            <WatchBox label="Self-care" icon={selfcareIcn} storageKey="stopwatch-selfcare" />
          </div>
        </div>

        <Link to="/index">
          <button>&rarr;</button>
        </Link>
      </main>
    </div>
  );
}

export default Watch_screen;
