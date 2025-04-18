import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUsers, FaMapMarkerAlt, FaLeaf, FaHome } from "react-icons/fa";
import { Tab, Tabs, Button, Image } from "react-bootstrap";
import { LinearProgress, CircularProgress } from "@mui/material";
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
  const { email } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
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
        <div className="stat-value">{stat.value}</div>
        <div className="stat-label">{stat.label}</div>
      </div>
    ));
  };

  return (
    <div className="profile-detail">
      <div className="header">
        <Button
          variant="light"
          className="back-button"
          onClick={() => navigate(-1)}
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
            <p>{profile.gender || "N/A"}</p>
          </div>
          {renderStats()}
        </div>
      </div>

      <div className="hobbies-section">
        <h3>Hobbies & Interests</h3>
        {loading ? (
          <div className="loading-container">
            <CircularProgress color="primary" />
            <p>Loading hobbies...</p>
          </div>
        ) : hobbies.length > 0 ? (
          <Tabs defaultActiveKey="home" id="hobbies-tabs" className="hobbies-tabs">
            {hobbies.map((hobby, index) => (
              <Tab eventKey={hobby.hobby} title={hobby.hobby} key={index}>
                <div className="hobby-details">
                  <h4>{hobby.hobby}</h4>
                  <p>{hobby.description || "No description available"}</p>
                  <div className="hobby-progress">
                    <LinearProgress
                      variant="determinate"
                      value={hobby.experience ? 100 : 50}
                      color="primary"
                    />
                    <p>Experience: {hobby.experience || "Beginner"}</p>
                  </div>
                </div>
              </Tab>
            ))}
          </Tabs>
        ) : (
          <div className="empty-hobbies">
            <p>No hobbies added yet</p>
          </div>
        )}
      </div>

      <div className="floating-action-button">
        <Button
          variant="primary"
          onClick={() => navigate("/home")}
        >
          <FaHome /> Home
        </Button>
      </div>
    </div>
  );
}

export default ProfileDetail;
