const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes'); 

// Auth routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes); 

module.exports = router;