import "./Dashboard.css";

const Dashboard = () => {
  const cities = [
    {
      name: "Kotor, Montenegro",
      description:
        "Explore old town, mountains, beaches and hidden gems inside the Bay of Kotor.",
      image: "/images/kotor.png",
    },
    {
      name: "Žabljak, Montenegro",
      description:
        "Mountain town on Durmitor, perfect for hiking, lakes and fresh alpine air.",
      image: "/images/zabljak.png",
    },
    {
      name: "Budva, Montenegro",
      description:
        "Beaches, nightlife, old town walls and clear Adriatic waters.",
      image: "/images/budva.png",
    },
    {
      name: "Perast, Montenegro",
      description:
        "Baroque town on the bay, with islands and calm waterfront views.",
      image: "/images/perast.png",
    },
    {
      name: "Ulcinj, Montenegro",
      description:
        "Sandy beaches, warm climate and long coast perfect for summer activities.",
      image: "/images/ulcinj.png",
    },
    {
      name: "Cetinje, Montenegro",
      description:
        "Historic royal capital, museums, monasteries and national heritage.",
      image: "/images/cetinje.png",
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-heading">Explore Montenegro</h1>

      <div className="city-grid">
        {cities.map((city, index) => (
          <div className="city-card" key={index}>
            <img src={city.image} alt={city.name} className="city-image" />

            <div className="city-info">
              <h2>{city.name}</h2>
              <p>{city.description}</p>

              <button className="city-btn">View Activities</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;