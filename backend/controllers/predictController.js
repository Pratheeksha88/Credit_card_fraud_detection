const axios = require("axios");
const Prediction = require("../models/Prediction");

/**
 * Send transaction data to the ML microservice for fraud prediction.
 * This controller:
 *  1. Receives transaction feature(s) from frontend.
 *  2. Forwards them to Flask ML API (at process.env.ML_URL).
 *  3. Returns predictions & probabilities to the frontend.
 *  4. Optionally saves the results to MongoDB.
 */
exports.getPrediction = async (req, res) => {
  try {
    const userId = req.user.id; // user from JWT middleware
    const { features } = req.body;

    if (!features)
      return res.status(400).json({ message: "No features provided" });

    // Send data to the Python ML microservice
    const mlResponse = await axios.post(`${process.env.ML_URL}/predict`, {
      features,
    });

    const { predictions, probabilities } = mlResponse.data;

    // Optionally save to DB
    const savedPrediction = await Prediction.create({
      user: userId,
      features,
      predictions,
      probabilities,
    });

    return res.json({
      success: true,
      message: "Prediction successful",
      predictions,
      probabilities,
      savedPrediction,
    });
  } catch (error) {
    console.error("Prediction error:", error.message);
    res.status(500).json({ message: "Prediction failed", error: error.message });
  }
};

/**
 * Fetch all previous predictions by the logged-in user.
 */
exports.getPredictionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await Prediction.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, history });
  } catch (error) {
    console.error("Fetch history error:", error.message);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};
