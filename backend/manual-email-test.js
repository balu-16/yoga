/**
 * Manual Email Test Script
 * 
 * This script allows you to manually test email sending with real data.
 * Run this after updating the password in .env file.
 */

const http = require('http');

// Test data - you can modify these
const testData = {
  contact: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'Hello! I am interested in joining your yoga classes. Could you please provide more information about beginner-friendly sessions?',
    interest: 'yoga-classes'
  },
  collaboration: {
    name: 'Sarah Wilson',
    email: 'sarah@wellnesscompany.com',
    message: 'We are interested in partnering with Lotus Yoga Studio for corporate wellness programs. We have 200+ employees who would benefit from yoga sessions.',
    company: 'Wellness Company Inc.',
    interest: 'corporate-wellness'
  }
};

function sendTestEmail(endpoint, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: `/api/mail/${endpoint}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve({ statusCode: res.statusCode, data: result });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function testContactEmail() {
  console.log('📧 Testing Contact Email...');
  console.log('Data being sent:', JSON.stringify(testData.contact, null, 2));
  console.log('-'.repeat(50));
  
  try {
    const result = await sendTestEmail('contact', testData.contact);
    
    if (result.statusCode === 200) {
      console.log('✅ SUCCESS! Contact email sent successfully.');
      console.log('📧 Email details:', JSON.stringify(result.data, null, 2));
    } else {
      console.log('❌ FAILED! Contact email could not be sent.');
      console.log('📧 Error details:', JSON.stringify(result.data, null, 2));
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
  
  console.log('\n');
}

async function testCollaborationEmail() {
  console.log('🤝 Testing Collaboration Email...');
  console.log('Data being sent:', JSON.stringify(testData.collaboration, null, 2));
  console.log('-'.repeat(50));
  
  try {
    const result = await sendTestEmail('collaboration', testData.collaboration);
    
    if (result.statusCode === 200) {
      console.log('✅ SUCCESS! Collaboration email sent successfully.');
      console.log('📧 Email details:', JSON.stringify(result.data, null, 2));
    } else {
      console.log('❌ FAILED! Collaboration email could not be sent.');
      console.log('📧 Error details:', JSON.stringify(result.data, null, 2));
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
  
  console.log('\n');
}

async function checkSMTPConfig() {
  console.log('🔧 Checking SMTP Configuration...');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/mail/test',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (res.statusCode === 200) {
            console.log('✅ SMTP Configuration is valid!');
            resolve(true);
          } else {
            console.log('❌ SMTP Configuration failed:', result.message);
            console.log('💡 Please check your .env file and ensure the password is correct.');
            resolve(false);
          }
        } catch (error) {
          console.log('❌ Error checking SMTP:', responseData);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Connection error:', error.message);
      console.log('💡 Make sure the server is running on http://localhost:3001');
      resolve(false);
    });

    req.end();
  });
}

async function runManualTests() {
  console.log('🚀 Manual Email Testing');
  console.log('='.repeat(60));
  console.log('This script will test actual email sending.');
  console.log('Make sure you have updated the password in .env file!\n');
  
  // Check SMTP configuration first
  const smtpValid = await checkSMTPConfig();
  console.log('\n');
  
  if (!smtpValid) {
    console.log('⚠️ SMTP configuration is not valid. Email tests will likely fail.');
    console.log('📝 To fix this:');
    console.log('   1. Open the .env file');
    console.log('   2. Replace "your_password_here" with the actual password');
    console.log('   3. Save the file and restart the server');
    console.log('   4. Run this test again\n');
  }
  
  // Test contact email
  await testContactEmail();
  
  // Wait a bit to avoid rate limiting
  console.log('⏳ Waiting 2 seconds to avoid rate limiting...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test collaboration email
  await testCollaborationEmail();
  
  console.log('✨ Manual testing completed!');
  console.log('📧 If emails were sent successfully, check interns@nighatechglobal.com');
}

// Instructions
function showInstructions() {
  console.log('📋 INSTRUCTIONS:');
  console.log('1. Make sure the backend server is running (npm start)');
  console.log('2. Update the password in .env file');
  console.log('3. Run: node manual-email-test.js');
  console.log('4. Check the email inbox: interns@nighatechglobal.com\n');
}

// Run the test
if (require.main === module) {
  showInstructions();
  runManualTests().catch(console.error);
}

module.exports = {
  testContactEmail,
  testCollaborationEmail,
  checkSMTPConfig,
  runManualTests
};