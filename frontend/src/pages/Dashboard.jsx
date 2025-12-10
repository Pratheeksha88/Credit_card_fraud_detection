import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import Navbar from "../components/DashboardNavbar";
import Swal from "sweetalert2";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [stats, setStats] = useState({ fraud: 0, legit: 0 });
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("User");

  const COLORS = ["#14b8a6", "#ef4444"]; // teal = legit, red = fraud

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name) setUserName(storedUser.name);
    } catch {
      setUserName("User");
    }
  }, []);

  // 🔓 Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have successfully logged out.",
      confirmButtonColor: "#14b8a6",
    }).then(() => (window.location.href = "/login"));
  };

  // 📂 CSV Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    try {
      Papa.parse(file, {
        header: true,
        complete: async function (results) {
          const parsedData = results?.data || [];
          setData(parsedData);

          // Send to Flask backend
          const formData = new FormData();
          formData.append("file", file);

          const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const preds = res.data?.predictions || [];
          setPredictions(preds);

          const fraud = preds.filter((p) => p === 1).length;
          const legit = preds.filter((p) => p === 0).length;
          setStats({ fraud, legit });
          setLoading(false);

          Swal.fire({
            icon: fraud > 0 ? "warning" : "success",
            title: fraud > 0 ? "⚠️ Fraudulent Transactions Found!" : "✅ Analysis Complete!",
            text: `Detected ${fraud} fraudulent and ${legit} legitimate transactions.`,
            confirmButtonColor: "#14b8a6",
          });
        },
      });
    } catch (err) {
      console.error("❌ Error:", err);
      Swal.fire({
        icon: "error",
        title: "Prediction Failed",
        text: "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  };

  // 📊 Chart Data
  const chartData = [
    { name: "Legitimate", value: stats.legit },
    { name: "Fraudulent", value: stats.fraud },
  ];

  const barData = [
    { name: "Fraudulent", value: stats.fraud },
    { name: "Legitimate", value: stats.legit },
  ];

  // 🧾 Table Data
  const detailedData = data.map((row, i) => ({
    id: i + 1,
    amount: row?.Amount || "-",
    time: row?.Time || "-",
    prediction:
      predictions[i] === 1
        ? "Fraudulent"
        : predictions[i] === 0
        ? "Legitimate"
        : "-",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030711] via-[#0A1A2F] to-[#04131C] text-white">
      {/* ✅ Navbar */}
      <Navbar
        extraButtons={
          <div className="flex gap-4 items-center">
            <span className="text-gray-300 text-sm">👤 {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 px-4 py-2 text-sm rounded-lg font-medium transition-all"
            >
              Logout
            </button>
          </div>
        }
      />

      <div className="pt-24 px-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-8"
        >
          Welcome, {userName}! 
        </motion.h1>

        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-lg text-center"
        >
          <h2 className="text-xl font-semibold mb-4 text-teal-400">
            Upload Transactions CSV for Prediction
          </h2>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block mx-auto mb-4 text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-slate-800 focus:outline-none p-2"
          />

          <a
            href="/fraud_test.csv"
            download
            className="inline-block px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm transition-all"
          >
            ⬇️ Download Sample CSV
          </a>

          {loading && (
            <p className="mt-4 text-gray-400 animate-pulse">
              🔍 Analyzing... Please wait.
            </p>
          )}
        </motion.div>

        {/* Stats Cards */}
        {predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { label: "Total Transactions", value: predictions.length, color: "text-cyan-400" },
              { label: "Legitimate", value: stats.legit, color: "text-teal-400" },
              { label: "Fraudulent", value: stats.fraud, color: "text-red-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl shadow-lg text-center"
              >
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <h3 className={`text-3xl font-bold mt-2 ${stat.color}`}>
                  {stat.value}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Charts */}
        {predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* Pie Chart */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-teal-400">
                Fraud vs Legitimate
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-teal-400">
                Transaction Comparison
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "Fraudulent" ? "#ef4444" : "#14b8a6"}
                  />
                  ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Table */}
        {predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg overflow-x-auto"
          >
            <h2 className="text-xl font-semibold mb-4 text-teal-400">
              Detailed Transaction Analysis
            </h2>
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="bg-white/10 text-gray-400 uppercase">
                <tr>
                  <th className="px-4 py-2">Sl.No.</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Prediction</th>
                </tr>
              </thead>
              <tbody>
                {detailedData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/10 hover:bg-white/10 transition"
                  >
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">{row.time}</td>
                    <td className="px-4 py-2">{row.amount}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        row.prediction === "Fraudulent"
                          ? "text-red-400"
                          : row.prediction === "Legitimate"
                          ? "text-teal-400"
                          : "text-gray-400"
                      }`}
                    >
                      {row.prediction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
