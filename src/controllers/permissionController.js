const permissionService = require('../services/permissionService');

class PermissionController {
  async createPermission(req, res) {
    try {
      const { name } = req.body;
      const permission = await permissionService.createPermission(name);
      res.status(201).json({ success: true, data: permission });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getAllPermissions(req, res) {
    try {
      const permissions = await permissionService.getAllPermissions();
      res.json({ success: true, data: permissions });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new PermissionController();
