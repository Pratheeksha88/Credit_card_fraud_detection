import React from "react";
import Navbar from "../components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ResearchOverview() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -150]);

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: "easeOut" },
    },
  });

  return (
    <div className="bg-[#030711] text-white overflow-x-hidden font-inter selection:bg-teal-500/30 selection:text-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-[url('/assets/research-bg.jpg')] bg-cover bg-center brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-[#030711]" />

        {/* Hero Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
          className="relative z-10 px-4"
        >
          <motion.h1
            variants={fadeIn(0.2)}
            className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight animate-gradient-x"
          >
            Detection of Credit Card Fraud
          </motion.h1>
          <motion.p
            variants={fadeIn(0.4)}
            className="mt-4 max-w-2xl mx-auto text-gray-300 text-lg sm:text-xl leading-relaxed"
          >
            A comparative study of advanced Machine Learning and Deep Learning
            architectures for real-time fraud detection.
          </motion.p>

          <motion.a
            href="/"
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 25px rgba(45, 212, 191, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-block bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-400 hover:to-teal-400 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300"
          >
            View System Overview →
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 text-gray-400 text-sm animate-bounce"
        >
          Scroll to Explore ↓
        </motion.div>
      </section>

      {/* ===== ABSTRACT ===== */}
      <motion.section
        className="relative py-20 px-6 sm:px-16 bg-gradient-to-b from-[#030711] to-[#0a1625]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeIn(0.2)}
            className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500"
          >
            Overview
          </motion.h2>
          <motion.p
            variants={fadeIn(0.3)}
            className="text-gray-300 text-lg leading-relaxed"
          >
            With the rapid adoption of online payments, credit card fraud has
            become one of the major concerns for financial institutions. This
            research investigates multiple learning models to identify and
            mitigate fraudulent transactions with high accuracy and minimal
            false positives.
          </motion.p>
          <motion.p
            variants={fadeIn(0.4)}
            className="text-gray-400 text-lg mt-5 leading-relaxed"
          >
            Traditional approaches such as Logistic Regression, Decision Trees,
            and Random Forest are compared against Deep Learning architectures
            like CNNs. The study achieved 99.9% accuracy, 93% precision, and 98%
            AUC using real-world data — demonstrating the potential of AI-driven
            fraud detection systems.
          </motion.p>
        </div>
      </motion.section>

      {/* ===== RESULTS ===== */}
      <motion.section
        className="py-20 bg-[#0a1625] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.h2
          variants={fadeIn(0.2)}
          className="text-4xl sm:text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500"
        >
          Research Results
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { label: "Accuracy", value: "99.9%", color: "text-teal-400" },
            { label: "Precision", value: "93%", color: "text-cyan-400" },
            { label: "F1-Score", value: "85.7%", color: "text-green-400" },
            { label: "AUC", value: "98%", color: "text-yellow-400" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[#101b2d] p-6 rounded-2xl shadow-lg hover:shadow-teal-500/20 transition-all"
            >
              <p className={`text-5xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-gray-400 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== METHODOLOGY ===== */}
      <motion.section
        className="relative py-20 px-6 sm:px-16 bg-gradient-to-b from-[#0a1625] to-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeIn(0.2)}
            className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Methodology
          </motion.h2>
          <motion.p
            variants={fadeIn(0.3)}
            className="text-gray-300 text-lg leading-relaxed"
          >
            The workflow integrates both supervised Machine Learning and Deep
            Learning pipelines. Data preprocessing involves feature scaling,
            noise reduction, and outlier detection. Algorithms including
            Random Forest, XGBoost, and CNN are tuned with grid search for
            optimal performance. Evaluation metrics such as accuracy, precision,
            recall, and AUC are analyzed using stratified k-fold cross-validation.
          </motion.p>
        </div>
      </motion.section>

      {/* ===== REFERENCES ===== */}
      <motion.section
        className="py-20 px-6 sm:px-16 bg-[#030711]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeIn(0.2)}
            className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500"
          >
            References
          </motion.h2>
          <motion.p
            variants={fadeIn(0.3)}
            className="text-gray-400 text-lg leading-relaxed"
          >
            This work references benchmark studies from IEEE Access and Springer
            exploring ensemble learning and CNN-based anomaly detection in
            financial data. Comparative insights were drawn from recent
            publications on hybrid models integrating machine learning with
            deep neural networks for fraud analytics.
          </motion.p>
        </div>
      </motion.section>

      {/* ===== CTA ===== */}
      <motion.section
        className="py-24 text-center bg-gradient-to-b from-black to-[#030711]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn()}
      >
        <motion.h2
          variants={fadeIn(0.2)}
          className="text-5xl sm:text-6xl font-extrabold mb-4 text-white drop-shadow-xl"
        >
          Explore the Live Model
        </motion.h2>
        <motion.p
          variants={fadeIn(0.4)}
          className="text-gray-400 text-lg mb-8 max-w-xl mx-auto"
        >
          Experience the real-time fraud detection system built using ML and
          Deep Learning — tested, verified, and interactive.
        </motion.p>
        <motion.a
          href="/login"
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 0px 25px rgba(45, 212, 191, 0.6)",
          }}
          whileTap={{ scale: 0.96 }}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-400 hover:to-teal-400 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300"
        >
          Launch System →
        </motion.a>
      </motion.section>

      {/* ===== FOOTER ===== */}
      <footer className="py-6 text-center text-gray-500 bg-[#02050d] border-t border-slate-800">
        © {new Date().getFullYear()} Credit Card Fraud Detection Research |
        Built with ❤️ using React + Framer Motion
      </footer>
    </div>
  );
}
