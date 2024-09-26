const { db } = require('../firebase');

// Get all privileges
const getPrivileges = async (req, res) => {
  try {
    const privilegesSnapshot = await db.collection('privileges').get();
    const privileges = privilegesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(privileges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch privileges' });
  }
};

// Grant a new privilege
const grantPrivilege = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPrivilege = { name, description };
    const privilegeRef = await db.collection('privileges').add(newPrivilege);
    res.status(201).json({ id: privilegeRef.id, ...newPrivilege });
  } catch (error) {
    res.status(500).json({ error: 'Failed to grant privilege' });
  }
};

module.exports = { getPrivileges, grantPrivilege };
