import React from "react";
import "./LoadingBar.css"; // CSS 파일 import

interface LoadingBarProps {
    progress: number,
}

const LoadingBar:React.FC<LoadingBarProps> = ({ progress }) => {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar-text">{Math.round(progress)}%</div>
      <div
        className="loading-bar-progress"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;