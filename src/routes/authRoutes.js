const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../validators/authValidator');


// Registration route
router.post('/register', registerValidation, validate, authController.register);
// Email verification route
router.get('/verify-email/:token', authController.verifyEmail);
// Login route
router.post('/login', loginValidation, validate, authController.login);

// Forgot password route
router.post('/forgot-password', authController.forgotPassword);
// Verify reset token route
router.get('/reset-password/:token', authController.verifyResetToken);
// Reset password route
router.post('/reset-password', authController.resetPassword);

module.exports = router;


