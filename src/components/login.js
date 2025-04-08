import React, { useState } from "react";
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState(""); // State to store the success/error message

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!"); // Display success message
      } else {
        setMessage(data.message || "Login failed");  // Display error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again."); // Display error message for network issues
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {message && <div className="message">{message}</div>} {/* Display message */}

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="driver">Driver/Captain</option>
          <option value="customer">Customer</option>
        </select>

        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className="extras">
          <a href="/forgot-password">Forgot password?</a>
          <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}
