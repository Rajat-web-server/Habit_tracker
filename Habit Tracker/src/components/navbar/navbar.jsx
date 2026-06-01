import { Link } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/">Dashboard</Link>
        <br />
        <Link to="/habits">Habits</Link>
        <br />
        <Link to="/Analytics">Analytics</Link>
        <br />
      </nav>
      
    </div>
  );
};
