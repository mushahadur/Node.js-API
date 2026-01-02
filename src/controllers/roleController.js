const roleService = require('../services/roleService');

class RoleController {

    async create(req, res) {
        try {
            const role = await roleService.createRole(req.body);
            res.status(201).json({
                success: true,
                data: role
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            res.json({
                success: true,
                data: roles
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async assignRole(req, res) {
        try {
            const { userId, roleId } = req.body;

            const user = await roleService.assignRole(userId, roleId);

            res.status(200).json({
                success: true,
                message: 'Role assigned successfully',
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.roleId ? { id: user.roleId._id, name: user.roleId.name } : null
                }
            });

        } catch (err) {
            res.status(err.statusCode || 400).json({
                success: false,
                message: err.message || 'Something went wrong'
            });
        }
    }

    async assignPermission(req, res) {
    try {
      const { roleId, permissionId } = req.body;
      const role = await roleService.assignPermission(roleId, permissionId);
      res.json({ success: true, data: role });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
    
}

module.exports = new RoleController();
