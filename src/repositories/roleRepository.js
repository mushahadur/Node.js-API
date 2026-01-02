const Role = require('../models/Role');
// const { User, Role } = require('../models');

class RoleRepository {

    async create(data) {
        return await Role.create(data);
    }

    async findByName(name) {
        return await Role.findOne({ name });
    }

    async findAll() {
        return await Role.find().sort({ createdAt: -1 });
    }

    async findById(id) {
    return await Role.findById(id).populate('permissions');
  }

    async assignPermission(roleId, permissionId) {
    const role = await Role.findById(roleId);
    if (!role) throw new Error('Role not found');

    if (!role.permissions.includes(permissionId)) {
      role.permissions.push(permissionId);
      await role.save();
    }
    return role;
  }
}

module.exports = new RoleRepository();
