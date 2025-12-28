const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        // Email transporter setup
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }
    
    // Verification email send
    async sendVerificationEmail(email, name, token) {
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verify Your Email',
            html: `
                <h1>Welcome ${name}!</h1>
                <p>Please verify your email by clicking the link below:</p>
                <h3>Verified Token is :  ${token}</h3>
                <a href="${verificationUrl}">Verify Email</a>
                <p>This link will expire in 24 hours.</p>
            `
        };
        
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Verification email sent to ${email}`);
        } catch (error) {
            console.error('Email send error:', error);
            throw new Error('Failed to send verification email');
        }
    }
    
        // NEW METHOD: Password reset email
    async sendPasswordResetEmail(email, name, token) {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h1>Hello ${name}!</h1>
                <p>You requested to reset your password.</p>
                  <h3>Reset token :  ${token} </h3>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p><strong>This link will expire in 1 hour.</strong></p>
                <p>If you did not request this, please ignore this email.</p>
            `
        };
        
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`📧 Password reset email sent to ${email}`);
            console.log(`🔗 Reset token: ${token}`);
        } catch (error) {
            console.error('Email send error:', error);
            throw new Error('Failed to send password reset email');
        }
    }

    // Welcome email send
    async sendWelcomeEmail(email, name) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Welcome to Our Platform!',
            html: `
                <h1>Welcome ${name}!</h1>
                <p>Your email has been verified successfully.</p>
                <p>You can now start using our platform.</p>
            `
        };
        
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Welcome email sent to ${email}`);
        } catch (error) {
            console.error('Email send error:', error);
        }
    }
}

module.exports = new EmailService();