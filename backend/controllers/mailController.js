const nodemailer = require('nodemailer');
require('dotenv').config();

// Helper function to get IST timestamp
const getISTTimestamp = () => {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

// Create SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
};

// Generate HTML email template
const generateEmailHTML = (data, type = 'contact') => {
  const { name, email, message, company, interest } = data;
  
  // Map interest values to display names for contact form
  const contactInterestMap = {
    'yoga-online': 'Yoga — 1:1 Online',
    'yoga-inperson': 'Yoga — In‑person (Brisbane)',
    'lotus': 'Lotus — Clothing / Lookbook',
    'studio': 'Studio — Collaboration',
    'other': 'Other'
  };

  const interestDisplay = type === 'contact' && interest ? 
    (contactInterestMap[interest] || interest) : interest;

  const isContact = type === 'contact';
  const isCollaboration = type === 'collaboration';
  
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New ${isContact ? 'Contact & Booking' : 'Collaboration'} Request - Lotus Yoga Studio</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background: #f5f5f5; 
        }
        .container { 
          max-width: 600px; 
          margin: 20px auto; 
          background: white; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
        }
        .header { 
          background: ${isContact ? 
            'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #22c55e 100%)' : 
            'linear-gradient(135deg, #8b5cf6 0%, #22c55e 100%)'
          }; 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: 600; 
        }
        .header p { 
          margin: 8px 0 0 0; 
          opacity: 0.9; 
          font-size: 14px; 
        }
        .content { 
          padding: 30px; 
        }
        .field { 
          margin-bottom: 20px; 
        }
        .label { 
          font-weight: 600; 
          color: #555; 
          font-size: 14px; 
          margin-bottom: 8px; 
          display: flex; 
          align-items: center; 
        }
        .label .emoji { 
          margin-right: 8px; 
          font-size: 16px; 
        }
        .value { 
          background: #f8fafc; 
          padding: 15px; 
          border-radius: 8px; 
          border-left: 4px solid ${isContact ? '#3b82f6' : '#8b5cf6'}; 
          font-size: 15px; 
          word-wrap: break-word;
        }
        .interest-badge { 
          background: ${isContact ? 
            'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 
            'linear-gradient(135deg, #8b5cf6, #22c55e)'
          }; 
          color: white; 
          padding: 8px 16px; 
          border-radius: 20px; 
          display: inline-block; 
          font-weight: 500; 
          font-size: 14px; 
        }
        .message-box { 
          background: #f8fafc; 
          padding: 20px; 
          border-radius: 8px; 
          border-left: 4px solid ${isContact ? '#3b82f6' : '#8b5cf6'}; 
          font-size: 15px; 
          line-height: 1.6;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer { 
          background: #f8fafc; 
          padding: 20px; 
          text-align: center; 
          color: #666; 
          font-size: 12px; 
          border-top: 1px solid #e2e8f0; 
        }
        .priority-note { 
          background: ${isContact ? '#dbeafe' : '#fef3c7'}; 
          border: 1px solid ${isContact ? '#3b82f6' : '#f59e0b'}; 
          border-radius: 8px; 
          padding: 15px; 
          margin-top: 20px; 
        }
        .priority-note strong { 
          color: ${isContact ? '#1e40af' : '#92400e'}; 
        }
        .contact-info { 
          background: #ecfdf5; 
          border: 1px solid #22c55e; 
          border-radius: 8px; 
          padding: 15px; 
          margin-top: 20px; 
        }
        .contact-info strong { 
          color: #166534; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isContact ? '📞 New Contact & Booking Request!' : '🤝 New Collaboration Request!'}</h1>
          <p>${isContact ? 
            'Someone wants to connect about yoga sessions or bookings' : 
            'A potential collaboration partner has reached out'
          }</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label"><span class="emoji">👤</span>Full Name:</div>
            <div class="value">${name || 'Not provided'}</div>
          </div>
          
          <div class="field">
            <div class="label"><span class="emoji">📧</span>Email Address:</div>
            <div class="value">${email || 'Not provided'}</div>
          </div>`;

  if (company) {
    htmlContent += `
          <div class="field">
            <div class="label"><span class="emoji">🏢</span>Company:</div>
            <div class="value">${company}</div>
          </div>`;
  }

  if (interest) {
    htmlContent += `
          <div class="field">
            <div class="label"><span class="emoji">${isContact ? '🎯' : '💡'}</span>${isContact ? 'Interest Area:' : 'Collaboration Type:'}</div>
            <div class="value">
              <span class="interest-badge">${interestDisplay}</span>
            </div>
          </div>`;
  }

  if (message) {
    htmlContent += `
          <div class="field">
            <div class="label"><span class="emoji">💬</span>${isContact ? 'Goals & Request:' : 'Collaboration Details:'}</div>
            <div class="message-box">${message}</div>
          </div>`;
  }

  htmlContent += `
          <div class="field">
            <div class="label"><span class="emoji">⏰</span>Submitted At:</div>
            <div class="value">${new Date().toLocaleString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              timeZone: 'Asia/Kolkata',
              timeZoneName: 'short'
            })}</div>
          </div>`;

  if (isContact) {
    htmlContent += `
          <div class="priority-note">
            <strong>📋 Next Steps:</strong> This is a ${interestDisplay || 'general'} inquiry. ${
              interest === 'yoga-online' ? 'Schedule a 1:1 online yoga session.' :
              interest === 'yoga-inperson' ? 'Coordinate an in-person session in Brisbane.' :
              interest === 'lotus' ? 'Share the latest clothing drops and lookbook.' :
              interest === 'studio' ? 'Discuss collaboration opportunities.' :
              'Follow up based on their specific needs.'
            }
          </div>
          
          <div class="contact-info">
            <strong>📞 Reply within 24 hours</strong> as promised on the website. Use the contact details above to respond directly.
          </div>`;
  } else {
    htmlContent += `
          <div class="priority-note">
            <strong>🤝 Collaboration Opportunity:</strong> Review this ${interestDisplay || 'collaboration'} request and consider the potential partnership benefits.
          </div>`;
  }

  htmlContent += `
        </div>
        
        <div class="footer">
          <p>This email was automatically generated from the Lotus Yoga Studio ${isContact ? 'Contact & Bookings' : 'collaboration'} form.</p>
          <p>${isContact ? 'Trusted • Familiar • Community‑first' : 'Building meaningful partnerships'}</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return htmlContent;
};

