const express = require('express');
const { login, logout } = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/logout', authenticateToken, logout); // Add authenticated logout route

module.exports = router;
