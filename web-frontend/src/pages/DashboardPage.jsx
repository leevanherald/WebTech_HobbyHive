import React, { useState } from 'react';

const DashboardPage = () => {
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
    try {
      const response = await fetch('http://localhost:3005/profiles', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">Discover Profiles</h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-lg mb-10 max-w-6xl mx-auto">
        {Object.keys(filterOptions).map((key) => (
          <div key={key}>
            <label className="block text-gray-700 font-medium mb-1 capitalize">{key}</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => handleFilterChange(key, e.target.value)}
              value={filters[key]}
            >
              <option value="">All</option>
              {filterOptions[key].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={applyFilters}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Profiles Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {profiles.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No profiles found.</p>
        ) : (
          profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-2xl shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-indigo-700">{profile.name}</h3>
                <span className="bg-indigo-100 text-indigo-600 text-sm font-semibold px-3 py-1 rounded-full">
                  {profile.age_group}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                📍 {profile.city}, {profile.state}, {profile.country}
              </p>
              <p className="text-gray-600 mb-2">🎓 {profile.education}</p>
              <p className="text-gray-600 mb-2">👤 {profile.gender}</p>
              <p className="text-gray-600 mb-4">👥 {profile.followers} followers</p>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
