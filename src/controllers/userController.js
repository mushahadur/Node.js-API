const authService = require('../services/authService');

class UserController {
  // This is a protected route - only logged in users can access it
  // GET /users
  async getAllUsers(req, res) {
    try {
      const users = await authService.getAllUsers();

      return res.status(200).json({
        success: true,
        message: 'User list fetched successfully',
        data: users
      });

    } catch (error) {
      console.error('GET USERS ERROR:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to fetch users'
      });
    }
  }
}

module.exports = new UserController();