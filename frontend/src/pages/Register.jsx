import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", formData);
      alert("Registration successful!");
      console.log(res.data);
      window.location.href = "/login"; // redirect to login page
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-teal-400">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl shadow-lg w-80"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white focus:outline-none"
          required
        />
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
          Register
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-teal-400 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
