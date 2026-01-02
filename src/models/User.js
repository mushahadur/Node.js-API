const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    
    // Email verification
    isEmailVerified: { type: Boolean, default: false },
    verificationOTP: { type: String },
    verificationOTPExpires: { type: Date },
    
    // Password reset - New fields
    passwordResetToken: { type: String },
    passwordResetTokenExpires: { type: Date },
    
     // Role relationship
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role', // Reference to Role collection
      default: null,
    },

    
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);