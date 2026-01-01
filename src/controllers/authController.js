
// ============================================
// 3. CONTROLLER LAYER (Request/Response)
// File: src/controllers/authController.js
// ============================================

const authService = require('../services/authService');

class AuthController {
    // Just HTTP request/response handling
    
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            
            // Call service
            const result = await authService.register(name, email, password);
            
            // Send response
            res.status(201).json({
                success: true,
                message: 'Registration successful! Please check your email.',
                data: result
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    
    async verifyEmail(req, res) {
        try {
            const { otp } = req.body;
            // return otp;
            // Call service
            const result = await authService.verifyEmail(otp);
            
            // Send response
            res.status(200).json({
                success: true,
                message: result.message,
                data: result.user
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    
    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Input validation
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }
            
            // Call service
            const result = await authService.login(email, password);
            
            // Send response
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
            
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    //Logout
       async logout(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await authService.logout(token);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // NEW ENDPOINT 1: Request Password Reset
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is required'
                });
            }
            
            const result = await authService.requestPasswordReset(email);
            
            res.status(200).json({
                success: true,
                message: result.message
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    
    // NEW ENDPOINT 2: Verify OTP (Optional but recommended)
    async verifyOTP(req, res) {
        try {
            const { otp } = req.body;
            
            const result = await authService.verifyOTP(otp);
            
            res.status(200).json({
                success: true,
                data: result
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    
    // NEW ENDPOINT 3: Reset Password
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            
            if (!token || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Token and new password are required'
                });
            }
            
            const result = await authService.resetPassword(token, newPassword);
            
            res.status(200).json({
                success: true,
                message: result.message
            });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new AuthController();
