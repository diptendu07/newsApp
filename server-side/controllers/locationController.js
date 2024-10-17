// controller/locationController.js
const axios = require('axios');
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;

// Function to fetch location by latitude and longitude
const getLocation = async (req, res) => {
    const lat = req.query.lat || 22.581806; // Default latitude
    const lng = req.query.lng || 88.4579492; // Default longitude

    try {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${GEOCODING_API_KEY}`;
        const response = await axios.get(apiUrl);

        if (response.data.results.length > 0) {
            const location = response.data.results[0];
            res.json({
                formatted_address: location.formatted,
                components: location.components,
                geometry: location.geometry
            });
        } else {
            res.status(404).json({ error: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
};

module.exports = { getLocation };
