import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white bg-transparent">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity duration-300"
        >
          Fraud<span className="text-white">Detect</span>
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-8 text-sm font-medium">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <Link
                to={item.path}
                className={`relative transition-all duration-300 ${
                  isActive ? "text-teal-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                {/* Animated underline */}
                <motion.span
                  className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
