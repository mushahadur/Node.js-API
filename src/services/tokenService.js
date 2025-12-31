const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class TokenService {
    // Random verification token Create
    generateVerificationToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    // Password reset token - NEW METHOD
    generatePasswordResetToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    generateVerificationOTP() {
        return crypto.randomInt(100000, 1000000).toString(); // 6-digit OTP
    }

    // JWT token Create
    generateJWT(userId) {
        return jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
    }

    // JWT token verify 
    verifyJWT(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = new TokenService();