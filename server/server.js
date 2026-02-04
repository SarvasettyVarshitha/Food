const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', apiRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env file.");
    // Don't exit, just log error so user can fix it
} else {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch((err) => console.error('MongoDB connection error:', err));
}

app.get('/', (req, res) => {
    res.send('Hostel Food Waste Reduction API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
