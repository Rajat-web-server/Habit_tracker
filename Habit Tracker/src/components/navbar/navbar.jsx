import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const links = [
  {
    to: "/",
    end: true,
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
];

export const Navbar = () => {
  return (
    <nav
      className="
        fixed bottom-6 left-1/2 z-50
        flex -translate-x-1/2 items-center gap-2
        rounded-2xl
        border border-white/10
        bg-white/5
        px-3 py-2
        shadow-2xl
        backdrop-blur-xl
        backdrop-saturate-150
      "
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          aria-label={link.alt}
          className="relative"
        >
          {({ isActive }) => (
            <div className="relative flex h-12 w-12 items-center justify-center">
              {/* Active glass pill */}
              {isActive && (
                <motion.div
                  layoutId="navPill"
                  className="
                    absolute inset-0
                    rounded-xl
                    border border-green-400/20
                    bg-green-500/15
                    shadow-[0_0_20px_rgba(34,197,94,0.15)]
                  "
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="relative z-10"
              >
                <motion.img
                  width="24"
                  height="24"
                  src={link.src}
                  alt={link.alt}
                  className="opacity-70 transition-opacity"
                  animate={{
                    opacity: isActive ? 1 : 0.65,
                  }}
                  whileHover={{
                    filter:
                      "drop-shadow(0 0 6px rgba(34,197,94,0.8))",
                  }}
                />
              </motion.div>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};