import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUserFriends, 
  FaBell, 
  FaUsers, 
  FaRobot, 
  FaCommentDots, 
  FaClipboardList, 
  FaUserCircle, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationBar = ({ toggleChatbot }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home', icon: <FaHome className="text-lg" /> },
    { name: 'Find People', path: '/people', icon: <FaUsers className="text-lg" /> },
    { name: 'Friend Requests', path: '/friend-requests', icon: <FaBell className="text-lg" /> },
    { name: 'Friends', path: '/friends', icon: <FaUserFriends className="text-lg" /> },
    { name: 'Chatbot', path: '#', icon: <FaRobot className="text-lg" />, action: toggleChatbot },
    { name: 'Feedback', path: '/feedback', icon: <FaCommentDots className="text-lg" /> },
    { name: 'Hobby Risk Survey', path: '/hobbyrisksurvey', icon: <FaClipboardList className="text-lg" /> },
    { name: 'Profile', path: '/profile', icon: <FaUserCircle className="text-lg" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-white bg-gradient-to-r from-amber-500 to-orange-500' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100';
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center"
            >
              <Link to="/home" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent hidden sm:block">
                  HobbyHive
                </h1>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${isActive(item.path)}`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${isActive(item.path)}`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <div className="lg:hidden flex items-center">
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white shadow-lg border-t"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.action ? (
                      <button
                        onClick={() => {
                          item.action();
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-3 py-3 rounded-md text-base font-medium ${isActive(item.path)}`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`w-full flex items-center px-3 py-3 rounded-md text-base font-medium ${isActive(item.path)}`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default NavigationBar;