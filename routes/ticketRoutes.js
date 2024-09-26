const express = require('express');
const { getTickets, createTicket } = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all tickets
router.get('/', authMiddleware, getTickets);

// Create a new ticket
router.post('/', authMiddleware, createTicket);

module.exports = router;