// Send contact form email
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message, interest } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: `"Lotus Yoga Studio" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: generateEmailHTML({ name, email, message, interest }, 'contact'),
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Interest: ${interest || 'Not specified'}
        Message: ${message}
        
        Submitted at: ${new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          timeZoneName: 'short'
        })}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Contact email sent successfully:', {
      messageId: info.messageId,
      from: name,
      email: email,
      timestamp: getISTTimestamp()
    });

    res.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: { name, email, messageId: info.messageId }
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Send collaboration email
const sendCollaborationEmail = async (req, res) => {
  try {
    const { name, email, message, company, interest } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: `"Lotus Yoga Studio" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Collaboration Request from ${name}${company ? ` (${company})` : ''}`,
      html: generateEmailHTML({ name, email, message, company, interest }, 'collaboration'),
      text: `
        New Collaboration Request
        
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not specified'}
        Interest: ${interest || 'Not specified'}
        Message: ${message}
        
        Submitted at: ${new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          timeZoneName: 'short'
        })}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Collaboration email sent successfully:', {
      messageId: info.messageId,
      from: name,
      email: email,
      company: company,
      timestamp: getISTTimestamp()
    });

    res.json({
      success: true,
      message: 'Your collaboration request has been sent successfully! We will review it and get back to you soon.',
      data: { name, email, company, messageId: info.messageId }
    });

  } catch (error) {
    console.error('Error sending collaboration email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Test email configuration
const testEmailConfig = async (req, res) => {
  try {
    const transporter = createTransporter();
    
    // Verify SMTP connection
    await transporter.verify();
    
    res.json({
      success: true,
      message: 'SMTP configuration is valid and ready to send emails.'
    });
    
  } catch (error) {
    console.error('SMTP configuration test failed:', error);
    res.status(500).json({
      success: false,
      message: 'SMTP configuration test failed.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Send waitlist email
const sendWaitlistEmail = async (req, res) => {
  try {
    const { name, email, interest } = req.body;

    // Validate required fields
    if (!name || !email || !interest) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and interest are required fields.'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Map interest values to display names
    const interestMap = {
      'lotus': 'Lotus — Clothing Drops',
      'yoga': 'Yoga — 1:1 with Lavanya',
      'studio': 'Studio — Music & Podcasts',
      'all': 'All of it!'
    };

    const interestDisplay = interestMap[interest] || interest;

    // Generate beautiful HTML content for waitlist
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Waitlist Submission - Lotus Yoga Studio</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #8b5cf6 0%, #22c55e 100%); color: white; padding: 30px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
          .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 30px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #555; font-size: 14px; margin-bottom: 8px; display: flex; align-items: center; }
          .label .emoji { margin-right: 8px; font-size: 16px; }
          .value { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6; font-size: 15px; }
          .interest-badge { background: linear-gradient(135deg, #8b5cf6, #22c55e); color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: 500; font-size: 14px; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e2e8f0; }
          .priority-note { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-top: 20px; }
          .priority-note strong { color: #92400e; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🧘‍♀️ New Waitlist Member!</h1>
            <p>Someone just joined the Lotus Yoga Studio waitlist</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label"><span class="emoji">👤</span>Full Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label"><span class="emoji">📧</span>Email Address:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label"><span class="emoji">💫</span>Primary Interest:</div>
              <div class="value">
                <span class="interest-badge">${interestDisplay}</span>
              </div>
            </div>
            
            <div class="field">
              <div class="label"><span class="emoji">⏰</span>Joined At:</div>
              <div class="value">${new Date().toLocaleString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZone: 'Asia/Kolkata',
                timeZoneName: 'short'
              })}</div>
            </div>

            <div class="priority-note">
              <strong>🎯 Action Required:</strong> This person is interested in <strong>${interestDisplay}</strong> and should receive priority notifications for related drops and bookings.
            </div>
          </div>
          
          <div class="footer">
            <p>This email was automatically generated from the Lotus Yoga Studio waitlist form.</p>
            <p>Early drops • Priority booking • Giveaways</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `"Lotus Yoga Studio" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `🧘‍♀️ New Waitlist Member: ${name} (${interestDisplay})`,
      html: htmlContent,
      text: `
        New Waitlist Subscription - Lotus Yoga Studio
        
        Name: ${name}
        Email: ${email}
        Primary Interest: ${interestDisplay}
        
        Joined at: ${new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          timeZoneName: 'short'
        })}
        
        Action Required: This person should receive priority notifications for ${interestDisplay}.
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Waitlist email sent successfully:', {
      messageId: info.messageId,
      name: name,
      email: email,
      interest: interestDisplay,
      timestamp: getISTTimestamp()
    });

    res.json({
      success: true,
      message: 'Successfully joined the waitlist! We will notify you when spots become available.',
      data: { name, email, interest: interestDisplay, messageId: info.messageId }
    });

  } catch (error) {
    console.error('Error sending waitlist email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to join waitlist. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  sendContactEmail,
  sendCollaborationEmail,
  sendWaitlistEmail,
  testEmailConfig
};