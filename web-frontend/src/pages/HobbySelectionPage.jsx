import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FiCheck, FiCircle } from "react-icons/fi";

const hobbiesData = {
  "Creative Arts": ["Painting", "Drawing", "Sculpting", "Photography", "Digital Art"],
  "Cooking and Baking": ["Gourmet Cooking", "Pastry Making", "Fermenting", "Barbecuing"],
  Collecting: ["Vintage Items", "Coins", "Stamps", "Comic Books", "Action Figures"],
  "Outdoor Activities": ["Hiking", "Bird Watching", "Gardening", "Stargazing"],
  "Indoor Activities": ["Board Games", "Video Games", "Cooking", "Reading"],
  "Sports and Fitness": ["Basketball", "Tennis", "Yoga", "Cycling", "Gymnastics"],
  Technology: ["Programming", "Web Design", "Robotics", "Video Editing"],
  Education: ["Language Learning", "Online Courses", "Research", "Finance & Business"],
  "Strategy Games": ["Chess", "Sudoku", "Crossword", "Trivia Quizzes"],
  "Social Activities": ["Volunteering", "Book Clubs", "Traveling", "Choirs"],
  Mindfulness: ["Meditation", "Pottery", "Spa & Wellness", "Casual Walks"],
};

const HobbySelectionPage = () => {
  const [search, setSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const navigate = useNavigate();

  const toggleSection = (category) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleHobby = (hobby) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((item) => item !== hobby)
        : [...prev, hobby]
    );
  };

  const handleContinue = () => {
    navigate("/hobbies-details", { state: { selectedHobbies } });
  };

  const filteredCategories = Object.keys(hobbiesData).filter((category) => {
    const matchesCategory = category.toLowerCase().includes(search.toLowerCase());
    const matchesHobby = hobbiesData[category].some((hobby) =>
      hobby.toLowerCase().includes(search.toLowerCase())
    );
    return matchesCategory || matchesHobby;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Discover Your Interests</h1>
          <p className="text-lg text-gray-600">Select hobbies that excite you the most</p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center max-w-2xl mx-auto mb-8 bg-white rounded-full shadow-sm px-5 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-400 transition-all duration-200"
        >
          <FaSearch className="text-gray-500 mr-3" size={18} />
          <input
            type="text"
            className="flex-1 focus:outline-none text-lg"
            placeholder="Search hobbies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          )}
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection(category)}
              >
                <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
                {expandedSections[category] ? (
                  <MdExpandLess className="text-gray-500" size={24} />
                ) : (
                  <MdExpandMore className="text-gray-500" size={24} />
                )}
              </div>

              <AnimatePresence>
                {expandedSections[category] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    <div className="space-y-2">
                      {hobbiesData[category].map((hobby) => {
                        const isSelected = selectedHobbies.includes(hobby);
                        return (
                          <motion.div
                            key={hobby}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center cursor-pointer p-3 rounded-lg transition-colors ${isSelected ? "bg-indigo-50" : "hover:bg-gray-50"}`}
                            onClick={() => toggleHobby(hobby)}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${isSelected ? "bg-indigo-600 border-indigo-600" : "border-gray-300"}`}>
                              {isSelected && <FiCheck className="text-white" size={12} />}
                            </div>
                            <span className={`${isSelected ? "font-medium text-indigo-700" : "text-gray-700"}`}>
                              {hobby}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Selected summary and continue button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            {selectedHobbies.length} {selectedHobbies.length === 1 ? "hobby" : "hobbies"} selected
          </p>
          <motion.button
            onClick={handleContinue}
            disabled={selectedHobbies.length === 0}
            className={`px-8 py-3 rounded-lg font-medium text-white shadow-md transition-all ${selectedHobbies.length > 0 ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" : "bg-gray-400 cursor-not-allowed"}`}
            whileHover={selectedHobbies.length > 0 ? { scale: 1.02 } : {}}
            whileTap={selectedHobbies.length > 0 ? { scale: 0.98 } : {}}
          >
            Continue
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HobbySelectionPage;