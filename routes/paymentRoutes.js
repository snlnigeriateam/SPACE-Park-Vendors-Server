const express = require('express');
const { getPayments, createPayment, updatePaymentStatus, getPaymentsByVendor } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all payments
router.get('/', authMiddleware, getPayments);

// Create a new payment
router.post('/', authMiddleware, createPayment);

// Update payment status
router.put('/:id', authMiddleware, updatePaymentStatus);

// Get all payments by a specific vendor
router.get('/vendor/:vendorId', authMiddleware, getPaymentsByVendor);

module.exports = router;
