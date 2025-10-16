# Email Integration Setup Guide

This guide explains how to set up and use the SMTP-based email sending functionality for contact and collaboration forms in your Lotus Yoga Studio application.

## 📁 File Structure

```
backend/
├── .env                              # Environment variables (SMTP credentials)
├── server.js                        # Main server file (updated with mail routes)
├── controllers/
│   └── mailController.js            # Email sending logic and templates
├── routes/
│   └── mail.js                      # Email API routes
├── examples/
│   └── frontend-email-integration.js # Frontend integration examples
└── EMAIL_INTEGRATION_README.md      # This file
```

## 🔧 Setup Instructions

### 1. Environment Configuration

Update the `.env` file with your actual SMTP credentials:

```env
# SMTP Configuration for Email Sending
SMTP_HOST=mail.nighatechglobal.com
SMTP_PORT=465
SMTP_USER=interns@nighatechglobal.com
SMTP_PASS=your_actual_password_here  # ⚠️ Replace with real password
SMTP_SECURE=true

# Server Configuration
PORT=3001

# Email Configuration
EMAIL_TO=interns@nighatechglobal.com
EMAIL_FROM=interns@nighatechglobal.com
```

**⚠️ Important:** Replace `your_actual_password_here` with the real password for the `interns@nighatechglobal.com` email account.

### 2. Dependencies

The following dependencies have been installed:
- `nodemailer` - For sending emails
- `dotenv` - For environment variable management

### 3. Server Integration

The mail routes have been integrated into `server.js`. The server will automatically load the email functionality when started.

## 🚀 API Endpoints

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/mail/contact` | Send contact form email |
| `POST` | `/api/mail/collaboration` | Send collaboration form email |
| `POST` | `/api/mail/send-mail` | Generic email sender (legacy) |
| `GET` | `/api/mail/test` | Test SMTP configuration |
| `GET` | `/api/mail/health` | Health check |

### Request Examples

#### Contact Form
```javascript
POST /api/mail/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in yoga classes.",
  "interest": "yoga-classes"
}
```

#### Collaboration Form
```javascript
POST /api/mail/collaboration
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "message": "We'd like to partner for corporate wellness programs.",
  "company": "Tech Corp",
  "interest": "corporate-wellness"
}
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon.",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "messageId": "<unique-message-id>"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Missing required fields: name, email, and message are required."
}
```

## 💻 Frontend Integration

### Basic JavaScript Example

```javascript
async function sendContactForm(formData) {
  try {
    const response = await fetch('http://localhost:3001/api/mail/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    alert('Message sent successfully!');
    return result;
  } catch (error) {
    alert('Error: ' + error.message);
    throw error;
  }
}

// Usage
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello, I am interested in yoga classes.',
  interest: 'yoga-classes'
};

sendContactForm(formData);
```

### React Hook Example

```javascript
function useEmailSender() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendContactForm = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/mail/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendContactForm, isLoading, error };
}
```

## 🔒 Security Features

- **Rate Limiting**: Maximum 5 emails per 15 minutes per IP address
- **Input Validation**: Required fields validation and email format checking
- **Input Sanitization**: Basic input cleaning to prevent issues
- **Environment Variables**: Sensitive credentials stored securely
- **Error Handling**: Comprehensive error handling with appropriate responses

## 🎨 Email Templates

The system generates beautiful HTML emails with:
- Professional styling with Lotus Yoga Studio branding
- Clear field labels and organized layout
- Responsive design
- Automatic timestamp inclusion
- Different templates for contact vs collaboration forms

## 🧪 Testing

### Test SMTP Configuration
```bash
curl -X GET http://localhost:3001/api/mail/test
```

### Test Health Check
```bash
curl -X GET http://localhost:3001/api/mail/health
```

### Test Contact Email
```bash
curl -X POST http://localhost:3001/api/mail/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message."
  }'
```

## 🚨 Troubleshooting

### Common Issues

1. **SMTP Test Fails**
   - Verify the password in `.env` file
   - Check firewall settings for port 465
   - Ensure SMTP credentials are correct

2. **Emails Not Sending**
   - Check server logs for detailed error messages
   - Verify internet connection
   - Confirm SMTP server is accessible

3. **Rate Limiting Errors**
   - Wait 15 minutes before trying again
   - Check if multiple requests are being sent

### Debug Mode

Set `NODE_ENV=development` in your `.env` file to see detailed error messages in API responses.

## 📝 Usage Notes

- All emails are sent to `interns@nighatechglobal.com`
- The system automatically determines email type based on the presence of company field
- HTML and plain text versions are sent for better compatibility
- Message IDs are returned for tracking purposes
- Timestamps are automatically added to all emails

## 🔄 Migration from Existing Forms

If you have existing contact forms, you can:

1. **Update form action**: Change form submission to use the new API endpoints
2. **Add error handling**: Implement proper success/error feedback
3. **Update validation**: Use the new validation requirements
4. **Test thoroughly**: Ensure all form fields are properly mapped

For detailed frontend integration examples, see `examples/frontend-email-integration.js`.