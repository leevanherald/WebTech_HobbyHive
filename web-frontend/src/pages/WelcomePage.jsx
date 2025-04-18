import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-yellow-200 to-white-500 p-4">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-50 blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300 rounded-full opacity-50 blur-xl animate-pulse delay-700"></div>
        
        {/* Main Card */}
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 hover:shadow-3xl">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Hobby<span className="text-yellow-300">Hive</span>
            </h1>
          </div>
          
          {/* Card Content */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to HobbyHive</h2>
            <p className="text-gray-600 mb-8">Join our community and explore hobbies with like-minded people!</p>
            
            <div className="space-y-4">
              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-lg transform transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
              
              <button
                className="w-full bg-transparent border border-indigo-500 text-indigo-700 py-3 px-6 rounded-lg font-medium transform transition duration-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </button>
            </div>
            
            {/* Features Highlights */}
            <div className="mt-12 grid grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-md bg-indigo-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Community</h3>
                  <p className="text-xs text-gray-500">Connect with hobbyists</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Discover</h3>
                  <p className="text-xs text-gray-500">Explore new hobbies</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-md bg-yellow-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Events</h3>
                  <p className="text-xs text-gray-500">Join hobby meetups</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-md bg-red-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Learn</h3>
                  <p className="text-xs text-gray-500">Share knowledge</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card Footer */}
          <div className="px-8 py-4 bg-gray-50 text-center">
            <p className="text-xs text-gray-500">
              By joining, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;