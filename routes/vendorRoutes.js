const express = require('express');
const { getVendors, createVendor } = require('../controllers/vendorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all vendors
router.get('/', authMiddleware, getVendors);

// Create a new vendor
router.post('/', authMiddleware, createVendor);

module.exports = router;
