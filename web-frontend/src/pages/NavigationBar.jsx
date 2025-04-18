import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBell, FaUsers, FaRobot, FaCommentDots, FaClipboardList, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const NavigationBar = ({ toggleChatbot }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home', icon: <FaHome className="mr-2" /> },
    { name: 'Find People', path: '/people', icon: <FaUsers className="mr-2" /> },
    { name: 'Friend Requests', path: '/friend-requests', icon: <FaBell className="mr-2" /> },
    { name: 'Friends', path: '/friends', icon: <FaUserFriends className="mr-2" /> },
    { name: 'Chatbot', path: '#', icon: <FaRobot className="mr-2" />, action: toggleChatbot },
    { name: 'Feedback', path: '/feedback', icon: <FaCommentDots className="mr-2" /> },
    { name: 'Hobby Risk Survey', path: '/hobbyrisksurvey', icon: <FaClipboardList className="mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <FaUserCircle className="mr-2" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-yellow-500 font-medium' : 'text-gray-600';
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <h1 className="text-2xl font-bold text-yellow-600 hidden sm:block">HobbyHive</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                item.action ? (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className={`px-3 py-2 rounded-md text-sm flex items-center hover:bg-yellow-50 transition duration-200 ${isActive(item.path)}`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm flex items-center hover:bg-yellow-50 transition duration-200 ${isActive(item.path)}`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg border-t">
            <div className="container mx-auto px-4 py-2">
              {navItems.map((item) => (
                item.action ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-sm hover:bg-yellow-50 transition duration-200 ${isActive(item.path)}`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center w-full px-4 py-3 rounded-md text-sm hover:bg-yellow-50 transition duration-200 ${isActive(item.path)}`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavigationBar;