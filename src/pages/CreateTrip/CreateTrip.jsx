import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTrip.css";

const CITIES = [
  "Kotor",
  "Žabljak",
  "Budva",
  "Perast",
  "Ulcinj",
  "Cetinje",
];

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

  function handleSubmit(e) {
    e.preventDefault();
 
    navigate("/dashboard");
  }

  return (
    <div className="trip-container">
      <h2>Create a Trip</h2>

      <form className="trip-form" onSubmit={handleSubmit}>

        <label>Choose a city</label>
        <select 
          name="place" 
          value={formData.place} 
          onChange={handleChange}
          required
        >
          <option value="">Select city</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

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
          placeholder="What is your plan?"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button className="trip-btn" type="submit">
          Create Trip
        </button>

      </form>
    </div>
  );
};

export default CreateTrip;