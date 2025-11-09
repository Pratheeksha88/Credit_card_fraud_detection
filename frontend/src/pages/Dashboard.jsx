import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [stats, setStats] = useState({ fraud: 0, legit: 0 });
  const [loading, setLoading] = useState(false);

  const COLORS = ["#14b8a6", "#ef4444"]; // teal for legit, red for fraud

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    try {
      // Parse CSV (optional preview)
      Papa.parse(file, {
        header: true,
        complete: async function (results) {
          setData(results.data);

          // Send file to Flask ML API
          const formData = new FormData();
          formData.append("file", file);

          const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const preds = res.data.predictions || [];
          setPredictions(preds);

          // Calculate stats
          const fraud = preds.filter((p) => p === 1).length;
          const legit = preds.filter((p) => p === 0).length;
          setStats({ fraud, legit });
          setLoading(false);
        },
      });
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Try again.");
      setLoading(false);
    }
  };

  const chartData = [
    { name: "Legitimate", value: stats.legit },
    { name: "Fraudulent", value: stats.fraud },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 px-10">
        <h1 className="text-3xl font-bold text-teal-400 mb-6">
          💳 Fraud Detection Dashboard
        </h1>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Upload Transactions CSV for Prediction
          </h2>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block mx-auto mb-6 text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-slate-700 focus:outline-none p-2"
          />

          {loading && <p className="text-gray-400">Analyzing... Please wait.</p>}
        </div>

        {/* Display Predictions */}
        {predictions.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-teal-400 mb-4">
              Prediction Results
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-slate-800 text-gray-400 uppercase">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-800 hover:bg-slate-800/40"
                    >
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">
                        {data[i]?.Amount || "—"}
                      </td>
                      <td
                        className={`px-4 py-2 font-semibold ${
                          p === 1 ? "text-red-400" : "text-teal-400"
                        }`}
                      >
                        {p === 1 ? "Fraudulent" : "Legitimate"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart Section */}
            <div className="mt-12 bg-slate-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">
                Fraud vs Legitimate Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(1)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
