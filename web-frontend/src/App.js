// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom"; // ✅ only import Routes + Route
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import ProfileCreationPage from './pages/ProfileCreationPage';
import HobbySelectionPage from './pages/HobbySelectionPage';
import HobbyDetailsPage from './pages/HobbyDetailsPage';
import HomePage from './pages/HomePage';
import ChatBotPage from './pages/ChatBotPage';
import FeedbackPage from './pages/FeedbackPage';
import HobbyRiskSurveyPage from './pages/HobbyRiskSurveyPage';
import ProfilePage from './pages/ProfilePage';
import ProfileDetail from './pages/ProfileDetail';
import DashboardPage from './pages/DashboardPage';
import FriendRequestsPage from './pages/FriendRequestsPage';
import FriendsPage from './pages/FriendsPage';
import NavigationBar from './pages/NavigationBar';

function App() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const toggleChatbot = () => {
    console.log("Toggle chatbot clicked");
    setIsChatbotVisible(prev => !prev);
  };


  return (
    <>
      <NavigationBar toggleChatbot={toggleChatbot} />
      
      <div className={`fixed bottom-0 right-0 w-full md:w-1/2 lg:w-1/3 h-3/4 bg-white shadow-lg rounded-t-lg transform transition-transform duration-500 ease-in-out z-50 ${isChatbotVisible ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}>
        <ChatBotPage />
      </div>

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile-creation" element={<ProfileCreationPage />} />
        <Route path="/hobbies-selection" element={<HobbySelectionPage />} />
        <Route path="/hobbies-details" element={<HobbyDetailsPage />} />
        <Route path="/home" element={<HomePage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible} />} />
        <Route path="/chatbot" element={<ChatBotPage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible}/>} />
        <Route path="/feedback" element={<FeedbackPage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible}/>} />
        <Route path="/hobbyrisksurvey" element={<HobbyRiskSurveyPage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible}/>} />
        <Route path="/profile" element={<ProfilePage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible}/>} />
        <Route path="/profile-details" element={<ProfileDetail />} />
        <Route path="/people" element={<DashboardPage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible}/>} />
        <Route path="/friend-requests" element={<FriendRequestsPage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible}/>} />
        <Route path="/friends" element={<FriendsPage toggleChatbot={toggleChatbot} isChatbotVisible={isChatbotVisible}/>} />
      </Routes>
    </>
  );
}

export default App;
