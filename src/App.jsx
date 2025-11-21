import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateTrip from "./pages/CreateTrip/CreateTrip";
import MyTrips from "./pages/MyTrips/MyTrips";
import Profile from "./pages/Profile/Profile";

import EditTrip from "./pages/EditTrip/EditTrip";
import "./index.css";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* AUTH */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* CREATE TRIP*/}
        <Route path="/dashboard/create-trip" element={<CreateTrip />} />

        {/* My trips */}
        <Route path="/dashboard/my-trips" element={<MyTrips />} />

         {/* Profile */}
        <Route path="/dashboard/profile" element={<Profile />} />
         import EditTrip from "./pages/EditTrip/EditTrip";

        {/* Edit */}
        <Route path="/dashboard/edit-trip/:id" element={<EditTrip />} />
      </Routes>
    </>
  );
};

export default App;