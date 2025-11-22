import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../../services/auth";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await loginUser(formData.username, formData.password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    // ⭐ SAVE EVERYTHING WE NEED FOR CHAT
    localStorage.setItem("token", result.token);
    localStorage.setItem("userId", result.userId);
    localStorage.setItem("username", result.username);

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
        Don't have an account? <a href="/auth/signup">Sign up</a>
      </p>
    </div>
  );
};

export default SignIn;
