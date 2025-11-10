import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function DashboardNavbar({ userName = "User" }) {
  const navigate = useNavigate();

  // 🔴 Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have successfully logged out.",
      confirmButtonColor: "#14b8a6",
      background: "#0f172a",
      color: "#e2e8f0",
    }).then(() => navigate("/login"));
  };

  // 👤 Profile Popup Handler
  const handleProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "User not found",
        text: "No user data available.",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonColor: "#14b8a6",
      });
      return;
    }

    // 🪄 Generate Initials Avatar
    const initials = user.name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");

    Swal.fire({
      html: `
        <div style="
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          color:#e2e8f0;
          font-family:'Inter', sans-serif;
          padding:15px 0;
        ">
          <div style="
            width:80px;
            height:80px;
            border-radius:50%;
            background:linear-gradient(145deg,#14b8a6,#06b6d4);
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:2rem;
            font-weight:700;
            color:white;
            box-shadow:0 0 20px rgba(20,184,166,0.6);
            margin-bottom:15px;
          ">
            ${initials}
          </div>
          <h2 style="font-size:1.3rem;font-weight:700;color:#14b8a6;margin-bottom:5px;">
            ${user.name}
          </h2>
          <p style="font-size:0.95rem;color:#94a3b8;margin-bottom:15px;">Credit Card Fraud Detector User</p>
          <div style="width:100%;text-align:left;color:#cbd5e1;font-size:0.95rem;padding:0 15px;">
            <p><b style="color:#22d3ee;">Email:</b> ${user.email}</p>
            <p><b style="color:#22d3ee;">User ID:</b> ${user.id}</p>
          </div>
        </div>
      `,
      background:
        "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(3,7,18,0.98))",
      color: "#e2e8f0",
      confirmButtonText: "Close",
      confirmButtonColor: "#14b8a6",
      width: "25rem",
      padding: "1.2rem 0.8rem",
      backdrop: `
        rgba(0, 0, 0, 0.6)
        backdrop-filter: blur(6px);
      `,
      customClass: {
        popup: "rounded-2xl border border-white/10 shadow-xl backdrop-blur-md",
      },
    });
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white bg-transparent">
      {/* 🌐 Logo */}
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

      {/* 👤 User & Logout Buttons */}
      <div className="flex items-center gap-5">
        {/* Profile Button */}
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 10px rgba(45,212,191,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProfile}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-slate-800 to-slate-900 border border-white/10 rounded-lg hover:border-teal-400 transition-all"
        >
          <span role="img" aria-label="user">
            👤
          </span>
          {userName}
        </motion.button>

        {/* Logout Button */}
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
      </div>
    </nav>
  );
}
