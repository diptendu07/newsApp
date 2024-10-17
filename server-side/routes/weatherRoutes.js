const express = require('express');
const { getWeather } = require('../controllers/weatherController');

const router = express.Router();

// Define the route for fetching weather report
router.get('/', getWeather);

module.exports = router;
