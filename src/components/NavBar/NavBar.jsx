import { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="nav-logo">
        <a href="/">Meet2Explore</a>
      </div>

    

      <div className="nav-buttons">
        <a className="nav-login" href="/auth/signin">Sign in</a>
        <a className="nav-signup" href="/auth/signup">Sign up</a>
      </div>
    </nav>
  );
};

export default NavBar;