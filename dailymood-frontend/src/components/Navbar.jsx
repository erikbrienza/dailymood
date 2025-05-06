import { Link, useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        DailyMood
      </div>
      <div className="navbar-links">
        {!user_id && (
          <>
            <Link to="/register">Registrati</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {user_id && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
}

export default Navbar;