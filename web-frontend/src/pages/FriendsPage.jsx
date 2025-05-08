import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMessageSquare, FiSearch, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import ChatScreen from "./ChatScreen";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const navigate = useNavigate();

  const getCurrentUserId = async () => {
    try {
      const response = await fetch("http://localhost:3005/userinfo", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Not logged in");
      const data = await response.json();
      setCurrentUserId(data.user.id);
      return data.user.id;
    } catch (error) {
      console.error("Failed to get user:", error.message);
      toast.error("Please login to view friends");
      navigate("/login");
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getCurrentUserId();
      if (!userId) return;

      try {
        const response = await fetch("http://localhost:3005/friends", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch friends");
        const data = await response.json();
        setFriends(data);
      } catch (err) {
        console.error("Error:", err);
        toast.error("Failed to load friends");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.hobbies?.some(hobby => hobby.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-800">Your Friends</h1>
            <p className="text-indigo-600 mt-1">
              {friends.length} {friends.length === 1 ? 'connection' : 'connections'}
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search friends or hobbies..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <FiUser className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No friends yet</h3>
            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
              Connect with people who share your interests
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/find-friends')}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Find Friends <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600">No matches for "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100"
              >
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-white text-xl font-bold">{friend.name}</h2>
                      <p className="text-indigo-100 text-sm">{friend.email}</p>
                    </div>
                    <span className="bg-white text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      {friend.age_group || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-5">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FiUser className="mr-2 text-indigo-500" />
                      <span>{friend.gender} · {friend.followers} followers</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{friend.city}, {friend.country}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <span>{friend.education}</span>
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Hobbies</h4>
                    <div className="flex flex-wrap gap-2">
                      {friend.hobbies?.map((hobby, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setSelectedFriend(friend)}
                      className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center justify-center"
                    >
                      <FiMessageSquare className="mr-2" />
                      Chat
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${friend.id}`)}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {selectedFriend && (
        <ChatScreen
          selectedFriend={selectedFriend}
          currentUserId={currentUserId}
          onClose={() => setSelectedFriend(null)}
        />
      )}
    </div>
  );
};

export default FriendsPage;