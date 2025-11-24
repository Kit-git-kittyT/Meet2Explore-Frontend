import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const cities = [
    {
      _id: "kotor",
      name: "Kotor, Montenegro",
      description:
        "Explore old town, mountains, beaches and hidden gems inside the Bay of Kotor.",
      image: "/images/kotor.png",
    },
    {
      _id: "zabljak", // backend ID stays plain
      name: "Žabljak, Montenegro", // UI keeps Ž properly
      description:
        "Mountain town on Durmitor, perfect for hiking, lakes and fresh alpine air.",
      image: "/images/žabljak.png",
    },
    {
      _id: "budva",
      name: "Budva, Montenegro",
      description:
        "Beaches, nightlife, old town walls and clear Adriatic waters.",
      image: "/images/budva.png",
    },
    {
      _id: "perast",
      name: "Perast, Montenegro",
      description:
        "Baroque town on the bay, with islands and calm waterfront views.",
      image: "/images/perast.png",
    },
    {
      _id: "ulcinj",
      name: "Ulcinj, Montenegro",
      description:
        "Sandy beaches, warm climate and long coast perfect for summer activities.",
      image: "/images/ulcinj.png",
    },
    {
      _id: "cetinje",
      name: "Cetinje, Montenegro",
      description:
        "Historic royal capital, museums, monasteries and national heritage.",
      image: "/images/cetinje.png",
    },

   {
      _id: "podgorica",
      name: "Podgorica, Montenegro",
      description:
        "Capital city with rivers, modern cafes, parks, history and nightlife.",
      image: "/images/podgorica.png",
    },
    {
      _id: "kolasin",
      name: "Kolašin, Montenegro",
      description:
        "Mountain town famous for skiing, forests, rivers, and national parks.",
      image: "/images/kolašin.png",
    },
  ];
    
  

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-heading">Explore Montenegro</h1>

      <div className="city-grid">
        {cities.map((city) => (
          <div className="city-card" key={city._id}>
            <img src={city.image} alt={city.name} className="city-image" />

            <div className="city-info">
              <h2>{city.name}</h2>
              <p>{city.description}</p>

              <button
                className="city-btn"
                onClick={() => navigate(`/cities/${city._id}/activities`)}
              >
                View Activities
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;