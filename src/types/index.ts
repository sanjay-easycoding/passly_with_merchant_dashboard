// Core application types
export type Locale = 'en' | 'de';

// User and authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  locale: Locale;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Pass builder types
export type PassType = 'store' | 'coupon' | 'event' | 'boarding' | 'generic';
export type OffersFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Never';

export interface PassBuilderState {
  // Pass Type & Branding
  campaignName: string;
  type: PassType;
  brandColor: string;
  logoUrl: string | null;
  tagline: string;
  
  // Details
  rewardDescription: string;
  stampsNeeded: number;
  minPurchase: number;
  
  // Business Information
  businessName: string;
  businessAddress: string;
  contact: string;
  email: string;
  website: string;
  socialMedia: string;
  
  // Customer Experience
  welcomeMessage: string;
  instructions: string;
  specialOffers: string;
  offersFrequency: OffersFrequency;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Navigation and routing types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  children?: NavigationItem[];
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LocaleProps {
  locale: Locale;
}

export interface WithParams {
  params: LocaleProps;
}

// File upload types
export interface FileUpload {
  file: File;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

// Localization types
export interface TranslationData {
  [key: string]: string | TranslationData;
}

export interface LocalizationConfig {
  defaultLocale: Locale;
  supportedLocales: Locale[];
  fallbackLocale: Locale;
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Performance monitoring types
export interface PerformanceMetrics {
  pageLoadTime: number;
  componentRenderTime: number;
  apiResponseTime: number;
  memoryUsage: number;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

// Security types
export interface SecurityConfig {
  maxFileSize: number;
  allowedFileTypes: string[];
  rateLimitRequests: number;
  rateLimitWindow: number;
  sessionTimeout: number;
}

// Environment configuration
export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  apiUrl: string;
  cdnUrl: string;
  analyticsEnabled: boolean;
  debugMode: boolean;
}
