// src/models/Permission.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // ex: 'products-create'
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);
