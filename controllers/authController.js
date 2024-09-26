const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../firebase');

// Register a new vendor
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new vendor
    const newVendor = { name, email, password: hashedPassword, privileges: [], balance: 0, isAdmin: false };
    const vendorRef = await db.collection('vendors').add(newVendor);

    res.status(201).json({ id: vendorRef.id, ...newVendor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register vendor' });
  }
};

// Login a vendor
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch the vendor by email
    const vendorSnapshot = await db.collection('vendors').where('email', '==', email).get();
    if (vendorSnapshot.empty) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const vendor = vendorSnapshot.docs[0].data();
    const vendorId = vendorSnapshot.docs[0].id;

    // Check if password matches
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: vendorId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

module.exports = { register, login };
