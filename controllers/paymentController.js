const { db } = require('../firebase');
const QRCode = require('qrcode');

// Create a new payment with QR Code generation
const createPayment = async (req, res) => {
  const { amount, vendorId } = req.body;
  try {
    const newPayment = {
      amount,
      vendor: vendorId,
      date: new Date(),
      status: 'pending',
      settled: false,
      isHeldInHoldingAccount: true,
    };

    // Create a new payment document in Firestore
    const paymentRef = await db.collection('payments').add(newPayment);

    // Generate a QR Code for the payment
    const qrCodeUrl = await QRCode.toDataURL(`https://your-app.com/pay/${paymentRef.id}`);
    await paymentRef.update({ qrCode: qrCodeUrl });

    res.status(201).json({ id: paymentRef.id, ...newPayment, qrCode: qrCodeUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  const { status } = req.body;
  const paymentId = req.params.id;

  try {
    const paymentRef = db.collection('payments').doc(paymentId);
    const paymentDoc = await paymentRef.get();

    if (!paymentDoc.exists) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await paymentRef.update({ status });
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
};

// Fetch all payments for a vendor
const getPaymentsByVendor = async (req, res) => {
  const vendorId = req.params.vendorId;

  try {
    const paymentsSnapshot = await db.collection('payments').where('vendor', '==', vendorId).get();
    const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
};

// Fetch all payments
const getPayments = async (req, res) => {
  try {
    const paymentsSnapshot = await db.collection('payments').get();
    const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
};

module.exports = { createPayment, updatePaymentStatus, getPaymentsByVendor, getPayments };
