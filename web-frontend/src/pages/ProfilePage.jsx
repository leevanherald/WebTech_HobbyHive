import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userHobbies, setUserHobbies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch user profile data
    // axios.get('http://localhost:3005/me', { withCredentials: true })
    //   .then(response => {
    //     setUserData(response.data.user);
    //     console.log(response.data.user)
    //   })

    //   .catch(err => {
    //     console.error('Error fetching user data:', err);
    //   });


    axios.get('http://localhost:3005/userinfo', { withCredentials: true })
      .then(response => {
       
        console.log(response.data)
      })

      .catch(err => {
        console.error('Error fetching user data:', err);
      });

    // Fetch user hobbies
    axios.post('http://localhost:3005/userhobby', { email: 'user@example.com' })
      .then(response => {
        setUserHobbies(response.data);
      })
      .catch(err => {
        console.error('Error fetching hobbies:', err);
      });
  }, []);



  const handleLogout = () => {
    axios.post('http://localhost:3005/logout')
      .then(response => {
        console.log(response.data);
        window.location.reload();
        navigate("/")
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  };

  const toggleEditMode = () => {
    setEditMode(prevState => !prevState);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {userData ? (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
            <button
              onClick={toggleEditMode}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Personal Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600"><strong>Name:</strong> {userData.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
              <p className="text-gray-600"><strong>Location:</strong> {userData.city}, {userData.state}, {userData.country}</p>
              <p className="text-gray-600"><strong>Age Group:</strong> {userData.age_group}</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Hobbies</h2>
            {userHobbies.length > 0 ? (
              <ul className="space-y-2">
                {userHobbies.map((hobby, index) => (
                  <li key={index} className="text-gray-600">
                    <strong>{hobby.hobby}</strong> - {hobby.experience ? hobby.experience : 'No experience'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You haven't added any hobbies yet.</p>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
