const express = require('express');
const { getAllSportsNews, getSportsNewsById, createSportsNews, updateSportsNews, deleteSportsNews } = require('../controllers/sportsController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');
const router = express.Router();

// Public: GET all sports news
router.get('/', getAllSportsNews);

// Get Sports News by id
router.get('/:id', getSportsNewsById);

// Protected: POST (Create sports news)
router.post('/', authenticateToken, upload.single('image'), createSportsNews);

// Protected: PUT (Update sports news)
router.put('/:id', authenticateToken, upload.single('image'), updateSportsNews);

// Protected: DELETE (Delete sports news)
router.delete('/:id', authenticateToken, deleteSportsNews);

module.exports = router;
