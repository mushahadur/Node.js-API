const User = require('../models/User');

const authorize = (permissionName) => async (req, res, next) => {
  try {
    const userId = req.userId; // auth middleware set 
    const user = await User.findById(userId).populate({
      path: 'roleId',
      populate: { path: 'permissions' }
    });

    if (!user || !user.roleId)
      return res.status(403).json({ success: false, message: 'No role assigned' });

    const hasPermission = user.roleId.permissions.some(p => p.name === permissionName);

    if (!hasPermission)
      return res.status(403).json({ success: false, message: 'Permission denied' });

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = authorize;
