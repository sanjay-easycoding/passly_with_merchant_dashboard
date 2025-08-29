/**
 * Jest global teardown file
 * This file runs once after all test suites
 */

module.exports = async () => {
  // Clean up global test environment
  process.env.NODE_ENV = 'development';
  
  // Clear any test-specific environment variables
  delete process.env.NEXT_PUBLIC_API_URL;
  delete process.env.NEXT_PUBLIC_DEBUG_MODE;
  delete process.env.NEXT_PUBLIC_ENABLE_ANALYTICS;
  delete process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING;
  delete process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING;
  
  // Clear mock environment variables
  delete process.env.NEXT_PUBLIC_APP_NAME;
  delete process.env.NEXT_PUBLIC_APP_VERSION;
  delete process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  delete process.env.NEXT_PUBLIC_SUPPORTED_LOCALES;
  
  // Clear security configuration
  delete process.env.NEXT_PUBLIC_MAX_FILE_SIZE;
  delete process.env.NEXT_PUBLIC_RATE_LIMIT_REQUESTS;
  delete process.env.NEXT_PUBLIC_SESSION_TIMEOUT;
  
  // Clear performance configuration
  delete process.env.NEXT_PUBLIC_IMAGE_QUALITY;
  delete process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS;
  delete process.env.NEXT_PUBLIC_ENABLE_RESOURCE_TIMING;
  delete process.env.NEXT_PUBLIC_ENABLE_LONG_TASK_MONITORING;
  
  // Clear development configuration
  delete process.env.NEXT_PUBLIC_MOCK_DATA;
  delete process.env.NEXT_PUBLIC_MOCK_DELAY;
  delete process.env.NEXT_PUBLIC_LOG_LEVEL;
  delete process.env.NEXT_PUBLIC_ENABLE_CONSOLE_LOGGING;
  
  // Clear production configuration
  delete process.env.NEXT_PUBLIC_ENABLE_CSP;
  delete process.env.NEXT_PUBLIC_ENABLE_HSTS;
  delete process.env.NEXT_PUBLIC_ENABLE_X_FRAME_OPTIONS;
  delete process.env.NEXT_PUBLIC_ENABLE_X_CONTENT_TYPE_OPTIONS;
  delete process.env.NEXT_PUBLIC_ENABLE_REFERRER_POLICY;
  
  // Clear monitoring configuration
  delete process.env.NEXT_PUBLIC_SENTRY_DSN;
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  delete process.env.NEXT_PUBLIC_ENABLE_RUM;
  delete process.env.NEXT_PUBLIC_ENABLE_SYNTHETIC_MONITORING;
  delete process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING;
  
  console.log('🧹 Jest global teardown completed');
};
