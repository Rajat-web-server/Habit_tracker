import { NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const NavlinkStyles = ({isActive}) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
    };
  };
  return (
    <div className="navbar">
      <nav>
        <NavLink style={NavlinkStyles} to="/">
          Dashboard
        </NavLink>
        <br />
        <NavLink style={NavlinkStyles} to="/habits">
          Habits
        </NavLink>
        <br />
        <NavLink style={NavlinkStyles} to="/Analytics">
          Analytics
        </NavLink>
        <NavLink style={NavlinkStyles} to="/Chart">
          Charts
        </NavLink>
        <br />
      </nav>
    </div>
  );
};
