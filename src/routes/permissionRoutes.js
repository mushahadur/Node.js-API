const express = require('express');
const permissionController = require('../controllers/permissionController');

const router = express.Router();

router.post('/', permissionController.createPermission); // Create permission
router.get('/', permissionController.getAllPermissions);  // Get all permissions

module.exports = router;
