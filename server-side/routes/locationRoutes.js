// routes/locationRoutes.js
const express = require('express');
const { getLocation } = require('../controllers/locationController');

const router = express.Router();

// Define the route for fetching location
router.get('/location', getLocation);

module.exports = router;
