const express = require('express');
const { getAllNews, getLatestNews, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsAppController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');
const router = express.Router();

router.get('/', getAllNews);
router.get('/latest', getLatestNews); // New endpoint for latest news
router.get('/:id', getNewsById);
router.post('/', authenticateToken, upload.single('image'), createNews);
router.put('/:id', authenticateToken, upload.single('image'), updateNews);
router.delete('/:id', authenticateToken, deleteNews);

module.exports = router;