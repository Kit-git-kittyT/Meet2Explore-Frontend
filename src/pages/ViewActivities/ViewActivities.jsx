import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ViewActivities.css";

export default function ViewActivities() {
  const { cityId } = useParams();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load current user
        const userRes = await fetch("https://meet2explore-17e5b6e60cab.herokuapp.com/api/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const userData = await userRes.json();
        setUser(userData);

        // Load trips in this city
        const tripsRes = await fetch(
          `http://localhost:3000/api/trips/city/${cityId}`
        );
        const tripsData = await tripsRes.json();
        setTrips(tripsData);
      } catch (err) {
        console.error("Error loading:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [cityId]);

  async function handleJoin(tripId) {
    await fetch(`http://localhost:3000/api/trips/${tripId}/join`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    // Reload data
    const newTrips = await (
      await fetch(`http://localhost:3000/api/trips/city/${cityId}`)
    ).json();
    setTrips(newTrips);
  }

  async function handleLeave(tripId) {
    await fetch(`http://localhost:3000/api/trips/${tripId}/leave`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const newTrips = await (
      await fetch(`http://localhost:3000/api/trips/city/${cityId}`)
    ).json();
    setTrips(newTrips);
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div className="activities-page">
      <h1>Trips in this city</h1>

      {trips.length === 0 && <p>No trips yet for this city.</p>}

      <div className="card-list">
        {trips.map((trip) => {
          const joined = trip.participants?.some(
            (p) => p._id === user?._id
          );

          return (
            <div key={trip._id} className="activity-card">
              <h3>{trip.place}</h3>
              <p>{trip.description}</p>

              <p className="participants">
                Participants: {trip.participants?.length || 0}
              </p>

              <small>
                Created by: {trip.creator?.username || "Anonymous"} <br />
                {new Date(trip.startDate).toLocaleDateString()} –{" "}
                {new Date(trip.endDate).toLocaleDateString()}
              </small>

              <div className="join-btn-wrapper">
                {joined ? (
                  <>
                    <button
                      className="leave-btn"
                      onClick={() => handleLeave(trip._id)}
                    >
                      Leave
                    </button>

                    <button
                      className="chat-btn"
                      onClick={() => navigate(`/chat/${trip._id}`)}
                    >
                      Open Chat
                    </button>
                  </>
                ) : (
                  <button
                    className="join-btn"
                    onClick={() => handleJoin(trip._id)}
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}