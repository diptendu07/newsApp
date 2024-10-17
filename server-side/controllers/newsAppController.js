const News = require('../models/newsApp');

// GET all news
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET news by ID
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// GET latest three news
exports.getLatestNews = async (req, res) => {
    try {
        const latestNews = await News.find()
            .sort({ publishAt: -1 }) // Sort by publishAt in descending order
            .limit(3); // Limit to 3 documents
        res.json(latestNews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST (Create a new news item - protected)
exports.createNews = async (req, res) => {
    const { title, description, sourceUrl } = req.body;
    const news = new News({
        title,
        description,
        sourceUrl,
        image: req.file ? req.file.path : null,
    });

    try {
        const newNews = await news.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT (Update news - protected)
exports.updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        if (req.body.title) news.title = req.body.title;
        if (req.body.description) news.description = req.body.description;
        if (req.body.sourceUrl) news.sourceUrl = req.body.sourceUrl;
        if (req.file) news.image = req.file.path;

        const updatedNews = await news.save();
        res.json(updatedNews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE news (protected)
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

