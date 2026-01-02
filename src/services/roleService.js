const roleRepository = require('../repositories/roleRepository');
const userRepository = require('../repositories/userRepository');

class RoleService {

    async createRole(data) {
        // console.log(`Role Data Ser : ${data}`);
        const existingRole = await roleRepository.findByName(data.name);

        if (existingRole) {
            throw new Error('Role already exists');
        }

        return roleRepository.create(data);
    }

    async getAllRoles() {
        return roleRepository.findAll();
    }

    // Role assign method
  async assignRole(userId, roleId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    user.roleId = roleId;
    await user.save();

    // Populate role info before returning
    await user.populate('roleId');

    return user;
  }

  async assignPermission(roleId, permissionId) {
    return roleRepository.assignPermission(roleId, permissionId);
  }
}

module.exports = new RoleService();
