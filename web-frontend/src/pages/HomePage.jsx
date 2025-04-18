import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatbotPage from './ChatBotPage';

const HomePage = () => {

  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 to-orange-500">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg py-4 fixed w-full top-0 z-10">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-semibold text-yellow-600">HobbyHive</h1>
          <div className="space-x-6">
            <Link to="/people" className="text-xl text-gray-800 hover:text-yellow-600">Find People</Link>
            <Link to="#" onClick={toggleChatbot} className="text-xl text-gray-800 hover:text-yellow-600">
              Chatbot
            </Link>
            <Link to="/feedback" className="text-xl text-gray-800 hover:text-yellow-600">Feedback</Link>
            <Link to="/hobbyrisksurvey" className="text-xl text-gray-800 hover:text-yellow-600">Hobby Risk Survey</Link>
            <Link to="/profile" className="text-xl text-gray-800 hover:text-yellow-600">Profile</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex justify-center items-center h-screen bg-cover bg-center relative text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h2 className="text-5xl font-bold leading-tight mb-4">
            Welcome to HobbyHive
          </h2>
          <p className="text-xl mb-6">
            A community of hobby enthusiasts! Explore, connect, and grow with like-minded individuals.
          </p>
          <Link
            to="/explore"
            className="bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-lg text-2xl transition duration-300 hover:bg-yellow-500"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      <div
        className={`fixed bottom-0 right-0 w-full md:w-1/2 lg:w-1/3 h-3/4 bg-white shadow-lg rounded-t-lg transform transition-transform duration-500 ease-in-out z-50 ${isChatbotVisible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
          }`}
      >
        <ChatbotPage />
      </div>


      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Explore Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Find People"
              description="Find People with Similar Hobbies"
              link="/dashboard"
              icon="fas fa-comment-alt"
            />
            <FeatureCard
              title="Chatbot"
              description="Get personalized hobby suggestions and advice."
              link="/chatbot"
              icon="fas fa-comment-alt"
            />
            <FeatureCard
              title="Feedback"
              description="Share your thoughts and help us improve."
              link="/feedback"
              icon="fas fa-comment-dots"
            />
            <FeatureCard
              title="Hobby Risk Survey"
              description="Find out the risk factors associated with your hobbies."
              link="/hobbyrisksurvey"
              icon="fas fa-chart-bar"
            />
            <FeatureCard
              title="Profile"
              description="Manage your personal profile and hobbies."
              link="/profile"
              icon="fas fa-user-circle"
            />
          </div>
        </div>
      </section>



      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 HobbyHive. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description, link, icon }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
      <div className="text-4xl mb-4 text-yellow-500">
        <i className={icon}></i>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="text-yellow-600 hover:text-yellow-500 text-lg font-medium"
      >
        Learn More
      </Link>
    </div>
  );
};

export default HomePage;
