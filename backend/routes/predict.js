const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  getPrediction,
  getPredictionHistory,
} = require("../controllers/predictController");

// POST /api/predict → run a new prediction
router.post("/", authMiddleware, getPrediction);

// GET /api/predict/history → get past user predictions
router.get("/history", authMiddleware, getPredictionHistory);

module.exports = router;
