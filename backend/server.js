const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Import routes
const mailRoutes = require('./routes/mail');
const { sendContactEmail, sendWaitlistEmail } = require('./controllers/mailController');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Lotus Yoga Studio Backend API' });
});

// Mail routes
app.use('/api/mail', mailRoutes);

// Waitlist form submission
app.post('/api/waitlist', sendWaitlistEmail);

// Contact form submission
app.post('/api/contact', sendContactEmail);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});