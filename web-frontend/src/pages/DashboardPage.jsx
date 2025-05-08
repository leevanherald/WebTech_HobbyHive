import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { FiSearch, FiMapPin, FiUser, FiUsers, FiBook, FiX } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
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
  const [recommendations, setRecommendations] = useState([]);
  const [others, setOthers] = useState([]);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  const filterOptions = {
    city: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"],
    state: ["Maharashtra", "Karnataka", "Gujarat", "Tamil Nadu", "Kerala"],
    country: ["USA", "Canada", "UK", "India", "Australia"],
    age: ["0-18", "19-35", "36-50", "51+"],
    gender: ["Male", "Female"],
    education: ["High School", "Undergraduate", "Graduate", "Working"],
    followers: ["0-50", "51-100", "101-500", "501+"],
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value.length > 0).length;
  };


  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3005/recommendations", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      
      // Ensure each profile has a friendshipStatus property
      const processedRecs = (data.recommendations || []).map(profile => ({
        ...profile,
        friendshipStatus: profile.friendshipStatus || "not_friends"
      }));
      
      const processedOthers = (data.others || []).map(profile => ({
        ...profile,
        friendshipStatus: profile.friendshipStatus || "not_friends"
      }));
  
      setRecommendations(processedRecs);
      setOthers(processedOthers);
      setHasAppliedFilters(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
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
      
      // Ensure each filtered profile has a friendshipStatus property
      const processedProfiles = data.map(profile => ({
        ...profile,
        friendshipStatus: profile.friendshipStatus || "not_friends"
      }));
      
      setProfiles(processedProfiles);
      setHasAppliedFilters(true);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
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
  
        // Update status in all profile lists
        setProfiles(prev => updateFriendshipStatus(prev, receiverId));
        setRecommendations(prev => updateFriendshipStatus(prev, receiverId));
        setOthers(prev => updateFriendshipStatus(prev, receiverId));
      } else {
        alert(result.message || "Failed to send friend request");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("An error occurred. Try again.");
    }
  };

  const updateFriendshipStatus = (profiles, receiverId) => {
    return profiles.map((profile) =>
      profile.id === receiverId
        ? { ...profile, friendshipStatus: "pending" }
        : profile
    );
  };

  const renderProfileCard = (profile) => (
    <motion.div 
      key={profile.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Profile Header */}
      <div className="relative">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{profile.name}</h3>
            <span className="bg-white text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {profile.age_group}
            </span>
          </div>
        </div>
        {profile.friendshipStatus === "pending" && (
          <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Pending
          </div>
        )}
      </div>

      {/* Profile Details */}
      <div className="p-5">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <FiMapPin className="mr-2 text-indigo-500 flex-shrink-0" />
            <span className="truncate">
              {profile.city}, {profile.state}, {profile.country}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiBook className="mr-2 text-indigo-500 flex-shrink-0" />
            <span>{profile.education}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiUser className="mr-2 text-indigo-500 flex-shrink-0" />
            <span>{profile.gender}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiUsers className="mr-2 text-indigo-500 flex-shrink-0" />
            <span>{profile.followers} followers</span>
          </div>
        </div>

        {/* Hobbies */}
        {profile.hobbies?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.slice(0, 4).map((hobby, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {hobby}
                </span>
              ))}
              {profile.hobbies.length > 4 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                  +{profile.hobbies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5">
          {profile.friendshipStatus === "not_friends" ? (
            <button
              onClick={() => addFriend(profile.id)}
              className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center"
            >
              <span>Add Friend</span>
            </button>
          ) : profile.friendshipStatus === "friends" ? (
            <button
              disabled
              className="w-full py-2 bg-gray-200 text-gray-600 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
            >
              <span>Friends</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
            >
              <span>Request Sent</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 mt-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-indigo-800"
          >
            Discover New Connections
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-indigo-700 font-medium group"
            >
              <IoFilterSharp className="text-xl transition-transform group-hover:rotate-12" />
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </motion.div>
        </div>

        {/* Filter Section */}
        <AnimatePresence>
          {isFilterVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Filter Profiles</h2>
                  <button 
                    onClick={() => setIsFilterVisible(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.keys(filterOptions).map((key) => (
                    <div key={key} className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2 capitalize">
                        {key}
                      </label>
                      <select
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-200"
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

                <div className="flex justify-end mt-6 gap-3">
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
                      setHasAppliedFilters(false);
                      loadRecommendations();
                    }}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => {
                      applyFilters();
                      setIsFilterVisible(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Show filtered results only if filters have been applied */}
            {hasAppliedFilters ? (
              <>
                {profiles.length > 0 ? (
                  <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      Search Results
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {profiles.map(profile => renderProfileCard(profile))}
                    </div>
                  </motion.section>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow p-10 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <FiUsers className="text-6xl text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No Profiles Found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your filters to find more people
                    </p>
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
                        setHasAppliedFilters(false);
                        loadRecommendations();
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                {/* Recommended Profiles Section */}
                {recommendations.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-2xl font-semibold text-indigo-800 mb-6">
                      Recommended for You
                      <span className="ml-2 text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        {recommendations.length} matches
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {recommendations.map(profile => renderProfileCard(profile))}
                    </div>
                  </motion.section>
                )}

                {/* Other People Section */}
                {others.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                      Other People to Connect With
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {others.map(profile => renderProfileCard(profile))}
                    </div>
                  </motion.section>
                )}

                {/* Empty State */}
                {recommendations.length === 0 && others.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow p-10 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <FiUsers className="text-6xl text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No Profiles Found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your filters to find more people
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;