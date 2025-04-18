// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import ProfileCreationPage from './pages/ProfileCreationPage'; // Your profile creation page
import HobbySelectionPage from './pages/HobbySelectionPage'; // Your profile creation page
import HobbyDetailsPage from './pages/HobbyDetailsPage'; // Your profile creation page
import HomePage from './pages/HomePage'; // Your profile creation page
import ChatBotPage from './pages/ChatBotPage'; // Your profile creation page
import FeedbackPage from './pages/FeedbackPage'; // Your profile creation page
import HobbyRiskSurveyPage from './pages/HobbyRiskSurveyPage'; // Your profile creation page
import ProfilePage from './pages/ProfilePage'; // Your profile creation page
import ProfileDetail from './pages/ProfileDetail'; // Your profile creation page
import DashboardPage from './pages/DashboardPage'; // Your profile creation page


function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile-creation" element={<ProfileCreationPage />} />
      <Route path="/hobbies-selection" element={<HobbySelectionPage />} />
      <Route path="/hobbies-details" element={<HobbyDetailsPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/chatbot" element={<ChatBotPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/hobbyrisksurvey" element={<HobbyRiskSurveyPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile-details" element={<ProfileDetail />} />
      <Route path="/people" element={<DashboardPage />} />

    </Routes>
  );
}

export default App;
