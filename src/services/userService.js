
import axios from "axios";

const API = "http://localhost:3000/api/users";

export async function getProfile() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function updateProfile(data) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await axios.put(`${API}/me`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
