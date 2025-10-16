/**
 * Frontend Email Integration Examples
 * 
 * This file contains examples of how to integrate the new email API endpoints
 * into your frontend application for contact and collaboration forms.
 */

// Configuration
const API_BASE_URL = 'http://localhost:3001'; // Update this to your backend URL

/**
 * Send Contact Form Email
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.message - User's message
 * @param {string} [formData.interest] - User's interest (optional)
 * @returns {Promise<Object>} Response from the server
 */
async function sendContactEmail(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/mail/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        interest: formData.interest || ''
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}

/**
 * Send Collaboration Form Email
 * @param {Object} formData - Collaboration form data
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.message - User's message
 * @param {string} [formData.company] - User's company (optional)
 * @param {string} [formData.interest] - User's interest (optional)
 * @returns {Promise<Object>} Response from the server
 */
async function sendCollaborationEmail(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/mail/collaboration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        company: formData.company || '',
        interest: formData.interest || ''
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Error sending collaboration email:', error);
    throw error;
  }
}

/**
 * Generic Email Sender (Legacy Support)
 * Automatically determines if it's a contact or collaboration email based on company field
 * @param {Object} formData - Form data
 * @returns {Promise<Object>} Response from the server
 */
async function sendEmail(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/mail/send-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Example: Contact Form Handler
 */
function handleContactFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const contactData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    interest: formData.get('interest') || ''
  };

  // Show loading state
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  sendContactEmail(contactData)
    .then(result => {
      // Success
      alert('Thank you! Your message has been sent successfully.');
      event.target.reset(); // Clear the form
      console.log('Email sent:', result);
    })
    .catch(error => {
      // Error
      alert('Sorry, there was an error sending your message. Please try again.');
      console.error('Failed to send email:', error);
    })
    .finally(() => {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

/**
 * Example: Collaboration Form Handler
 */
function handleCollaborationFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const collaborationData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    company: formData.get('company') || '',
    interest: formData.get('interest') || ''
  };

  // Show loading state
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  sendCollaborationEmail(collaborationData)
    .then(result => {
      // Success
      alert('Thank you! Your collaboration request has been sent successfully.');
      event.target.reset(); // Clear the form
      console.log('Collaboration email sent:', result);
    })
    .catch(error => {
      // Error
      alert('Sorry, there was an error sending your request. Please try again.');
      console.error('Failed to send collaboration email:', error);
    })
    .finally(() => {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

/**
 * Example: React Hook for Email Sending
 */
function useEmailSender() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const sendContactForm = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await sendContactEmail(formData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendCollaborationForm = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await sendCollaborationEmail(formData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendContactForm,
    sendCollaborationForm,
    isLoading,
    error
  };
}

/**
 * Example: HTML Form Setup
 */
const contactFormHTML = `
<form id="contact-form" onsubmit="handleContactFormSubmit(event)">
  <div>
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div>
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div>
    <label for="interest">Interest</label>
    <select id="interest" name="interest">
      <option value="">Select your interest</option>
      <option value="yoga-classes">Yoga Classes</option>
      <option value="meditation">Meditation</option>
      <option value="workshops">Workshops</option>
      <option value="teacher-training">Teacher Training</option>
      <option value="other">Other</option>
    </select>
  </div>
  
  <div>
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  
  <button type="submit">Send Message</button>
</form>
`;

const collaborationFormHTML = `
<form id="collaboration-form" onsubmit="handleCollaborationFormSubmit(event)">
  <div>
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div>
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div>
    <label for="company">Company</label>
    <input type="text" id="company" name="company">
  </div>
  
  <div>
    <label for="interest">Collaboration Type</label>
    <select id="interest" name="interest">
      <option value="">Select collaboration type</option>
      <option value="partnership">Partnership</option>
      <option value="event-hosting">Event Hosting</option>
      <option value="workshop-collaboration">Workshop Collaboration</option>
      <option value="corporate-wellness">Corporate Wellness</option>
      <option value="other">Other</option>
    </select>
  </div>
  
  <div>
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="5" required placeholder="Tell us about your collaboration idea..."></textarea>
  </div>
  
  <button type="submit">Send Collaboration Request</button>
</form>
`;

// Export functions for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sendContactEmail,
    sendCollaborationEmail,
    sendEmail,
    handleContactFormSubmit,
    handleCollaborationFormSubmit,
    useEmailSender
  };
}