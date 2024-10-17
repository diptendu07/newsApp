// backend/app.js

const express = require('express');
const http = require('http'); // Import http for socket.io
const socketIo = require('socket.io'); // Import socket.io
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const newsAppRoutes = require('./routes/newsAppRoutes');
const sportsRoutes = require('./routes/sportsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const locationRoutes = require('./routes/locationRoutes');
const weatherRoutes = require('./routes/weatherRoutes'); // Import weather routes

const app = express();
const server = http.createServer(app); // Create HTTP server with Express app
const io = socketIo(server, { // Initialize Socket.io with server
    cors: {
        origin: "*", // Allow all origins or specify your frontend URL
        methods: ["GET", "POST"], // Allowed methods
        allowedHeaders: ["Content-Type"], // Allowed headers
        credentials: true // Enable credentials if needed
    }
});

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use('/uploads', express.static('uploads'));
app.use(express.static('client')); // Assuming your HTML file is in the 'client' directory

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsAppRoutes);
app.use('/api/sports', sportsRoutes);
app.use('/api', contactRoutes);
app.use('/api/weather', weatherRoutes); // Add weather route
app.use('/api', locationRoutes);  // Use the location routes

// Socket.io logic
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (data) => {
        io.emit('chat message', data); // Emit the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { // Start the HTTP server
    console.log(`Server is running on port ${PORT}`);
});
