/**
 * Environment configuration for enterprise-level deployment
 * This file centralizes all configuration values and provides type safety
 */

import type { EnvironmentConfig, SecurityConfig, LocalizationConfig } from '@/types';

/**
 * Environment detection
 */
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

/**
 * Environment configuration
 */
export const environmentConfig: EnvironmentConfig = {
  isDevelopment,
  isProduction,
  isTest,
  
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 
    (isDevelopment ? 'http://localhost:3001/api' : 'https://api.passly.com'),
  
  // CDN Configuration
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || 
    (isDevelopment ? 'http://localhost:3002' : 'https://cdn.passly.com'),
  
  // Analytics Configuration
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true' || isProduction,
  
  // Debug Configuration
  debugMode: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true' || isDevelopment,
};

/**
 * Security configuration
 */
export const securityConfig: SecurityConfig = {
  // File upload limits
  maxFileSize: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '2097152'), // 2MB default
  
  // Allowed file types
  allowedFileTypes: (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 'image/png,image/jpeg,image/svg+xml')
    .split(','),
  
  // Rate limiting
  rateLimitRequests: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_REQUESTS || '100'),
  rateLimitWindow: parseInt(process.env.NEXT_PUBLIC_RATE_LIMIT_WINDOW || '60000'), // 1 minute
  
  // Session timeout
  sessionTimeout: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '1800000'), // 30 minutes
};

/**
 * Localization configuration
 */
export const localizationConfig: LocalizationConfig = {
  defaultLocale: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as 'en' | 'de') || 'en',
  supportedLocales: (process.env.NEXT_PUBLIC_SUPPORTED_LOCALES || 'en,de').split(',') as ('en' | 'de')[],
  fallbackLocale: (process.env.NEXT_PUBLIC_FALLBACK_LOCALE as 'en' | 'de') || 'en',
};

/**
 * Feature flags configuration
 */
export const featureFlags = {
  // Enable/disable specific features
  enablePassBuilder: process.env.NEXT_PUBLIC_ENABLE_PASS_BUILDER !== 'false',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false',
  enablePerformanceMonitoring: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING !== 'false',
  enableErrorReporting: process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING !== 'false',
  
  // Development features
  enableDebugMode: isDevelopment && process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  enablePerformanceProfiling: isDevelopment && process.env.NEXT_PUBLIC_PERFORMANCE_PROFILING === 'true',
  enableMockData: isDevelopment && process.env.NEXT_PUBLIC_MOCK_DATA === 'true',
};

/**
 * Performance configuration
 */
export const performanceConfig = {
  // Image optimization
  imageQuality: parseInt(process.env.NEXT_PUBLIC_IMAGE_QUALITY || '75'),
  imageFormats: (process.env.NEXT_PUBLIC_IMAGE_FORMATS || 'webp,avif,jpeg').split(','),
  
  // Bundle optimization
  enableBundleAnalyzer: process.env.NEXT_PUBLIC_BUNDLE_ANALYZER === 'true',
  enableCompression: process.env.NEXT_PUBLIC_COMPRESSION !== 'false',
  
  // Caching
  cacheMaxAge: parseInt(process.env.NEXT_PUBLIC_CACHE_MAX_AGE || '31536000'), // 1 year
  enableServiceWorker: process.env.NEXT_PUBLIC_SERVICE_WORKER === 'true',
};

/**
 * API configuration
 */
export const apiConfig = {
  // Base configuration
  baseURL: environmentConfig.apiUrl,
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'), // 10 seconds
  
  // Retry configuration
  maxRetries: parseInt(process.env.NEXT_PUBLIC_API_MAX_RETRIES || '3'),
  retryDelay: parseInt(process.env.NEXT_PUBLIC_API_RETRY_DELAY || '1000'), // 1 second
  
  // Authentication
  enableAuth: process.env.NEXT_PUBLIC_ENABLE_AUTH !== 'false',
  tokenRefreshThreshold: parseInt(process.env.NEXT_PUBLIC_TOKEN_REFRESH_THRESHOLD || '300000'), // 5 minutes
  
  // Headers
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Version': process.env.NEXT_PUBLIC_CLIENT_VERSION || '1.0.0',
  },
};

/**
 * Monitoring and analytics configuration
 */
export const monitoringConfig = {
  // Error reporting
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    tracesSampleRate: parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  },
  
  // Analytics
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    enableDebugMode: isDevelopment,
  },
  
  // Performance monitoring
  performance: {
    enableWebVitals: process.env.NEXT_PUBLIC_ENABLE_WEB_VITALS !== 'false',
    enableResourceTiming: process.env.NEXT_PUBLIC_ENABLE_RESOURCE_TIMING !== 'false',
    enableLongTaskMonitoring: process.env.NEXT_PUBLIC_ENABLE_LONG_TASK_MONITORING !== 'false',
  },
};

/**
 * Validation configuration
 */
