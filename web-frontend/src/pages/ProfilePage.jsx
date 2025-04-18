import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ toggleChatbot, isChatbotVisible }) => {
  const [userData, setUserData] = useState(null);
  const [userHobbies, setUserHobbies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch user profile data
        const userResponse = await axios.get('http://localhost:3005/userinfo', { withCredentials: true });
        setUserData(userResponse.data);
        
        // Fetch user hobbies
        const hobbiesResponse = await axios.post(
          'http://localhost:3005/userhobby',
          {}, // POST body
          { withCredentials: true }
        );
        setUserHobbies(hobbiesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:3005/logout')
      .then(response => {
        console.log(response.data);
        window.location.reload();
        navigate("/");
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  };

  const toggleEditMode = () => {
    setEditMode(prevState => !prevState);
  };

  // Helper function to get user initials for avatar
  const getUserInitials = () => {
    if (!userData || !userData.user || !userData.user.name) return '?';
    return userData.user.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const NavigationBar = ({ toggleChatbot }) => (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-xl">HobbyHub</span>
            <div className="hidden md:flex space-x-4">
              <a href="/" className="hover:text-indigo-100 px-2 py-1 rounded transition duration-200">Home</a>
              <a href="/hobbies" className="hover:text-indigo-100 px-2 py-1 rounded transition duration-200">Discover</a>
              <a href="/profile" className="bg-white bg-opacity-20 text-white px-2 py-1 rounded transition duration-200">Profile</a>
            </div>
          </div>
          <button
            onClick={toggleChatbot}
            className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition duration-200 text-sm"
          >
            {isChatbotVisible ? "Hide Support" : "Get Support"}
          </button>
        </div>
      </div>
    </nav>
  );

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      <p className="mt-4 text-gray-600">Loading your profile...</p>
    </div>
  );

  const HobbyBadge = ({ hobby }) => {
    // Different colors based on experience
    const experienceColors = {
      'Beginner': 'bg-blue-100 text-blue-800',
      'Intermediate': 'bg-green-100 text-green-800',
      'Advanced': 'bg-purple-100 text-purple-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    
    const colorClass = experienceColors[hobby.experience] || experienceColors.default;
    
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
        <div className="flex items-center">
          <div className={`rounded-full w-10 h-10 flex items-center justify-center ${colorClass}`}>
            <span className="text-sm font-bold">{hobby.hobby.charAt(0).toUpperCase()}</span>
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-800">{hobby.hobby}</h3>
            <p className="text-sm text-gray-500">{hobby.experience || 'No experience listed'}</p>
          </div>
        </div>
        {editMode && (
          <button className="mt-2 sm:mt-0 text-red-500 hover:text-red-700 text-sm font-medium">
            Remove
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : userData ? (
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
              <div className="px-6 py-4 sm:px-8 sm:py-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="absolute top-0 transform -translate-y-1/2 left-8 bg-white rounded-full p-1 shadow-lg">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center text-white text-2xl font-bold">
                      {getUserInitials()}
                    </div>
                  </div>
                  <div className="mt-12 sm:mt-0 sm:ml-24">
                    <h1 className="text-2xl font-bold text-gray-800">{userData.user.name}</h1>
                    <p className="text-gray-600">{userData.user.email}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-auto">
                    <button
                      onClick={toggleEditMode}
                      className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                        editMode 
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {editMode ? 'Cancel Editing' : 'Edit Profile'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Two Column Layout on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Personal Info
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-800 font-medium">
                        {userData.user.city}, {userData.user.state}, {userData.user.country}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Age Group</p>
                      <p className="text-gray-800 font-medium">{userData.user.age_group}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-gray-800 font-medium">January 2025</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-200 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.5V2.5l4 4V17H4V3h8z" clipRule="evenodd" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
                      </svg>
                      My Hobbies
                    </h2>
                    {editMode && (
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Add New Hobby
                      </button>
                    )}
                  </div>
                  
                  {userHobbies.length > 0 ? (
                    <div className="space-y-3">
                      {userHobbies.map((hobby, index) => (
                        <HobbyBadge key={index} hobby={hobby} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 10-2 0v3.586L5.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L9 10.586V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No hobbies yet</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        You haven't added any hobbies to your profile. Add some to connect with like-minded enthusiasts!
                      </p>
                      <button className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200">
                        Discover Hobbies
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Activity Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Recent Activity
                  </h2>
                  
                  <div className="border-l-2 border-indigo-200 pl-4 ml-3 space-y-4">
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-500">April 15, 2025</p>
                        <p className="text-gray-700">You added a new hobby: {userHobbies[0]?.hobby || 'Photography'}</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-500">April 10, 2025</p>
                        <p className="text-gray-700">You updated your profile information</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-6 mt-1 w-3 h-3 bg-indigo-500 rounded-full"></div>
                      <div>
                        <p className="text-sm text-gray-500">April 5, 2025</p>
                        <p className="text-gray-700">You joined HobbyHub!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Session Expired</h2>
            <p className="text-gray-600 mb-6">Your session may have expired. Please log in again to view your profile.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 HobbyHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;