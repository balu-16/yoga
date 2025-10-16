/**
 * Email Testing Script
 * 
 * This script tests the email sending functionality by making requests
 * to the email API endpoints and verifying the responses.
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3001';
const API_ENDPOINTS = {
  health: '/api/mail/health',
  test: '/api/mail/test',
  contact: '/api/mail/contact',
  collaboration: '/api/mail/collaboration',
  sendMail: '/api/mail/send-mail'
};

// Test data
const testContactData = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message from the email testing script.',
  interest: 'yoga-classes'
};

const testCollaborationData = {
  name: 'Test Partner',
  email: 'partner@testcompany.com',
  message: 'This is a test collaboration request from the email testing script.',
  company: 'Test Company Inc.',
  interest: 'corporate-wellness'
};

// Utility function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            data: parsedData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('\n🔍 Testing Health Check...');
  try {
    const response = await makeRequest('GET', API_ENDPOINTS.health);
    
    if (response.statusCode === 200) {
      console.log('✅ Health check passed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Health check failed');
      console.log('📊 Response:', response);
      return false;
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
    return false;
  }
}

async function testSMTPConfiguration() {
  console.log('\n🔧 Testing SMTP Configuration...');
  try {
    const response = await makeRequest('GET', API_ENDPOINTS.test);
    
    if (response.statusCode === 200) {
      console.log('✅ SMTP configuration test passed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('⚠️ SMTP configuration test failed (this is expected if password is not set)');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ SMTP configuration test error:', error.message);
    return false;
  }
}

async function testContactEmail() {
  console.log('\n📧 Testing Contact Email...');
  try {
    const response = await makeRequest('POST', API_ENDPOINTS.contact, testContactData);
    
    if (response.statusCode === 200) {
      console.log('✅ Contact email test passed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Contact email test failed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Contact email test error:', error.message);
    return false;
  }
}

async function testCollaborationEmail() {
  console.log('\n🤝 Testing Collaboration Email...');
  try {
    const response = await makeRequest('POST', API_ENDPOINTS.collaboration, testCollaborationData);
    
    if (response.statusCode === 200) {
      console.log('✅ Collaboration email test passed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Collaboration email test failed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Collaboration email test error:', error.message);
    return false;
  }
}

async function testGenericEmail() {
  console.log('\n📮 Testing Generic Email Endpoint...');
  try {
    const response = await makeRequest('POST', API_ENDPOINTS.sendMail, testContactData);
    
    if (response.statusCode === 200) {
      console.log('✅ Generic email test passed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Generic email test failed');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Generic email test error:', error.message);
    return false;
  }
}

async function testValidation() {
  console.log('\n🛡️ Testing Input Validation...');
  
  // Test missing required fields
  const invalidData = {
    name: 'Test User'
    // Missing email and message
  };
  
  try {
    const response = await makeRequest('POST', API_ENDPOINTS.contact, invalidData);
    
    if (response.statusCode === 400) {
      console.log('✅ Validation test passed (correctly rejected invalid data)');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Validation test failed (should have rejected invalid data)');
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Validation test error:', error.message);
    return false;
  }
}

async function testRateLimit() {
  console.log('\n⏱️ Testing Rate Limiting (sending multiple requests)...');
  
  const promises = [];
  for (let i = 0; i < 3; i++) {
    promises.push(makeRequest('POST', API_ENDPOINTS.contact, {
      ...testContactData,
      name: `Test User ${i + 1}`,
      message: `Test message ${i + 1} for rate limiting test.`
    }));
  }
  
  try {
    const responses = await Promise.all(promises);
    
    let successCount = 0;
    let rateLimitCount = 0;
    
    responses.forEach((response, index) => {
      if (response.statusCode === 200) {
        successCount++;
        console.log(`✅ Request ${index + 1}: Success`);
      } else if (response.statusCode === 429) {
        rateLimitCount++;
        console.log(`⚠️ Request ${index + 1}: Rate limited`);
      } else {
        console.log(`❌ Request ${index + 1}: Failed with status ${response.statusCode}`);
      }
    });
    
    console.log(`📊 Summary: ${successCount} successful, ${rateLimitCount} rate limited`);
    return true;
  } catch (error) {
    console.log('❌ Rate limit test error:', error.message);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Email System Tests...');
  console.log('=' .repeat(50));
  
  const results = {
    healthCheck: false,
    smtpConfig: false,
    contactEmail: false,
    collaborationEmail: false,
    genericEmail: false,
    validation: false,
    rateLimit: false
  };
  
  // Run tests
  results.healthCheck = await testHealthCheck();
  results.smtpConfig = await testSMTPConfiguration();
  results.contactEmail = await testContactEmail();
  results.collaborationEmail = await testCollaborationEmail();
  results.genericEmail = await testGenericEmail();
  results.validation = await testValidation();
  results.rateLimit = await testRateLimit();
  
  // Summary
  console.log('\n' + '=' .repeat(50));
  console.log('📋 TEST SUMMARY');
  console.log('=' .repeat(50));
  
  const testNames = {
    healthCheck: 'Health Check',
    smtpConfig: 'SMTP Configuration',
    contactEmail: 'Contact Email',
    collaborationEmail: 'Collaboration Email',
    genericEmail: 'Generic Email',
    validation: 'Input Validation',
    rateLimit: 'Rate Limiting'
  };
  
  let passedTests = 0;
  let totalTests = Object.keys(results).length;
  
  Object.entries(results).forEach(([key, passed]) => {
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`${testNames[key]}: ${status}`);
    if (passed) passedTests++;
  });
  
  console.log('\n' + '-' .repeat(50));
  console.log(`📊 Overall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Email system is working correctly.');
  } else if (passedTests >= totalTests - 1 && !results.smtpConfig) {
    console.log('⚠️ Most tests passed. SMTP config failed (likely due to missing password).');
    console.log('💡 Update the password in .env file to enable actual email sending.');
  } else {
    console.log('⚠️ Some tests failed. Please check the configuration and try again.');
  }
  
  console.log('\n📝 Notes:');
  console.log('- If SMTP test fails, update the password in .env file');
  console.log('- Contact and collaboration email tests will fail if SMTP is not configured');
  console.log('- Rate limiting is normal behavior to prevent spam');
  
  return results;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  runAllTests,
  testHealthCheck,
  testSMTPConfiguration,
  testContactEmail,
  testCollaborationEmail,
  testGenericEmail,
  testValidation,
  testRateLimit
};