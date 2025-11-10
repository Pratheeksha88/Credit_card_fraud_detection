import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function DashboardNavbar({ userName = "User" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have successfully logged out.",
      confirmButtonColor: "#14b8a6",
    }).then(() => navigate("/login"));
  };

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

      {/* Right Section: Profile + Logout */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-5"
      >
        <span className="text-gray-300 text-sm">👤 {userName}</span>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 15px rgba(239, 68, 68, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 px-4 py-2 text-sm rounded-lg font-medium transition-all"
        >
          Logout
        </motion.button>
      </motion.div>
    </nav>
  );
}
