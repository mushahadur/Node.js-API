const permissionRepository = require('../repositories/permissionRepository');

class PermissionService {
  async createPermission(name) {
    const existing = await permissionRepository.findByName(name);
    if (existing) throw new Error('Permission already exists');
    return permissionRepository.create({ name });
  }

  async getAllPermissions() {
    return permissionRepository.findAll();
  }
}

module.exports = new PermissionService();
