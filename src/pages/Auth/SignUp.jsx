import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import "./Auth.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await registerUser(formData.username, formData.password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    navigate("/auth/signin");
  }

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter a username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repeat your password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="auth-btn" type="submit">
          Sign up
        </button>

      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <a href="/auth/signin">Sign in</a>
      </p>
    </div>
  );
};

export default SignUp;
