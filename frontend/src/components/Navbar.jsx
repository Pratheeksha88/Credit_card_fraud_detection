import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" }, // ✅ Home now points to root (Overview)
    { name: "Research", path: "/research" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500"
        >
          Fraud<span className="text-white">Detect</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-6 text-gray-300 text-sm font-medium">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className={`transition-all duration-300 hover:text-teal-400 ${
                  location.pathname === item.path ? "text-teal-400" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
