import React from "react";
import Navbar from "../components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overview() {
  const { scrollY } = useScroll();

  // Parallax motion values
  const heroY = useTransform(scrollY, [0, 400], [0, -150]);
  const bgY = useTransform(scrollY, [0, 400], [0, 100]);

  // Animation variants
  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeOut" },
    },
  });

  const headingAnim = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.9, ease: "easeOut" },
    },
  });

  return (
    <div className="bg-[#050B14] text-white overflow-x-hidden font-inter selection:bg-teal-500/30 selection:text-white">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-[url('/assets/credit-bg.jpg')] bg-cover bg-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#050B14]" />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY }}
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
          className="relative z-10 px-6"
        >
          <motion.h1
            variants={headingAnim(0.3)}
            className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight drop-shadow-lg animate-gradient-x"
          >
            Credit Card Fraud Detection
          </motion.h1>

          <motion.p
            variants={fadeIn(0.6)}
            className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg sm:text-xl leading-relaxed"
          >
            A modern AI-powered web system that detects fraudulent transactions in real-time using intelligent analytics.
          </motion.p>

          {/* Button with glow + spring animation */}
          <motion.a
            href="/login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 1,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 25px rgba(45, 212, 191, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-block bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-400 hover:to-teal-400 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300"
          >
            Get Started →
          </motion.a>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 text-gray-400 text-sm tracking-wide animate-bounce"
        >
          Scroll to Explore ↓
        </motion.div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <motion.section
        className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-12 px-8 sm:px-24 py-16 bg-[#0B1624]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.img
          src="/assets/ai-analysis.jpg"
          alt="AI Detection"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
          whileHover={{ scale: 1.02 }}
        />
        <div className="md:w-1/2">
          <motion.h2
            variants={headingAnim(0.1)}
            className="text-4xl sm:text-5xl font-bold mb-6 text-teal-400"
          >
            About the Project
          </motion.h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            This web app combines <span className="text-teal-400">machine learning</span>, <span className="text-cyan-400">Flask APIs</span>, and a <span className="text-teal-400">React dashboard</span> to detect credit card frauds. It integrates a trained <span className="text-cyan-400">Random Forest model</span> that predicts suspicious activities in milliseconds, offering real-time protection and data visualization.
          </p>
        </div>
      </motion.section>

      {/* ===== FEATURES SECTION ===== */}
      <motion.section
        className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-center px-8 sm:px-24 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.h2
          variants={headingAnim(0.2)}
          className="text-5xl font-bold mb-10 text-center text-teal-400"
        >
          Key Features
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: "🔐 Secure Authentication",
              desc: "JWT-based login ensures your data and transactions remain private and protected.",
            },
            {
              title: "🤖 ML-Powered Detection",
              desc: "A trained Random Forest model identifies anomalies with 99% accuracy in real time.",
            },
            {
              title: "📊 Real-Time Dashboard",
              desc: "Monitor fraud detection statistics with elegant, interactive charts and reports.",
            },
            {
              title: "☁️ Cloud Database",
              desc: "All data is safely stored in MongoDB Atlas with encrypted access and scalability.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0E1A28] p-8 rounded-2xl shadow-lg hover:shadow-teal-500/20"
            >
              <h3 className="text-2xl font-semibold mb-3 text-cyan-400">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== TECH STACK SECTION ===== */}
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center bg-[#0E1A28] px-6 py-24 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.h2
          variants={headingAnim(0.3)}
          className="text-5xl font-bold mb-10 text-teal-400"
        >
          Technology Stack
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-gray-300 text-lg">
          {[
            "⚛️ React",
            "🖥️ Node.js",
            "🐍 Flask",
            "🍃 MongoDB",
            "🎨 Tailwind CSS",
            "📈 Recharts",
            "🧠 Scikit-learn",
            "🚀 Vite",
          ].map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, color: "#2dd4bf" }}
              className="transition-all font-medium"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== CTA SECTION ===== */}
      <motion.section
        className="h-[70vh] flex flex-col justify-center items-center bg-gradient-to-b from-slate-950 to-black text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.h2
          variants={headingAnim(0.2)}
          className="text-5xl sm:text-6xl font-extrabold mb-6 text-white drop-shadow-xl"
        >
          Experience Smart Fraud Detection
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          Stay secure with real-time detection, modern analytics, and cutting-edge machine learning intelligence.
        </p>
        <motion.a
          href="/login"
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-400 hover:to-teal-400 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/30"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 30px rgba(45, 212, 191, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Dashboard →
        </motion.a>
      </motion.section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 text-center text-gray-500 bg-[#060E17] border-t border-slate-800">
        © {new Date().getFullYear()} Credit Card Fraud Detection | Built with ❤️ using React & Flask
      </footer>
    </div>
  );
}
