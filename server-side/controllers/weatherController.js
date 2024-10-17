const axios = require('axios');

// Fetch weather report
const getWeather = async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const apiKey = process.env.API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

module.exports = { getWeather };
