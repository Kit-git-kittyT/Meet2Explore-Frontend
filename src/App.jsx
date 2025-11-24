import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateTrip from "./pages/CreateTrip/CreateTrip";
import MyTrips from "./pages/MyTrips/MyTrips";
import Profile from "./pages/Profile/Profile";
import ViewActivities from "./pages/ViewActivities/ViewActivities";
import Chat from "./components/Chat/Chat.jsx";
import EditTrip from "./pages/EditTrip/EditTrip";

import "./index.css";

const App = () => {
  // ⛔ CLEAR login data when tab closes
  useEffect(() => {
    const handleClose = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
    };

    window.addEventListener("beforeunload", handleClose);

    return () => {
      window.removeEventListener("beforeunload", handleClose);
    };
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/create-trip" element={<CreateTrip />} />
        <Route path="/dashboard/my-trips" element={<MyTrips />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/edit-trip/:id" element={<EditTrip />} />

        <Route path="/cities/:cityId/activities" element={<ViewActivities />} />

        <Route path="/chat/:activityId" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;