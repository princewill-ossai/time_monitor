import React, { useEffect, useState } from "react";
import profileImg from "../images/image-jeremy.png";
import workIcn from "../images/icon-work.svg";
import playIcn from "../images/icon-play.svg";
import studyIcn from "../images/icon-study.svg";
import exerciseIcn from "../images/icon-exercise.svg";
import socialIcn from "../images/icon-social.svg";
import selfcareIcn from "../images/icon-self-care.svg";
import { Link } from "react-router-dom";

function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs}h ${mins}m`;
}

const Index = () => {
  const [times, setTimes] = useState({
    work: 0,
    play: 0,
    study: 0,
    exercise: 0,
    social: 0,
    selfcare: 0,
  });

  useEffect(() => {
    const loadTimes = () => {
      setTimes({
        work: parseInt(localStorage.getItem("stopwatch-work") || 0),
        play: parseInt(localStorage.getItem("stopwatch-play") || 0),
        study: parseInt(localStorage.getItem("stopwatch-study") || 0),
        exercise: parseInt(localStorage.getItem("stopwatch-exercise") || 0),
        social: parseInt(localStorage.getItem("stopwatch-social") || 0),
        selfcare: parseInt(localStorage.getItem("stopwatch-selfcare") || 0),
      });
    };
    loadTimes();
  }, []);

  return (
    <div>
      <main>
        <div className="jeremy-info">
          <div className="Jeremy-div">
            <img className="img-jeremy" src={profileImg} alt="" />
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
            <TimeCard label="Work" icon={workIcn} time={times.work} />
            <TimeCard label="Play" icon={playIcn} time={times.play} />
            <TimeCard label="Study" icon={studyIcn} time={times.study} />
          </div>
          <div className="flex-box trouble">
            <TimeCard label="Exercise" icon={exerciseIcn} time={times.exercise} />
            <TimeCard label="Social" icon={socialIcn} time={times.social} />
            <TimeCard label="Self-care" icon={selfcareIcn} time={times.selfcare} />
          </div>
        </div>

        <Link to='/watch-screen'><button>&larr;</button></Link>
      </main>
    </div>
  );
};

const TimeCard = ({ label, icon, time }) => {
  return (
    <div>
      <div className={`icon-${label.toLowerCase()}`}>
        <img src={icon} alt={label} />
      </div>
      <div className="time-boxes">
        <span>{label}</span>
        <img src="./time-tracking-dashboard-main/images/icon-ellipsis.svg" alt="" />
        <div className="h2-div">
          <h2>{formatDuration(time)}</h2>
          <p>Last week - 0h</p>
        </div>
      </div>
    </div>
  );
};

export {
  profileImg,
  workIcn,
  studyIcn,
  playIcn,
  socialIcn,
  exerciseIcn,
  selfcareIcn,
};
export default Index;
