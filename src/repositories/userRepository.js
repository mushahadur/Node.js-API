// ============================================
// 1. REPOSITORY LAYER (Database Operations)
// File: src/repositories/userRepository.js
// ============================================

const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken');

class UserRepository {
    // Just Database queries - No business logic
    
    async findByEmail(email) {
        return await User.findOne({ email });
    }
    
    async findById(id) {
        return await User.findById(id);
    }

      async findAll() {
        return await User.find()
        .select('-password')
        .populate({
            path: 'roleId',
            select: 'name permissions',
            populate: {
            path: 'permissions',
            select: 'name'
            }
        });
    }

    // async findByIdWithRole(id) {
    //     console.log('Finding user with role...');
    // return User.findById(id).populate({
    //     path: 'roleId',
    //     populate: { path: 'permissions' }
    // });
    // }
    
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }


    async updateVerificationStatus(userId, status) {
        return await User.findByIdAndUpdate(
            userId,
            { 
                isEmailVerified: status,
                verificationOTP: null,
                verificationOTPExpires: null 
            },
            { new: true }
        );
    }
    
    async findByVerificationOTP(otp) {
        return await User.findOne({
            verificationOTP: otp,
            verificationOTPExpires: { $gt: Date.now() }
        });
    }
    
    // NEW METHODS for Password Reset
    async saveOtpForResetPassword(userId, otp, expires) {
        return await User.findByIdAndUpdate(
            userId,
            {
                verificationOTP: otp,
                verificationOTPExpires: expires
            },
            { new: true }
        );
    }

    // NEW METHODS for Save Token Password Reset
    async updateTokenOtpForResetPassword(userId, token, expires) {
        return await User.findByIdAndUpdate(
            userId,
            {
                passwordResetToken: token,
                passwordResetTokenExpires: expires,
                verificationOTP: null,
                verificationOTPExpires: null 
            },
            { new: true }
        );
    }
    

     async findByVerificationToken(token) {
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
    
     async addToBlacklist(token, expiresAt) {
        return BlacklistedToken.create({ token, expiresAt });
    }

    async isBlacklisted(token) {
        return BlacklistedToken.findOne({ token });
    }

}

module.exports = new UserRepository();