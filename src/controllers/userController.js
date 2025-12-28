class UserController {
    // This is a protected route - only logged in users can access it
    async getProfile(req, res) {
        try {
            // req.user comes from middleware
            res.status(200).json({
                success: true,
                message: 'Profile fetched successfully',
                data: req.user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new UserController();