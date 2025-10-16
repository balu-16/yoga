const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🔧 SMTP Debug Test');
console.log('==================');

// Display current environment variables
console.log('📋 Environment Variables:');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');
console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('EMAIL_TO:', process.env.EMAIL_TO);
console.log('');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true, // Enable debug output
  logger: true // Enable logging
});

async function testSMTPConnection() {
  console.log('🔍 Testing SMTP Connection...');
  
  try {
    // Test connection
    console.log('⏳ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Test sending a real email
    console.log('📧 Attempting to send test email...');
    const testEmail = {
      from: `"Lotus Yoga Studio Test" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: '🧘‍♀️ SMTP Test Email - ' + new Date().toLocaleString(),
      html: `
        <h2>🧘‍♀️ SMTP Test Successful!</h2>
        <p>This is a test email to verify that the SMTP configuration is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>From:</strong> ${process.env.EMAIL_FROM}</p>
        <p><strong>To:</strong> ${process.env.EMAIL_TO}</p>
        <hr>
        <p><em>This email was sent from the Lotus Yoga Studio backend email system.</em></p>
      `
    };
    
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Response:', info.response);
    
    return true;
    
  } catch (error) {
    console.log('❌ SMTP Test Failed!');
    console.log('🔍 Error Type:', error.constructor.name);
    console.log('📝 Error Message:', error.message);
    console.log('🔧 Error Code:', error.code);
    console.log('🌐 Error Command:', error.command);
    
    if (error.response) {
      console.log('📧 Server Response:', error.response);
    }
    
    // Provide specific troubleshooting advice
    if (error.code === 'EAUTH') {
      console.log('💡 Authentication failed - check username/password');
    } else if (error.code === 'ECONNECTION') {
      console.log('💡 Connection failed - check host/port/firewall');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('💡 Connection timeout - check network/firewall');
    } else if (error.code === 'ENOTFOUND') {
      console.log('💡 Host not found - check SMTP_HOST setting');
    }
    
    return false;
  }
}

// Run the test
testSMTPConnection().then((success) => {
  if (success) {
    console.log('');
    console.log('🎉 SMTP Configuration is working perfectly!');
    console.log('📧 Check your email inbox:', process.env.EMAIL_TO);
  } else {
    console.log('');
    console.log('⚠️ SMTP Configuration needs attention.');
    console.log('📝 Please review the error details above and fix the configuration.');
  }
  
  process.exit(success ? 0 : 1);
});