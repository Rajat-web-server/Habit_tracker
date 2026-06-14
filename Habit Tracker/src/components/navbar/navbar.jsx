import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

export const Navbar = () => {
  const NavlinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
    };
  };
  return (
    <div>
      <nav className="flex items-center justify-center gap-6 text-textcolor1 fixed w-full top-0 p-6 bg-[#270c43]">
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
        >
          <NavLink style={NavlinkStyles} to="/">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/material/24/FFFFFF/dashboard-layout.png"
              alt="dashboard-layout"
            />
          </NavLink>
        </motion.div>

        <br />
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
        >
          <NavLink style={NavlinkStyles} className="" to="/habits">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/task.png"
              alt="task"
            />
          </NavLink>
        </motion.div>

        <br />
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
        >
          <NavLink style={NavlinkStyles} to="/Analytics">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/external-solidglyph-m-oki-orlando/32/FFFFFF/external-heatmap-digital-marketing-solid-solidglyph-m-oki-orlando.png"
              alt="external-heatmap-digital-marketing-solid-solidglyph-m-oki-orlando"
            />
          </NavLink>
        </motion.div>
        <br />
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log("hover started!")}
        >
          <NavLink style={NavlinkStyles} to="/Chart">
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/liquid-glass/48/graph.png"
              alt="graph"
            />
          </NavLink>
        </motion.div>
      </nav>
    </div>
  );
};
