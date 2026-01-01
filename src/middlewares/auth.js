const tokenService = require('../services/tokenService');
const userRepository = require('../repositories/userRepository');

const auth = async (req, res, next) => {
    try {
        // Step 1: Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Step 2: Extract token
        const token = authHeader.split(' ')[1]; // "Bearer TOKEN" from TOKEN get

        // Step 3: Blacklist check
        const blacklisted = await userRepository.isBlacklisted(token);
        if (blacklisted) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid (logged out)'
            });
        }

        // Step 4: Verify token
        const decoded = tokenService.verifyJWT(token);

        // Step 5: Get user from database
        const user = await userRepository.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Step 6: Attach user to request object
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        // Step 7: Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = auth;