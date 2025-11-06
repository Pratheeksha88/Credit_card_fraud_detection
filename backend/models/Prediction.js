const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  features: { type: Object, required: true },
  predictions: { type: Array },
  probabilities: { type: Array },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prediction", predictionSchema);
