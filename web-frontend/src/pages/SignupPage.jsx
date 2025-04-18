import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [secure, setSecure] = useState({
    password: true,
    confirmPassword: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSecureEntry = (field) => {
    setSecure({ ...secure, [field]: !secure[field] });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const { name, email, password, confirmPassword } = form;

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3005/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();
      if (data) navigate("/profile-creation");
      else alert("Signup failed");
    } catch (err) {
      alert(err.message || "Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-logo">HobbyHive</h1>
        <h2>Create Account</h2>
        <p className="subtitle">Join our community today</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={errors.name ? "input error" : "input"}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? "input error" : "input"}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}

          <label>Password</label>
          <div className="input-password-container">
            <input
              type={secure.password ? "password" : "text"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? "input error" : "input"}
            />
            <span onClick={() => toggleSecureEntry("password")} className="eye-toggle">
              {secure.password ? "👁️" : "🔒"}
            </span>
          </div>
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <label>Confirm Password</label>
          <div className="input-password-container">
            <input
              type={secure.confirmPassword ? "password" : "text"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "input error" : "input"}
            />
            <span
              onClick={() => toggleSecureEntry("confirmPassword")}
              className="eye-toggle"
            >
              {secure.confirmPassword ? "👁️" : "🔒"}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}

          <p className="terms">
            By signing up, you agree to our{" "}
            <span className="link">Terms of Service</span> and{" "}
            <span className="link">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            className="signup-button"
            disabled={
              isLoading ||
              !form.name ||
              !form.email ||
              !form.password ||
              !form.confirmPassword
            }
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <p className="signin-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
