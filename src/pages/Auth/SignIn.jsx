import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Placeholder za backend auth
    console.log("SIGN IN:", formData);

    // Redirect after success
    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className="auth-btn">Sign in</button>
      </form>

      <p className="auth-switch">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default SignIn;