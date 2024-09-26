const express = require('express');
const { getPrivileges, grantPrivilege } = require('../controllers/privilegeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all privileges
router.get('/', authMiddleware, getPrivileges);

// Grant a new privilege
router.post('/', authMiddleware, grantPrivilege);

module.exports = router;
