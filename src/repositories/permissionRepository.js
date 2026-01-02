const Permission = require('../models/Permission');

class PermissionRepository {
  async create(data) {
    return await Permission.create(data);
  }

  async findAll() {
    return await Permission.find();
  }

  async findByName(name) {
    return await Permission.findOne({ name });
  }

  async findById(id) {
    return await Permission.findById(id);
  }
}

module.exports = new PermissionRepository();
