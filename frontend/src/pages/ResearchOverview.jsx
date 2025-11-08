import React from "react";
import Navbar from "../components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ResearchOverview() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -200]);

  return (
    <div className="bg-slate-950 text-white overflow-x-hidden">
        <Navbar />
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.div style={{ y: y1 }}>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
            Detection of Credit Card Fraud
          </h1>
          <h2 className="text-lg sm:text-2xl text-gray-300 mb-10">
            Using State-of-the-Art Machine Learning & Deep Learning Algorithms
          </h2>
          <a
            href="/overview"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg transition-all duration-300"
          >
            View System Overview →
          </a>
        </motion.div>
        <div className="absolute bottom-10 text-gray-500 text-sm animate-pulse">
          Scroll to explore ↓
        </div>
      </section>

      {/* ABSTRACT SECTION */}
      <section className="min-h-screen flex flex-col justify-center px-8 sm:px-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-6">
          Abstract
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg max-w-4xl">
          People can use credit cards for online transactions as it provides an
          efficient and easy-to-use facility. With the increase in usage of
          credit cards, the capacity of credit card misuse has also enhanced.
          Credit card frauds cause significant financial losses for both
          credit card holders and financial companies.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg mt-4 max-w-4xl">
          The study compares traditional Machine Learning methods such as
          Decision Tree, Random Forest, Logistic Regression, SVM, and XGBoost
          with advanced Deep Learning architectures including CNN-based models.
          A European credit card dataset is used, demonstrating 99.9% accuracy,
          93% precision, 85.71% F1-score, and 98% AUC, outperforming
          state-of-the-art benchmarks.
        </p>
      </section>

      {/* KEY RESULTS */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center bg-slate-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-8">
          Key Outcomes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-teal-400">99.9%</p>
            <p className="text-gray-300 mt-2">Accuracy</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-cyan-400">93%</p>
            <p className="text-gray-300 mt-2">Precision</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-green-400">85.71%</p>
            <p className="text-gray-300 mt-2">F1-Score</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <p className="text-4xl font-bold text-yellow-400">98%</p>
            <p className="text-gray-300 mt-2">AUC Curve</p>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="min-h-screen flex flex-col justify-center px-8 sm:px-16 bg-gradient-to-b from-slate-900 to-black">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-6">
          Methodology
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed max-w-5xl">
          The system integrates supervised Machine Learning algorithms and
          advanced Deep Learning CNN architectures to predict fraudulent
          transactions. Techniques such as Extreme Learning, Random Forest,
          and SVM were compared against CNNs with multiple hidden layers,
          achieving near-perfect classification metrics. Data balancing and
          hyperparameter optimization further minimized false negatives.
        </p>
      </section>

      {/* REFERENCES */}
      <section className="min-h-screen flex flex-col justify-center px-8 sm:px-16 bg-slate-950">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-6">
          References
        </h2>
        <ul className="space-y-4 text-gray-300 max-w-4xl text-md leading-relaxed list-disc list-inside">
          <li>
            <strong>Credit Card Fraud Detection Using State-of-the-Art ML & DL</strong>,
            DOI: 10.34256/ijcci2511
          </li>
          <li>
            <strong>Machine Learning Methods for Credit Card Fraud Detection</strong>,
            IEEE Access, DOI: 10.1109/ACCESS.2022.3166891
          </li>
          <li>
            <strong>Enhancing Fraud Detection in Banking With Deep Learning</strong>,
            DOI: 10.1109/ACCESS.2024.3466288
          </li>
          <li>
            <strong>Advanced ML Approaches for Fraud Detection in the USA</strong>,
            DOI: 10.62754/joe.v4i2.6377
          </li>
          <li>
            <strong>Credit Card Fraud Detection using AI/ML/CNN</strong>, Volume 8, Issue 3, 2023
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-black text-center">
        <h2 className="text-5xl font-bold mb-6 text-white">
          Ready to Explore the Model?
        </h2>
        <a
          href="/overview"
          className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg text-xl transition-all duration-300"
        >
          View Live System →
        </a>
      </section>
    </div>
  );
}
