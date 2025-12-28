require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes'); // add route

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes - 
app.use('/api', routes);

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Blog API is running',
        status: 'success' 
    });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});