const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const menuRoutes = require('./routes/menuRoutes');
const privilegeRoutes = require('./routes/privilegeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Connect the routes
app.use('/auth', authRoutes);
app.use('/vendors', vendorRoutes);
app.use('/payments', paymentRoutes);
app.use('/menu', menuRoutes);
app.use('/privileges', privilegeRoutes);
app.use('/admin', adminRoutes);
app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
