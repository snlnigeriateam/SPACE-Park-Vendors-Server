const express = require('express');
const { getMenuItems, registerMenuItem, approveMenuItem, rejectMenuItem } = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware'); // Correct import

const router = express.Router();

// Get all menu items
router.get('/', authMiddleware, getMenuItems);

// Register a new menu item
router.post('/', authMiddleware, registerMenuItem);

// Approve a menu item (admin only)
router.put('/approvals/approve/:menuItemId', adminMiddleware, approveMenuItem);

// Reject a menu item (admin only)
router.put('/approvals/reject/:menuItemId', adminMiddleware, rejectMenuItem);

module.exports = router;
