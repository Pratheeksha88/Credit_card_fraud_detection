import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);

      // ✅ SweetAlert2 success modal
      Swal.fire({
        title: "Login Successful 🎉",
        text: "Redirecting you to the dashboard...",
        icon: "success",
        confirmButtonColor: "#14b8a6",
        background: "#0A1A2F",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);

      // ❌ SweetAlert2 error modal
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonColor: "#14b8a6",
        background: "#0A1A2F",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#030711] via-[#0A1A2F] to-[#04131C] text-white">
      <Navbar />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[300px] h-[300px] bg-teal-500/30 blur-3xl rounded-full top-24 left-16"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[380px] h-[380px] bg-cyan-500/30 blur-3xl rounded-full bottom-16 right-16"
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl w-[90%] max-w-sm"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent"
        >
          Welcome Back
        </motion.h1>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Login to access your fraud detection dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-gray-300 text-xs mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              required
            />
          </div>

          {/* Password Field with Eye Toggle */}
          <div className="relative">
            <label className="block text-gray-300 text-xs mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2.5 pr-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
            {/* Eye Icon */}
            <div
              onClick={togglePassword}
              className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(45, 212, 191, 0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold py-2.5 rounded-lg text-sm transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="mt-5 text-center text-gray-400 text-xs">
          Don’t have an account?{" "}
          <a href="/register" className="text-teal-400 hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
