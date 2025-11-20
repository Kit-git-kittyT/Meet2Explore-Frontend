import axios from "axios";

const API_URL = "http://localhost:3000/api/trips";

// ============================
// GET all trips
// ============================
export async function getTrips() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // array of trips
  } catch (err) {
    console.error("Error fetching trips:", err);
    return [];
  }
}

// ============================
// CREATE a trip
// ============================
export async function createTrip(data) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error creating trip:", err);
    return null;
  }
}

// ============================
// UPDATE a trip
// ============================
export async function updateTrip(id, data) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error updating trip:", err);
    return null;
  }
}

// ============================
// DELETE a trip
// ============================
export async function deleteTrip(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error deleting trip:", err);
    return null;
  }
}