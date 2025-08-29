// Application Configuration
export const config = {
  // App
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Passly',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
  
  // API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  },
  
  // Features
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    errorReporting: process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === 'true',
  },
  
  // Localization
  i18n: {
    defaultLocale: 'de',
    supportedLocales: ['en', 'de'],
  },
} as const;

export type Config = typeof config;
