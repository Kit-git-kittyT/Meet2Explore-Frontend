import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // simulated login state
  useEffect(() => {
    setIsLoggedIn(location.pathname.startsWith("/dashboard"));
  }, [location.pathname]);

  function handleSignOut() {
    navigate("/");
  }

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="nav-logo">
        <Link to="/">Meet2Explore</Link>
      </div>

      {/* NOT LOGGED IN */}
      {!isLoggedIn && (
        <div className="nav-buttons">
          <Link className="nav-login" to="/auth/signin">Sign in</Link>
          <Link className="nav-signup" to="/auth/signup">Sign up</Link>
        </div>
      )}
{isLoggedIn && (
  <div className="nav-loggedin">

    <Link to="/dashboard/create-trip" className="nav-item">
      Create Trip
    </Link>

    <Link to="/dashboard/my-trips" className="nav-item">
      My Trips
    </Link>

    <Link to="/dashboard/profile" className="nav-item">
      My Profile
    </Link>

    <Link to="/" className="nav-item nav-signout">
      Sign Out
    </Link>

  </div>
)}
    </nav>
  );
};

export default NavBar;