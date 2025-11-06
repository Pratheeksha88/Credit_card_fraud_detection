import React, { useState } from "react";
import axios from "axios";

export default function Login() {   // 👈 ensure "export default" is here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });
      alert("Login successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Invalid credentials!");
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
