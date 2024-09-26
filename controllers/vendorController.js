const { db } = require('../firebase');

// Get all vendors
const getVendors = async (req, res) => {
  try {
    const vendorsSnapshot = await db.collection('vendors').get();
    const vendors = vendorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
};

// Create a new vendor
const createVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newVendor = { name, email, password, privileges: [], balance: 0, isAdmin: false };
    const vendorRef = await db.collection('vendors').add(newVendor);
    res.status(201).json({ id: vendorRef.id, ...newVendor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vendor' });
  }
};

module.exports = { getVendors, createVendor };
