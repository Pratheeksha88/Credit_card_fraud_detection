const axios = require('axios');

exports.predictTransaction = async (req, res) => {
  try {
    const response = await axios.post(`${process.env.ML_URL}/predict`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Prediction error:", error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
};
