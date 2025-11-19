import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard"

import "./App.css";

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

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App