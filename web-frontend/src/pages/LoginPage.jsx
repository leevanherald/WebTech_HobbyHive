import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3005/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      console.log("Login successful:", data);
      window.location.href = "/home"; // redirect on login success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">HobbyHive</h1>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue</p>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={secure ? "password" : "text"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="eye-button"
              onClick={() => setSecure(!secure)}
              type="button"
            >
              {secure ? "👁️" : "🔒"}
            </button>
          </div>
        </div>

        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