export const validationConfig = {
  // Input validation
  maxInputLength: {
    campaignName: parseInt(process.env.NEXT_PUBLIC_MAX_CAMPAIGN_NAME_LENGTH || '100'),
    tagline: parseInt(process.env.NEXT_PUBLIC_MAX_TAGLINE_LENGTH || '200'),
    rewardDescription: parseInt(process.env.NEXT_PUBLIC_MAX_REWARD_DESCRIPTION_LENGTH || '500'),
    businessAddress: parseInt(process.env.NEXT_PUBLIC_MAX_BUSINESS_ADDRESS_LENGTH || '500'),
    welcomeMessage: parseInt(process.env.NEXT_PUBLIC_MAX_WELCOME_MESSAGE_LENGTH || '1000'),
    instructions: parseInt(process.env.NEXT_PUBLIC_MAX_INSTRUCTIONS_LENGTH || '1000'),
    specialOffers: parseInt(process.env.NEXT_PUBLIC_MAX_SPECIAL_OFFERS_LENGTH || '1000'),
  },
  
  // Numeric validation
  stampsRange: {
    min: parseInt(process.env.NEXT_PUBLIC_MIN_STAMPS || '1'),
    max: parseInt(process.env.NEXT_PUBLIC_MAX_STAMPS || '20'),
  },
  
  // Color validation
  colorValidation: {
    enableHexValidation: process.env.NEXT_PUBLIC_ENABLE_COLOR_VALIDATION !== 'false',
    allowedColorFormats: (process.env.NEXT_PUBLIC_ALLOWED_COLOR_FORMATS || 'hex,rgb,hsl').split(','),
  },
};

/**
 * Development configuration
 */
export const developmentConfig = {
  // Mock data
  mockData: {
    enable: isDevelopment && process.env.NEXT_PUBLIC_MOCK_DATA === 'true',
    delay: parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY || '500'), // 500ms delay
  },
  
  // Debug tools
  debugTools: {
    enableReduxDevTools: isDevelopment && process.env.NEXT_PUBLIC_REDUX_DEVTOOLS !== 'false',
    enableReactDevTools: isDevelopment && process.env.NEXT_PUBLIC_REACT_DEVTOOLS !== 'false',
    enablePerformanceProfiling: isDevelopment && process.env.NEXT_PUBLIC_PERFORMANCE_PROFILING === 'true',
  },
  
  // Logging
  logging: {
    level: process.env.NEXT_PUBLIC_LOG_LEVEL || (isDevelopment ? 'debug' : 'error'),
    enableConsoleLogging: isDevelopment || process.env.NEXT_PUBLIC_ENABLE_CONSOLE_LOGGING === 'true',
    enableRemoteLogging: isProduction && process.env.NEXT_PUBLIC_ENABLE_REMOTE_LOGGING === 'true',
  },
};

/**
 * Production configuration
 */
export const productionConfig = {
  // Security headers
  securityHeaders: {
    enableCSP: process.env.NEXT_PUBLIC_ENABLE_CSP !== 'false',
    enableHSTS: process.env.NEXT_PUBLIC_ENABLE_HSTS !== 'false',
    enableXFrameOptions: process.env.NEXT_PUBLIC_ENABLE_X_FRAME_OPTIONS !== 'false',
    enableXContentTypeOptions: process.env.NEXT_PUBLIC_ENABLE_X_CONTENT_TYPE_OPTIONS !== 'false',
    enableReferrerPolicy: process.env.NEXT_PUBLIC_ENABLE_REFERRER_POLICY !== 'false',
  },
  
  // CDN and caching
  cdn: {
    enable: process.env.NEXT_PUBLIC_ENABLE_CDN !== 'false',
    cacheControl: process.env.NEXT_PUBLIC_CDN_CACHE_CONTROL || 'public, max-age=31536000',
    enableCompression: process.env.NEXT_PUBLIC_CDN_COMPRESSION !== 'false',
  },
  
  // Monitoring
  monitoring: {
    enableRealUserMonitoring: process.env.NEXT_PUBLIC_ENABLE_RUM !== 'false',
    enableSyntheticMonitoring: process.env.NEXT_PUBLIC_ENABLE_SYNTHETIC_MONITORING !== 'false',
    enableErrorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING !== 'false',
  },
};

/**
 * Configuration validation
 */
export function validateConfig(): void {
  const errors: string[] = [];
  
  // Validate required environment variables
  if (!environmentConfig.apiUrl) {
    errors.push('NEXT_PUBLIC_API_URL is required');
  }
  
  if (!localizationConfig.defaultLocale) {
    errors.push('NEXT_PUBLIC_DEFAULT_LOCALE is required');
  }
  
  if (securityConfig.maxFileSize <= 0) {
    errors.push('NEXT_PUBLIC_MAX_FILE_SIZE must be greater than 0');
  }
  
  if (securityConfig.rateLimitRequests <= 0) {
    errors.push('NEXT_PUBLIC_RATE_LIMIT_REQUESTS must be greater than 0');
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
}

/**
 * Get configuration for current environment
 */
export function getConfig() {
  return {
    environment: environmentConfig,
    security: securityConfig,
    localization: localizationConfig,
    features: featureFlags,
    performance: performanceConfig,
    api: apiConfig,
    monitoring: monitoringConfig,
    validation: validationConfig,
    development: developmentConfig,
    production: productionConfig,
  };
}

/**
 * Export default configuration
 */
export default getConfig();
