import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overview() {
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -200]);

  return (
    <div className="bg-slate-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          style={{ y: y1 }}
          className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-6"
        >
          Credit Card Fraud Detection
        </motion.h1>
        <motion.p
          style={{ y: y2 }}
          className="max-w-2xl text-gray-400 text-lg sm:text-xl"
        >
          An intelligent full-stack system that identifies fraudulent transactions
          in real-time using machine learning and data analytics.
        </motion.p>
        <a
          href="/login"
          className="mt-10 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg transition-all duration-300"
        >
          Get Started →
        </a>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 text-gray-400 text-sm"
        >
          Scroll Down ↓
        </motion.div>
      </section>

      {/* Section 2: About */}
      <section className="h-screen flex flex-col justify-center px-12">
        <h2 className="text-4xl font-bold mb-4 text-teal-400">About the Project</h2>
        <p className="max-w-3xl text-gray-300 text-lg leading-relaxed">
          This web application uses cutting-edge machine learning algorithms to
          detect fraudulent credit card transactions. It includes a modern
          React-based dashboard, secure authentication, MongoDB database,
          and a Python Flask API that serves a trained Random Forest model.
        </p>
      </section>

      {/* Section 3: Features */}
      <section className="h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-center px-12">
        <h2 className="text-4xl font-bold mb-6 text-teal-400">Key Features</h2>
        <ul className="space-y-4 text-gray-300 text-lg">
          <li>✅ Secure Login and Registration with JWT</li>
          <li>📊 Real-time Interactive Dashboard</li>
          <li>🤖 Machine Learning Model Integration</li>
          <li>☁️ Cloud Database via MongoDB Atlas</li>
          <li>💅 Stunning UI with Tailwind CSS + Framer Motion</li>
        </ul>
      </section>

      {/* Section 4: Tech Stack */}
      <section className="h-screen flex flex-col justify-center items-center bg-slate-900 px-12 text-center">
        <h2 className="text-4xl font-bold mb-4 text-teal-400">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-300 text-lg">
          <div>⚛️ React</div>
          <div>🖥️ Node.js</div>
          <div>🐍 Flask</div>
          <div>🍃 MongoDB</div>
          <div>🎨 Tailwind CSS</div>
          <div>📈 Recharts</div>
          <div>🧠 Scikit-learn</div>
          <div>🚀 Vite</div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-950 to-black">
        <h2 className="text-5xl font-bold mb-6 text-white">
          Ready to Try It?
        </h2>
        <a
          href="/login"
          className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg text-xl transition-all duration-300"
        >
          Go to Dashboard →
        </a>
      </section>
    </div>
  );
}
