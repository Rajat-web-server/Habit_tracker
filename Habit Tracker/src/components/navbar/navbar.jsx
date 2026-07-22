// src/components/layout/Navbar.jsx
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

// Paths are lowercase to match the <Route path="..."> values in App.jsx —
// React Router matching is case-sensitive by default, so "/Analytics" here
// would silently fail to highlight against a route defined as "analytics".
const links = [
  {
    to: "/",
    end: true, // without this, "/" stays highlighted on every route
    alt: "Dashboard",
    src: "https://img.icons8.com/material/24/FFFFFF/dashboard-layout.png",
  },
  {
    to: "/habits",
    alt: "Habits",
    src: "https://img.icons8.com/ios-filled/50/FFFFFF/task.png",
  },
  {
    to: "/analytics",
    alt: "Analytics",
    src: "https://img.icons8.com/external-solidglyph-m-oki-orlando/32/FFFFFF/external-heatmap-digital-marketing-solid-solidglyph-m-oki-orlando.png",
  },
  {
    to: "/chart",
    alt: "Chart",
    src: "https://img.icons8.com/liquid-glass/48/graph.png",
  },
];

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-center gap-6 text-textcolor1 fixed w-full top-0 z-50 p-1 bg-[#270c43]">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          aria-label={link.alt}
          className="relative flex items-center justify-center p-2"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 rounded-full bg-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative z-10 rounded-full"
                style={{ display: "inline-block" }}
              >
                <motion.img
                  width="30"
                  height="30"
                  src={link.src}
                  alt={link.alt}
                  whileHover={{
                    filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
                  }}
                />
              </motion.div>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
