import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-logo">HobbyHive</h1>
        <h2>Welcome to HobbyHive</h2>
        <p className="subtitle">Join our community and explore hobbies!</p>
        
        <div className="button-container">
          <button
            className="btn-primary"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
