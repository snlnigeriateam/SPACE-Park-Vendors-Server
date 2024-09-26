const { db } = require('../firebase');

// Get all menu items
const getMenuItems = async (req, res) => {
  try {
    const menuItemsSnapshot = await db.collection('menuItems').get();
    const menuItems = menuItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

// Register a new menu item
const registerMenuItem = async (req, res) => {
  try {
    const { name, price, vendorId } = req.body;
    const newMenuItem = { name, price, vendor: vendorId, approved: false };
    const menuItemRef = await db.collection('menuItems').add(newMenuItem);
    res.status(201).json({ id: menuItemRef.id, ...newMenuItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register menu item' });
  }
};

// Approve a menu item
const approveMenuItem = async (req, res) => {
  try {
    const { menuItemId } = req.params;
    const menuItemRef = db.collection('menuItems').doc(menuItemId);
    await menuItemRef.update({ approved: true });
    res.status(200).json({ message: 'Menu item approved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve menu item' });
  }
};

// Reject a menu item
const rejectMenuItem = async (req, res) => {
  try {
    const { menuItemId } = req.params;
    const menuItemRef = db.collection('menuItems').doc(menuItemId);
    await menuItemRef.update({ approved: false });
    res.status(200).json({ message: 'Menu item rejected' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject menu item' });
  }
};

module.exports = { getMenuItems, registerMenuItem, approveMenuItem, rejectMenuItem };
