const Sports = require('../models/Sports');

// GET all sports news
exports.getAllSportsNews = async (req, res) => {
    try {
        const sportsNews = await Sports.find();
        res.json(sportsNews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET news by ID
exports.getSportsNewsById = async (req, res) => {
    try {
        const news = await Sports.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST (Create new sports news - protected)
exports.createSportsNews = async (req, res) => {
    const { title, description, sourceUrl } = req.body;
    const sportsNews = new Sports({
        title,
        description,
        sourceUrl,
        image: req.file ? req.file.path : null,
    });

    try {
        const newSportsNews = await sportsNews.save();
        res.status(201).json(newSportsNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT (Update sports news - protected)
exports.updateSportsNews = async (req, res) => {
    try {
        const sportsNews = await Sports.findById(req.params.id);
        if (!sportsNews) return res.status(404).json({ message: 'Sports news not found' });

        if (req.body.title) sportsNews.title = req.body.title;
        if (req.body.description) sportsNews.description = req.body.description;
        if (req.body.sourceUrl) sportsNews.sourceUrl = req.body.sourceUrl;
        if (req.file) sportsNews.image = req.file.path;

        const updatedSportsNews = await sportsNews.save();
        res.json(updatedSportsNews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE sports news (protected)
exports.deleteSportsNews = async (req, res) => {
    try {
        const sportsNews = await Sports.findById(req.params.id);
        if (!sportsNews) return res.status(404).json({ message: 'Sports news not found' });

        await Sports.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sports news deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
