import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { FiSearch, FiMapPin, FiUser, FiUsers, FiBook } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const DashboardPage = ({ toggleChatbot, isChatbotVisible }) => {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    country: "",
    age: "",
    gender: "",
    education: "",
    followers: "",
    experience: "",
  });
  
  const [profiles, setProfiles] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filterOptions = {
    city: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"],
    state: ["Maharashtra", "Karnataka", "Gujarat", "Tamil Nadu", "Kerala"],
    country: ["USA", "Canada", "UK", "India", "Australia"],
    age: ["0-18", "19-35", "36-50", "51+"],
    gender: ["Male", "Female"],
    education: ["High School", "Undergraduate", "Graduate", "Working"],
    followers: ["0-50", "51-100", "101-500", "501+"],
  };

  const applyFilters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3005/profiles", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filters }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load of profiles
  useEffect(() => {
    applyFilters();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addFriend = async (receiverId) => {
    try {
      const response = await fetch("http://localhost:3005/friend-request", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Friend request sent!");
      } else {
        alert(result.message || "Failed to send friend request");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("An error occurred. Try again.");
    }
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value.length > 0).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      
      <div className="container mx-auto px-4 py-6 mt-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4 md:mb-0">
            Discover New Connections
          </h1>
          
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-indigo-700 font-medium"
          >
            <IoFilterSharp className="text-xl" />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>

        {/* Filter Section */}
        {isFilterVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Profiles</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(filterOptions).map((key) => (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2 capitalize">
                    {key}
                  </label>
                  <select
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                    value={filters[key]}
                  >
                    <option value="">All {key}s</option>
                    {filterOptions[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setFilters({
                    city: "",
                    state: "",
                    country: "",
                    age: "",
                    gender: "",
                    education: "",
                    followers: "",
                    experience: "",
                  });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg mr-3 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  applyFilters();
                  setIsFilterVisible(false);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        <div className="mb-8">
          <div className="flex items-center text-gray-600 mb-6">
            <FiSearch className="mr-2" />
            <span>
              {isLoading
                ? "Searching for profiles..."
                : profiles.length === 0
                ? "No profiles found. Try adjusting your filters."
                : `Found ${profiles.length} profile${profiles.length !== 1 ? "s" : ""}`}
            </span>
          </div>
        </div>

        {/* Profiles Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{profile.name}</h3>
                    <span className="bg-white text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      {profile.age_group}
                    </span>
                  </div>
                </div>
                
                {/* Profile Details */}
                <div className="p-5">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-2 text-indigo-500" />
                      <span>
                        {profile.city}, {profile.state}, {profile.country}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiBook className="mr-2 text-indigo-500" />
                      <span>{profile.education}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiUser className="mr-2 text-indigo-500" />
                      <span>{profile.gender}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiUsers className="mr-2 text-indigo-500" />
                      <span>{profile.followers} followers</span>
                    </div>
                  </div>
                  
                  {/* Hobbies */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Hobbies</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.hobbies.map((hobby, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => addFriend(profile.id)}
                    className="mt-5 w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center"
                  >
                    <span>Add Friend</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && profiles.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <div className="flex justify-center mb-4">
              <FiUsers className="text-6xl text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Profiles Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to find more people</p>
            <button
              onClick={() => {
                setFilters({
                  city: "",
                  state: "",
                  country: "",
                  age: "",
                  gender: "",
                  education: "",
                  followers: "",
                  experience: "",
                });
                applyFilters();
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;