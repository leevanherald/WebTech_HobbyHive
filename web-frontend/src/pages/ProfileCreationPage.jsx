import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCreationPage.css";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal", "Indore", "Patna",
  "Surat", "Nagpur", "Coimbatore", "Kochi", "Guwahati", "Visakhapatnam",
  "New York", "Los Angeles", "Chicago", "Houston", "Miami", "Seattle", "Boston"
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana"
];

const countries = ["USA", "Canada", "UK", "India", "Australia", "Switzerland"];
const educations = ["High School", "Undergraduate", "Graduate", "Working", "Retired"];
const genders = ["Male", "Female", "Other", "Prefer not to say"];

const ProfileCreationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    state: "",
    country: "",
    dob: "",
    email: "",
    phone: "",
    education: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate fetching user data
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from the backend (Simulated here)
      // Example of how it could be implemented
      const data = await fetch("http://localhost:3005/me", { credentials: "include" });
      const userData = await data.json();
      if (userData?.user?.email) {
        setFormData((prevData) => ({ ...prevData, email: userData.user.email }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { fullName, city, state, country, dob, email, education, gender } = formData;

    if (!fullName.trim()) newErrors.fullName = "Name is required";
    if (!city) newErrors.city = "City is required";
    if (!state) newErrors.state = "State is required";
    if (!country) newErrors.country = "Country is required";
    if (!education) newErrors.education = "Education is required";
    if (!gender) newErrors.gender = "Gender is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

    if (!dob.trim()) newErrors.dob = "Date of birth is required";
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) newErrors.dob = "Use YYYY-MM-DD format";

    if (formData.phone && (!/^\d+$/.test(formData.phone) || formData.phone.length !== 10)) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3005/saveUserDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/hobbies-selection");
      } else {
        throw new Error(data.message || "Failed to save details");
      }
    } catch (error) {
      alert(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="input-field"
          />
          {errors.fullName && <div className="error-message">{errors.fullName}</div>}
        </div>

        <div className="form-group">
          <label>City</label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="input-field"
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>

        <div className="form-group">
          <label>State</label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="input-field"
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <div className="error-message">{errors.state}</div>}
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="input-field"
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <div className="error-message">{errors.country}</div>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
            className="input-field"
          />
          {errors.dob && <div className="error-message">{errors.dob}</div>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="input-field"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="input-field"
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Education</label>
          <select
            value={formData.education}
            onChange={(e) => handleInputChange("education", e.target.value)}
            className="input-field"
          >
            <option value="">Select Education</option>
            {educations.map((education, index) => (
              <option key={index} value={education}>{education}</option>
            ))}
          </select>
          {errors.education && <div className="error-message">{errors.education}</div>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="input-field"
          >
            <option value="">Select Gender</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>{gender}</option>
            ))}
          </select>
          {errors.gender && <div className="error-message">{errors.gender}</div>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileCreationPage;
