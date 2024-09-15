import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/ProgressBar.css";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar-container">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={{
          root: {},
          path: {
            stroke: `rgba(62, 152, 199, ${percentage / 100})`,
            strokeLinecap: "butt",
            transition: "stroke-dashoffset 0.5s ease 0s",
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          trail: {
            stroke: "#d6d6d6",
            strokeLinecap: "butt",
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          text: {
            fill: "#f88",
            fontSize: "16px",
          },
          background: {
            fill: "#3e98c7",
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;
