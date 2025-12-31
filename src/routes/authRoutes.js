const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation, validate } = require('../validators/authValidator');


// Registration route
router.post('/register', registerValidation, validate, authController.register);
// Email verification route
router.post('/verify-email', authController.verifyEmail);
// Login route
router.post('/login', loginValidation, validate, authController.login);

// Forgot password route
router.post('/forgot-password', authController.forgotPassword);
// Verify OTP route
router.post('/verify-otp', authController.verifyOTP);
// Reset password route
router.post('/reset-password', authController.resetPassword);


module.exports = router;


