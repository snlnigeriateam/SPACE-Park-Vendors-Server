const { db } = require('../firebase');

// Get all tickets
const getTickets = async (req, res) => {
  try {
    const ticketsSnapshot = await db.collection('tickets').get();
    const tickets = ticketsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { ticketNumber, amount, vendorId } = req.body;
    const newTicket = { ticketNumber, amount, vendor: vendorId, date: new Date() };
    const ticketRef = await db.collection('tickets').add(newTicket);
    res.status(201).json({ id: ticketRef.id, ...newTicket });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

module.exports = { getTickets, createTicket };
