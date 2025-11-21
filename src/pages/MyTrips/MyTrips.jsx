import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTrips, deleteTrip } from "../../services/tripService";
import "./MyTrips.css";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getMyTrips();
      setTrips(data);
    }
    load();
  }, []);

  function getImage(place) {
    const city = place.toLowerCase();
    return `/images/${city}.png`;
  }

  async function handleDelete(id) {
    if (!confirm("Delete this trip?")) return;
    await deleteTrip(id);
    setTrips((prev) => prev.filter((t) => t._id !== id));
  }

  return (
    <div className="mytrips-container">
      <h2>My Trips</h2>

      {trips.length === 0 && <p>You have no trips yet.</p>}

      {trips.map((trip) => (
        <div className="trip-card" key={trip._id}>
          <img src={getImage(trip.place)} alt={trip.place} className="trip-image" />

          <div className="trip-info">
            <h3>{trip.place}</h3>
            <p>{trip.description}</p>
            <p>
              {trip.startDate.slice(0, 10)} → {trip.endDate.slice(0, 10)}
            </p>
          </div>

          <div className="trip-actions">
            <button
              className="edit-btn"
              onClick={() => navigate(`/dashboard/edit-trip/${trip._id}`)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(trip._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}