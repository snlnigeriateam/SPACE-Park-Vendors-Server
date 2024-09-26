const express = require('express');
const { approveMenuItem, rejectMenuItem } = require('../controllers/menuController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Approve a menu item
router.put('/approvals/approve/:menuItemId', adminMiddleware, approveMenuItem);

// Reject a menu item
router.put('/approvals/reject/:menuItemId', adminMiddleware, rejectMenuItem);

module.exports = router;
