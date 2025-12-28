// ============================================
// 2. SERVICE LAYER (Business Logic)
// File: src/services/authService.js
// ============================================

const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const tokenService = require('./tokenService');
const emailService = require('./emailService');

class AuthService {
    // Business logic + coordination
    
    async register(name, email, password) {
        // Step 1: Check if email already exists
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already registered');
        }
        
        // Step 2: Hash password (security logic)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Step 3: Generate verification token
        const verificationToken = tokenService.generateVerificationToken();
        const tokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        
        // Step 4: Create user via repository
        const userData = {
            name,
            email,
            password: hashedPassword,
            isEmailVerified: false,
            verificationToken,
            verificationTokenExpires: tokenExpires
        };
        
        const user = await userRepository.create(userData);
        
        // Step 5: Send verification email
        await emailService.sendVerificationEmail(
            email, 
            name, 
            verificationToken
        );
        
        // Step 6: Return safe user data (no password)
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        };
    }
    
    async verifyEmail(token) {
        // Step 1: Find user by token
        const user = await userRepository.findByVerificationToken(token);
        
        if (!user) {
            throw new Error('Invalid or expired verification token');
        }
        
        // Step 2: Update verification status
        const updatedUser = await userRepository.updateVerificationStatus(
            user._id, 
            true
        );
        
        // Step 3: Send welcome email (optional)
        await emailService.sendWelcomeEmail(
            updatedUser.email, 
            updatedUser.name
        );
        
        return {
            message: 'Email verified successfully',
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                isEmailVerified: updatedUser.isEmailVerified
            }
        };
    }
    
    async login(email, password) {
        // Step 1: Find user
        const user = await userRepository.findByEmail(email);
        
        if (!user) {
            throw new Error('Invalid credentials');
        }
        
        // Step 2: Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        
        // Step 3: Check if email is verified
        if (!user.isEmailVerified) {
            throw new Error('Please verify your email first');
        }
        
        // Step 4: Generate JWT token
        const token = tokenService.generateJWT(user._id);
        
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };
    }

    // NEW METHOD 1: Request Password Reset
    async requestPasswordReset(email) {
        // Find user by email
        const user = await userRepository.findByEmail(email);

        if (!user) {
            // Security: Don't reveal if email exists or not
            // Always return success message
            return {
                message: 'If that email exists, a password reset link has been sent.'
            };
        }
        
        // Generate reset token
        const resetToken = tokenService.generatePasswordResetToken();
        const tokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        
        // Save token to database
        await userRepository.savePasswordResetToken(
            user._id,
            resetToken,
            tokenExpires
        );
        
        // Send email (for now just console log)
        console.log(`📧 Password reset email would be sent to: ${email}`);
        console.log(`🔗 Reset token: ${resetToken}`);
        
        // In production, uncomment this:
        await emailService.sendPasswordResetEmail(email, user.name, resetToken);
        
        return {
            message: 'If that email exists, a password reset link has been sent.'
        };
    }
    
    // NEW METHOD 2: Verify Reset Token
    async verifyResetToken(token) {
        const user = await userRepository.findByPasswordResetToken(token);
        
        if (!user) {
            throw new Error('Invalid or expired password reset token');
        }
        
        return {
            valid: true,
            email: user.email
        };
    }
    
    // NEW METHOD 3: Reset Password
    async resetPassword(token, newPassword) {
        // Find user by reset token
        const user = await userRepository.findByPasswordResetToken(token);
        
        if (!user) {
            throw new Error('Invalid or expired password reset token');
        }
        
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password and clear reset token
        await userRepository.updatePassword(user._id, hashedPassword);
        
        console.log(`✅ Password reset successful for: ${user.email}`);
        
        return {
            message: 'Password reset successful. You can now login with your new password.'
        };
    }
}

module.exports = new AuthService();