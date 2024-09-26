const { db } = require('../firebase');

// Middleware to check if the vendor is an admin
const adminMiddleware = async (req, res, next) => {
  const vendorId = req.vendor.id;  // Get vendor ID from decoded token

  try {
    // Fetch the vendor data from Firestore
    const vendorRef = db.collection('vendors').doc(vendorId);
    const vendorDoc = await vendorRef.get();

    if (!vendorDoc.exists) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const vendor = vendorDoc.data();

    // Check if the vendor is an admin
    if (!vendor.isAdmin) {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = adminMiddleware;
