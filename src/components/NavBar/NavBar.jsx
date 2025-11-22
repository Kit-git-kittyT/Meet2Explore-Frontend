import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // scroll effect blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // detect if user is “logged in” (frontend fake logic)
 useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
}, [location.pathname]);

  function handleSignOut() {
  localStorage.removeItem("token");  // delete stored login
  setIsLoggedIn(false);              // update UI immediately
  navigate("/");
}

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      
      {/* ====== LOGO ====== */}
      <div className="nav-logo">
        <Link to="/">
          <img src="/images/Logo.png" className="nav-logo-img" alt="Logo" />
          <span className="nav-logo-text">Meet2Explore</span>
        </Link>
      </div>

      {/* ====== GUEST (NOT LOGGED IN) ====== */}
      {!isLoggedIn && (
        <div className="nav-buttons">
          <Link className="nav-login" to="/auth/signin">Sign in</Link>
          <Link className="nav-signup" to="/auth/signup">Sign up</Link>
        </div>
      )}

      {/* ====== LOGGED IN NAV ====== */}
      {isLoggedIn && (
        <div className="nav-loggedin">
          <Link to="/dashboard" className="nav-item">
            Dashboard
          </Link>

          <Link to="/dashboard/create-trip" className="nav-item">
            Create Trip
          </Link>

          <Link to="/dashboard/my-trips" className="nav-item">
            My Trips
          </Link>

          <Link to="/dashboard/profile" className="nav-item">
            My Profile
          </Link>

          <button onClick={handleSignOut} className="nav-item nav-signout">
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;