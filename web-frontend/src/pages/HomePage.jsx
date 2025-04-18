import React from 'react';
import { Link } from 'react-router-dom';
import ChatbotPage from './ChatBotPage';

const HomePage = ({ toggleChatbot, isChatbotVisible }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-0 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}></div>
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm"></div>
        
        <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-8 rounded-2xl border border-white border-opacity-20 shadow-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white leading-tight">
                Discover Your<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Passion
                </span>
              </h1>
              <p className="text-xl text-white opacity-90 mb-8">
                Connect with hobby enthusiasts, explore new interests, and find your community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-8 rounded-lg shadow-lg text-lg font-medium hover:shadow-orange-500/30 hover:scale-105 transition duration-300"
                >
                  Start Exploring
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-white text-amber-600 py-3 px-8 rounded-lg shadow-lg text-lg font-medium hover:bg-gray-50 transition duration-300"
                >
                  Find Communities
                </Link>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <svg 
                className="animate-bounce w-8 h-8 text-white opacity-70" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              HobbyHive provides everything you need to discover new hobbies and connect with like-minded enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Connect with Enthusiasts"
              description="Find and connect with people who share your interests and passions."
              link="/dashboard"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 015-2.262" />
                </svg>
              }
              color="from-amber-400 to-amber-600"
            />
            <FeatureCard
              title="Hobby Assistant"
              description="Get personalized hobby suggestions and advice from our AI assistant."
              link="/chatbot"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              }
              color="from-orange-400 to-orange-600"
            />
            <FeatureCard
              title="Risk Assessment"
              description="Understand the risk factors associated with different hobbies."
              link="/hobbyrisksurvey"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
              color="from-red-400 to-red-600"
            />
            <FeatureCard
              title="User Profiles"
              description="Create and customize your profile to showcase your hobby journey."
              link="/profile"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              }
              color="from-blue-400 to-blue-600"
            />
            <FeatureCard
              title="Community Feedback"
              description="Share your experiences and help improve our platform."
              link="/feedback"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3v-3h6a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              }
              color="from-green-400 to-green-600"
            />
            <FeatureCard
              title="Hobby Events"
              description="Discover and join events related to your favorite hobbies."
              link="/events"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              }
              color="from-purple-400 to-purple-600"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Members Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of hobby enthusiasts who have found their passion through HobbyHive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="HobbyHive helped me discover my passion for photography and connect with amazing mentors."
              author="Alex Johnson"
              role="Photography Enthusiast"
            />
            <TestimonialCard
              quote="The risk assessment tool helped me understand what I needed to prepare for my new rock climbing hobby."
              author="Sarah Chen"
              role="Rock Climbing Beginner"
            />
            <TestimonialCard
              quote="I found a local group of pottery enthusiasts through HobbyHive that I meet with every week now!"
              author="Michael Rodriguez"
              role="Pottery Artist"
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Hobby Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Join our community today and discover new passions!</p>
          <Link
            to="/explore"
            className="bg-white text-amber-600 py-3 px-8 rounded-lg shadow-lg text-lg font-medium hover:bg-gray-50 hover:shadow-xl transition duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Chatbot */}
      <div
        className={`fixed bottom-0 right-0 w-full md:w-1/2 lg:w-1/3 h-3/4 bg-white shadow-2xl rounded-t-xl transform transition-transform duration-500 ease-in-out z-50 ${
          isChatbotVisible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="text-white font-medium">HobbyHive Assistant</h3>
          <button 
            onClick={toggleChatbot}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-full overflow-hidden">
          <ChatbotPage />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 015-2.262" />
              </svg>
              <span className="font-bold text-xl text-white">HobbyHive</span>
            </div>
            <p className="text-sm">
              Connecting hobby enthusiasts since 2025. Our platform helps you discover new interests and find your community.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-amber-400 transition">Find People</Link></li>
              <li><Link to="/chatbot" className="hover:text-amber-400 transition">Hobby Assistant</Link></li>
              <li><Link to="/hobbyrisksurvey" className="hover:text-amber-400 transition">Risk Assessment</Link></li>
              <li><Link to="/profile" className="hover:text-amber-400 transition">User Profiles</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-amber-400 transition">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-amber-400 transition">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-gray-200 py-2 px-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-full"
                />
                <button className="bg-amber-500 text-white py-2 px-4 rounded-r-lg hover:bg-amber-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025 HobbyHive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <div className="mb-4 text-amber-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H9.414a1 1 0 00-.707.293L5.586 6.586A1 1 0 005 7.414V16a2 2 0 002 2h6.5a1 1 0 00.7-.3l3.8-4.2z" clipRule="evenodd" />
          <path d="M3 7.414V16a2 2 0 002 2h.5a1 1 0 00.7-.3L10 13.5a1 1 0 00.3-.7V9a1 1 0 00-1-1H3.414a1 1 0 01-.707-.293L.586 5.586A1 1 0 012 4.414z" />
        </svg>
      </div>
      <p className="text-gray-700 mb-6 italic">{quote}</p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
          {author.charAt(0)}
        </div>
        <div className="ml-3">
          <h4 className="font-semibold text-gray-800">{author}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, link, icon, color = "from-amber-500 to-orange-500" }) => { 
  return ( 
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full"> 
      <div className={`rounded-full w-16 h-16 flex items-center justify-center bg-gradient-to-r ${color} text-white mb-6`}> 
        {icon} 
      </div> 
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3> 
      <p className="text-gray-600 mb-6 flex-grow">{description}</p> 
      <Link to={link} className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center group transition duration-300" > 
        Learn More 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition duration-300" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
        > 
          <path 
            fillRule="evenodd" 
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </Link> 
    </div> 
  ); 
};

export default HomePage;