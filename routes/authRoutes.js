const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Register a new vendor
router.post('/register', register);

// Vendor login
router.post('/login', login);

module.exports = router;
