// ============================================
// 1. REPOSITORY LAYER (Database Operations)
// File: src/repositories/userRepository.js
// ============================================

const User = require('../models/User');

class UserRepository {
    // Just Database queries - No business logic
    
    async findByEmail(email) {
        return await User.findOne({ email });
    }
    
    async findById(id) {
        return await User.findById(id);
    }
    
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }


    async updateVerificationStatus(userId, status) {
        return await User.findByIdAndUpdate(
            userId,
            { 
                isEmailVerified: status,
                verificationToken: null,
                verificationTokenExpires: null 
            },
            { new: true }
        );
    }
    
    async findByVerificationToken(token) {
        return await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });
    }
    
    // NEW METHODS for Password Reset
    async savePasswordResetToken(userId, token, expires) {
        return await User.findByIdAndUpdate(
            userId,
            {
                passwordResetToken: token,
                passwordResetTokenExpires: expires
            },
            { new: true }
        );
    }
    
    async findByPasswordResetToken(token) {
        return await User.findOne({
            passwordResetToken: token,
            passwordResetTokenExpires: { $gt: Date.now() }
        });
    }
    
    async updatePassword(userId, newPassword) {
        return await User.findByIdAndUpdate(
            userId,
            {
                password: newPassword,
                passwordResetToken: null,
                passwordResetTokenExpires: null
            },
            { new: true }
        );
    }

}

module.exports = new UserRepository();