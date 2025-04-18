import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react";
import { FaArrowLeft, FaUsers, FaMapMarkerAlt, FaLeaf, FaHome } from "react-icons/fa";
import { Tab, Tabs } from "react-bootstrap";
import { LinearProgress } from "@mui/material";
import './ProfileDetail.css';

const getUserHobbies = async (email) => {
  try {
    const response = await fetch("http://localhost:3005/userhobby", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    if (!Array.isArray(data)) {
      console.error("Unexpected data format:", data);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Error fetching hobbies:", err);
    return [];
  }
};

function ProfileDetail() {
  const { email } = useParams(); // assuming email is passed as a URL parameter
  const navigate = useNavigate(); // useNavigate for navigation
  const [profile, setProfile] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      // Fetch profile data (example)
      const profileData = await fetch(`http://localhost:3005/userprofile/${email}`);
      const profileJSON = await profileData.json();
      setProfile(profileJSON);
      const userHobbies = await getUserHobbies(email);
      setHobbies(userHobbies);
      setLoading(false);
    };
    fetchProfileData();
  }, [email]);

  const renderStats = () => {
    const stats = [
      {
        icon: <FaUsers />,
        label: "Followers",
        value: profile.followers || 0,
      },
      {
        icon: <FaMapMarkerAlt />,
        label: "City",
        value: profile.city || "N/A",
      },
      {
        icon: <FaLeaf />,
        label: "Age Group",
        value: profile.age_group || "N/A",
      },
    ];
    return stats.map((stat, index) => (
      <div key={index} className="stat-item">
        <div className="stat-icon">{stat.icon}</div>
        <Text className="stat-value">{stat.value}</Text>
        <Text className="stat-label">{stat.label}</Text>
      </div>
    ));
  };

  return (
    <div className="profile-detail">
      <div className="header">
        <Button
          variant="light"
          className="back-button"
          onClick={() => navigate(-1)} // use navigate(-1) to go back
        >
          <FaArrowLeft /> Back
        </Button>
        <h2 className="header-title">Profile</h2>
      </div>

      <div className="profile-card">
        <div className="profile-image-container">
          <Image
            className="profile-image"
            src={profile.image || "/default-profile.jpg"}
            alt="Profile"
            roundedCircle
          />
        </div>
        <div className="profile-info">
          <h3>{profile.name || "User"}</h3>
          <p>{profile.current_status || "No status"}</p>
          <div className="gender-container">
            <Text>{profile.gender || "N/A"}</Text>
          </div>
          {renderStats()}
        </div>
      </div>

      <div className="hobbies-section">
        <h3>Hobbies & Interests</h3>
        {loading ? (
          <div className="loading-container">
            <ActivityIndicator size="large" color="#1976D2" />
            <Text>Loading hobbies...</Text>
          </div>
        ) : hobbies.length > 0 ? (
          <Tabs defaultActiveKey="home" id="hobbies-tabs" className="hobbies-tabs">
            {hobbies.map((hobby, index) => (
              <Tab eventKey={hobby.hobby} title={hobby.hobby} key={index}>
                <div className="hobby-details">
                  <h4>{hobby.hobby}</h4>
                  <Text>{hobby.description || "No description available"}</Text>
                  <div className="hobby-progress">
                    <LinearProgress
                      variant="determinate"
                      value={hobby.experience ? 100 : 50}
                      color="primary"
                    />
                    <Text>Experience: {hobby.experience || "Beginner"}</Text>
                  </div>
                </div>
              </Tab>
            ))}
          </Tabs>
        ) : (
          <div className="empty-hobbies">
            <Text>No hobbies added yet</Text>
          </div>
        )}
      </div>

      <div className="floating-action-button">
        <Button
          variant="primary"
          onClick={() => navigate("/home")} // navigate to home
        >
          <FaHome /> Home
        </Button>
      </div>
    </div>
  );
}

export default ProfileDetail;
