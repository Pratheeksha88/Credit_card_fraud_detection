import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", formData);

      // ✅ Save JWT token
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-teal-400">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl shadow-lg w-80"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-400">
        Don’t have an account?{" "}
        <a href="/register" className="text-teal-400 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
