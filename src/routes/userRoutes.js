const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth'); // Import middleware

// Protected route - auth middleware use this
router.get('/profile', auth, userController.getAllUsers);
// router.get('/profile', userController.getAllUsers);


module.exports = router;