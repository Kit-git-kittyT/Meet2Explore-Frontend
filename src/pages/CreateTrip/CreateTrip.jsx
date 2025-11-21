import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTrip.css";
import { createTrip } from "../../services/tripService";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const CITIES = ["Kotor", "Žabljak", "Budva", "Perast", "Ulcinj", "Cetinje"];

const CreateTrip = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    place: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newTrip = await createTrip(formData);

    if (!newTrip) {
      Swal.fire({
        title: "Error",
        text: "Could not create trip.",
        icon: "error",
      });
      return;
    }

    await Swal.fire({
      title: "Trip Created! 🎉",
      text: "Your adventure is now added to My Trips.",
      icon: "success",
      confirmButtonColor: "#4a90e2",
    });

    navigate("/dashboard/my-trips");
  }

  return (
    <div className="trip-container">
      <h2>Create a Trip</h2>

      <form className="trip-form" onSubmit={handleSubmit}>
        
        <label>Choose a city</label>
        <select name="place" value={formData.place} onChange={handleChange} required>
          <option value="">Select city</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label>Start date</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>End date</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <label>Description</label>
        <textarea 
          name="description"
          placeholder="Describe your adventure..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className="trip-btn">Create Trip</button>
      </form>
    </div>
  );
};

export default CreateTrip;