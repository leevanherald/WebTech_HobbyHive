import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaSearch, FaTimes, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

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
  const navigate = useNavigate(); // Hook for navigation in React Router v6
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
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">Discover Your Interests</h1>
          <p className="text-gray-600 mt-2">Select hobbies that excite you</p>
        </div>

        {/* Search bar */}
        <div className="flex items-center max-w-lg mx-auto mb-6 bg-white rounded-md shadow-sm px-3 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            className="flex-1 focus:outline-none"
            placeholder="Search hobbies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <FaTimes className="text-gray-400 hover:text-red-500" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div key={category} className="bg-white rounded-lg shadow p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(category)}
              >
                <h2 className="text-lg font-semibold">{category}</h2>
                {expandedSections[category] ? (
                  <MdExpandLess size={24} />
                ) : (
                  <MdExpandMore size={24} />
                )}
              </div>

              {expandedSections[category] && (
                <div className="mt-3 space-y-2">
                  {hobbiesData[category].map((hobby) => {
                    const isSelected = selectedHobbies.includes(hobby);
                    return (
                      <div
                        key={hobby}
                        className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
                        onClick={() => toggleHobby(hobby)}
                      >
                        {isSelected ? (
                          <FaCheckCircle className="text-indigo-600 mr-2" />
                        ) : (
                          <FaRegCircle className="text-gray-400 mr-2" />
                        )}
                        <span
                          className={`${isSelected ? "font-medium text-indigo-700" : ""
                            }`}
                        >
                          {hobby}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected summary and continue button */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            {selectedHobbies.length} hobby{selectedHobbies.length !== 1 && "ies"} selected
          </p>
          <button
            onClick={handleContinue}
            disabled={selectedHobbies.length === 0}
            style={{
              backgroundColor: selectedHobbies.length > 0 ? "indigo" : "gray",
              cursor: selectedHobbies.length > 0 ? "pointer" : "not-allowed",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default HobbySelectionPage;
