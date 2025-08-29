/**
 * Jest global setup file
 * This file runs once before all test suites
 */

module.exports = async () => {
  // Set up global test environment variables
  process.env.NODE_ENV = 'test';
  process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001/api';
  process.env.NEXT_PUBLIC_DEBUG_MODE = 'false';
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS = 'false';
  process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING = 'false';
  process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING = 'false';
  
  // Mock environment variables for testing
  process.env.NEXT_PUBLIC_APP_NAME = 'Passly Test';
  process.env.NEXT_PUBLIC_APP_VERSION = '1.0.0-test';
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE = 'en';
  process.env.NEXT_PUBLIC_SUPPORTED_LOCALES = 'en,de';
  
  // Security configuration for testing
  process.env.NEXT_PUBLIC_MAX_FILE_SIZE = '1048576'; // 1MB
  process.env.NEXT_PUBLIC_RATE_LIMIT_REQUESTS = '1000';
  process.env.NEXT_PUBLIC_SESSION_TIMEOUT = '300000'; // 5 minutes
  
  // Performance configuration for testing
  process.env.NEXT_PUBLIC_IMAGE_QUALITY = '50';
  process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS = 'false';
  process.env.NEXT_PUBLIC_ENABLE_RESOURCE_TIMING = 'false';
  process.env.NEXT_PUBLIC_ENABLE_LONG_TASK_MONITORING = 'false';
  
  // Development configuration for testing
  process.env.NEXT_PUBLIC_MOCK_DATA = 'true';
  process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
  process.env.NEXT_PUBLIC_LOG_LEVEL = 'error';
  process.env.NEXT_PUBLIC_ENABLE_CONSOLE_LOGGING = 'false';
  
  // Production configuration for testing
  process.env.NEXT_PUBLIC_ENABLE_CSP = 'false';
  process.env.NEXT_PUBLIC_ENABLE_HSTS = 'false';
  process.env.NEXT_PUBLIC_ENABLE_X_FRAME_OPTIONS = 'false';
  process.env.NEXT_PUBLIC_ENABLE_X_CONTENT_TYPE_OPTIONS = 'false';
  process.env.NEXT_PUBLIC_ENABLE_REFERRER_POLICY = 'false';
  
  // Monitoring configuration for testing
  process.env.NEXT_PUBLIC_SENTRY_DSN = '';
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = '';
  process.env.NEXT_PUBLIC_ENABLE_RUM = 'false';
  process.env.NEXT_PUBLIC_ENABLE_SYNTHETIC_MONITORING = 'false';
  process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING = 'false';
  
  console.log('🧪 Jest global setup completed');
};
