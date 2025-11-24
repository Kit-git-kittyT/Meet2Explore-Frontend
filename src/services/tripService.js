import axios from "axios";

const API_URL = "https://meet2explore-17e5b6e60cab.herokuapp.com/trips";


// CREATE TRIP

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
    console.error("Error creating trip:", err.response?.data || err);
    return null;
  }
}


// GET MY TRIPS

export async function getMyTrips() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching trips:", err.response?.data || err);
    return [];
  }
}


// DELETE TRIP

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
    console.error("Error deleting trip:", err.response?.data || err);
    return null;
  }
}
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
    console.error("Error updating trip:", err.response?.data || err);
    return null;
  }
}


export async function joinTrip(id) {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/${id}/join`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function leaveTrip(id) {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/${id}/leave`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
}