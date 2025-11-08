import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Overview from "./pages/Overview";
import ResearchOverview from "./pages/ResearchOverview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Home = Overview */}
        <Route path="/" element={<Overview />} />

        {/* Research page */}
        <Route path="/research" element={<ResearchOverview />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
