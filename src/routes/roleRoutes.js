const express = require('express');
const roleController = require('../controllers/roleController');

const router = express.Router();

router.post('/', roleController.create);
router.get('/', roleController.getAll);

router.post('/assign', roleController.assignRole);
router.post('/assign-permission', roleController.assignPermission);

module.exports = router;
