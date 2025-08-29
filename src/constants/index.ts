// Application Constants
export const APP_CONFIG = {
  name: 'Passly',
  version: '1.0.0',
  description: 'Digital Pass Management Platform',
} as const;

// API Constants
export const API_ENDPOINTS = {
  base: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
  },
  passes: {
    create: '/passes/create',
    list: '/passes',
    update: '/passes/:id',
    delete: '/passes/:id',
  },
} as const;

// Route Constants
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  settings: '/settings',
  createPass: '/create-pass',
  auth: {
    login: '/login',
    signup: '/signup',
    forgotPassword: '/forgot-password',
  },
} as const;

// Feature Flags
export const FEATURES = {
  enableAnalytics: true,
  enableNotifications: true,
  enableMultiLanguage: true,
} as const;

// Validation Constants
export const VALIDATION = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
  email: {
    maxLength: 254,
  },
} as const;
