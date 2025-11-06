const express = require('express');
const router = express.Router();
const { predictTransaction } = require('../controllers/predictController');

router.post('/', predictTransaction);

module.exports = router;
