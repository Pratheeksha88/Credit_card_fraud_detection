import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    fraud: 0,
    legitimate: 0,
  });

  useEffect(() => {
    // Example API call to fetch stats (replace with your endpoint later)
    axios
      .get("http://localhost:4000/api/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-teal-400 mb-6">
        💳 Fraud Detection Dashboard
      </h1>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl text-gray-300">Total Transactions</h2>
          <p className="text-4xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl text-gray-300">Fraudulent</h2>
          <p className="text-4xl font-bold text-red-400 mt-2">{stats.fraud}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl text-gray-300">Legitimate</h2>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {stats.legitimate}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        <ChartCard title="Fraud vs Legitimate (This Week)" />
        <ChartCard title="Transaction Volume Over Time" />
      </div>

      {/* Prediction Upload Section */}
      <div className="mt-10 bg-slate-800 p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-teal-400 mb-4">
          Upload Transactions for Prediction
        </h2>
        <input
          type="file"
          accept=".csv"
          className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-slate-700 focus:outline-none p-2 mb-4"
        />
        <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded">
          Predict Fraud
        </button>
      </div>
    </div>
  );
}
