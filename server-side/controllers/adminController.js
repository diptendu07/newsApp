const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const admin = {
    username: 'diptendu07',
    email: 'diptendulodh@gmail.com',
    password: 'dipu@2992',  // For simplicity; you should hash passwords in production
};

// POST: Admin login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (email !== admin.email) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password
    if (password !== admin.password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// POST: Admin logout (authenticated)
exports.logout = (req, res) => {
    // You can send a message to the client that the token should be cleared.
    res.json({ message: 'Logged out successfully, please clear the token from client-side.' });
};