import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

// =======================
// REGISTER USER
// =======================
export async function registerUser(username, password) {
  try {
    const res = await axios.post(`${API_URL}/sign-up`, {
      username,
      password,
    });

    const token = res.data.token;
    localStorage.setItem("token", token);

    return { success: true, token };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Registration failed",
    };
  }
}

// =======================
// LOGIN USER
// =======================
export async function loginUser(username, password) {
  try {
    const res = await axios.post(`${API_URL}/sign-in`, {
      username,
      password,
    });

    const token = res.data.token;
    localStorage.setItem("token", token);

    return { success: true, token };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
}

// =======================
// GET LOGGED USER
// =======================
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const res = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    return null;
  }
}

// =======================
// LOGOUT
// =======================
export function logoutUser() {
  localStorage.removeItem("token");
}