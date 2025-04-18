import React from "react";

const ProgressBar = ({ percent }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
      <div
        className="bg-blue-500 h-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
