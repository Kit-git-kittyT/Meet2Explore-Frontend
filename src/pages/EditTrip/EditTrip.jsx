import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyTrips, updateTrip } from "../../services/tripService";
import "./EditTrip.css";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    place: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    async function load() {
      const trips = await getMyTrips();
      const trip = trips.find((t) => t._id === id);

      if (!trip) return;

      setFormData({
        place: trip.place,
        startDate: trip.startDate.slice(0, 10),
        endDate: trip.endDate.slice(0, 10),
        description: trip.description,
      });
    }
    load();
  }, [id]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updated = await updateTrip(id, formData);

    if (!updated) {
      alert("Error updating trip");
      return;
    }

    navigate("/dashboard/my-trips");
  }

  return (
    <div className="edittrip-container">
      <h2>Edit Trip</h2>

      <form className="edittrip-form" onSubmit={handleSubmit}>
        <label>Choose a city</label>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          required
        />

        <label>Start date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label>End date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className="save-btn">Save Changes</button>
      </form>
    </div>
  );
}