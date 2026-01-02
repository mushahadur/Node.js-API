const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes'); 
const roleRoutes = require('./roleRoutes');
const permissionRoutes = require('./permissionRoutes');

// Auth routes
router.use('/auth', authRoutes);

// Role Routes
router.use('/roles', roleRoutes);

// Permission Routes
router.use('/permissions', permissionRoutes);

// User routes
router.use('/users', userRoutes); 

module.exports = router;