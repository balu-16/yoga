const express = require('express');
const router = express.Router();
const { sendContactEmail, sendCollaborationEmail, testEmailConfig } = require('../controllers/mailController');

// Middleware for request validation
const validateEmailRequest = (req, res, next) => {
  const { name, email, message } = req.body;
  
  // Check if required fields are present
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, and message are required.'
    });
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }
  
  // Sanitize inputs (basic)
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.message = message.trim();
  
  if (req.body.company) {
    req.body.company = req.body.company.trim();
  }
  
  if (req.body.interest) {
    req.body.interest = req.body.interest.trim();
  }
  
  next();
};

// Rate limiting middleware (basic implementation)
const rateLimitMap = new Map();
const rateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 emails per 15 minutes per IP
  
  if (!rateLimitMap.has(clientIP)) {
    rateLimitMap.set(clientIP, []);
  }
  
  const requests = rateLimitMap.get(clientIP);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Too many email requests. Please try again later.'
    });
  }
  
  validRequests.push(now);
  rateLimitMap.set(clientIP, validRequests);
  
  next();
};

// Routes

/**
 * POST /api/mail/contact
 * Send contact form email
 * Body: { name, email, message, interest? }
 */
router.post('/contact', validateEmailRequest, rateLimit, sendContactEmail);

/**
 * POST /api/mail/collaboration
 * Send collaboration form email
 * Body: { name, email, message, company?, interest? }
 */
router.post('/collaboration', validateEmailRequest, rateLimit, sendCollaborationEmail);

/**
 * POST /api/mail/send-mail (legacy route for backward compatibility)
 * Generic email sending route that determines type based on presence of company field
 */
router.post('/send-mail', validateEmailRequest, rateLimit, (req, res) => {
  // If company field is present, treat as collaboration request
  if (req.body.company) {
    return sendCollaborationEmail(req, res);
  } else {
    return sendContactEmail(req, res);
  }
});

/**
 * GET /api/mail/test
 * Test SMTP configuration
 */
router.get('/test', testEmailConfig);

/**
 * GET /api/mail/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Mail service is running',
    timestamp: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }),
    endpoints: {
      contact: 'POST /api/mail/contact',
      collaboration: 'POST /api/mail/collaboration',
      sendMail: 'POST /api/mail/send-mail',
      test: 'GET /api/mail/test'
    }
  });
});

module.exports = router;