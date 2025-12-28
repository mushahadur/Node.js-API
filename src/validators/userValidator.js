
const { body, validationResult } = require('express-validator');

// Create Profile - All fields required
const createProfileValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 and 30 characters'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character')
];

// Update Profile - Fields optional but at least one required
const updateProfileValidation = [
    // Custom validator: at least one field must be present
    body().custom((value, { req }) => {
        if (!req.body.name && !req.body.email) {
            throw new Error('At least one field (name or email) must be provided');
        }
        return true;
    }),
    
    // Optional name validation
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 3, max: 30 })
        .withMessage('Name must be between 3 and 30 characters'),
    
    // Optional email validation
    body('email')
        .optional()
        .trim()
        .notEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail()
];


// ============================================
// Validation Error Handler Middleware
// ============================================

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path || err.param,
                message: err.msg
            }))
        });
    }
    
    next();
};

module.exports = {
    createProfileValidation,
    updateProfileValidation,
    validate
};
