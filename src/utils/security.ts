/**
 * Security utilities for enterprise-level application security
 * These utilities help prevent common security vulnerabilities
 */

import type { SecurityConfig } from '@/types';

// Default security configuration
export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  maxFileSize: 2 * 1024 * 1024, // 2MB
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/svg+xml'],
  rateLimitRequests: 100,
  rateLimitWindow: 60000, // 1 minute
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
};

/**
 * Input validation and sanitization utilities
 */
export class SecurityUtils {
  /**
   * Sanitize HTML input to prevent XSS attacks
   */
  static sanitizeHtml(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Validate and sanitize email addresses
   */
  static validateEmail(email: string): { isValid: boolean; sanitized: string } {
    if (typeof email !== 'string') {
      return { isValid: false, sanitized: '' };
    }

    const sanitized = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return {
      isValid: emailRegex.test(sanitized),
      sanitized: sanitized,
    };
  }

  /**
   * Validate and sanitize phone numbers
   */
  static validatePhoneNumber(phone: string): { isValid: boolean; sanitized: string } {
    if (typeof phone !== 'string') {
      return { isValid: false, sanitized: '' };
    }

    const sanitized = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    return {
      isValid: phoneRegex.test(sanitized),
      sanitized: sanitized,
    };
  }

  /**
   * Validate and sanitize URLs
   */
  static validateUrl(url: string): { isValid: boolean; sanitized: string } {
    if (typeof url !== 'string') {
      return { isValid: false, sanitized: '' };
    }

    const sanitized = url.trim();
    
    try {
      const urlObj = new URL(sanitized);
      // Only allow HTTP and HTTPS protocols
      const isValid = ['http:', 'https:'].includes(urlObj.protocol);
      
      return {
        isValid,
        sanitized: isValid ? sanitized : '',
      };
    } catch {
      return { isValid: false, sanitized: '' };
    }
  }

  /**
   * Validate file uploads
   */
  static validateFile(
    file: File,
    config: Partial<SecurityConfig> = {}
  ): { isValid: boolean; error?: string } {
    const securityConfig = { ...DEFAULT_SECURITY_CONFIG, ...config };

    // Check file size
    if (file.size > securityConfig.maxFileSize) {
      return {
        isValid: false,
        error: `File size must be less than ${Math.round(securityConfig.maxFileSize / 1024 / 1024)}MB`,
      };
    }

    // Check file type
    if (!securityConfig.allowedFileTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `File type not allowed. Allowed types: ${securityConfig.allowedFileTypes.join(', ')}`,
      };
    }

    // Check for potentially dangerous file extensions
    const fileName = file.name.toLowerCase();
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js'];
    
    if (dangerousExtensions.some(ext => fileName.endsWith(ext))) {
      return {
        isValid: false,
        error: 'File type not allowed for security reasons',
      };
    }

    return { isValid: true };
  }

  /**
   * Sanitize user input for database queries (basic protection)
   */
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .replace(/vbscript:/gi, ''); // Remove vbscript: protocol
  }

  /**
   * Generate secure random tokens
   */
  static generateSecureToken(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Hash sensitive data (basic implementation)
   * In production, use proper cryptographic libraries
   */
  static async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Rate limiting utility
   */
  static createRateLimiter(
    maxRequests: number = DEFAULT_SECURITY_CONFIG.rateLimitRequests,
    windowMs: number = DEFAULT_SECURITY_CONFIG.rateLimitWindow
  ) {
    const requests = new Map<string, number[]>();

    return {
      isAllowed: (identifier: string): boolean => {
        const now = Date.now();
        const userRequests = requests.get(identifier) || [];
        
        // Remove old requests outside the window
        const validRequests = userRequests.filter(time => now - time < windowMs);
        
        if (validRequests.length >= maxRequests) {
          return false;
        }
        
        // Add current request
        validRequests.push(now);
        requests.set(identifier, validRequests);
        
        return true;
      },
      
      getRemaining: (identifier: string): number => {
        const now = Date.now();
        const userRequests = requests.get(identifier) || [];
        const validRequests = userRequests.filter(time => now - time < windowMs);
        return Math.max(0, maxRequests - validRequests.length);
      },
      
      reset: (identifier: string): void => {
        requests.delete(identifier);
      },
    };
  }

  /**
   * Content Security Policy utilities
   */
  static generateCSPHeader(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ');
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length < 8) {
      feedback.push('Password must be at least 8 characters long');
    } else {
      score += 1;
    }

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Password must contain at least one lowercase letter');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Password must contain at least one uppercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Password must contain at least one number');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Password must contain at least one special character');

    const isValid = score >= 4;

    return {
      isValid,
      score,
      feedback,
    };
  }
}

/**
 * CSRF protection utilities
 */
export class CSRFProtection {
  private static tokenKey = 'csrf_token';

  /**
   * Generate CSRF token
   */
  static generateToken(): string {
    const token = SecurityUtils.generateSecureToken(32);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.tokenKey, token);
    }
    return token;
  }

  /**
   * Get stored CSRF token
   */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.tokenKey);
    }
    return null;
  }

  /**
   * Validate CSRF token
   */
  static validateToken(token: string): boolean {
    const storedToken = this.getToken();
    return storedToken === token;
  }

  /**
   * Clear CSRF token
   */
  static clearToken(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.tokenKey);
    }
  }
}

/**
 * Session security utilities
 */
export class SessionSecurity {
  /**
   * Check if session is expired
   */
  static isSessionExpired(timeoutMs: number = DEFAULT_SECURITY_CONFIG.sessionTimeout): boolean {
    if (typeof window === 'undefined') return true;
    
    const lastActivity = sessionStorage.getItem('last_activity');
    if (!lastActivity) return true;
    
    const now = Date.now();
    const lastActivityTime = parseInt(lastActivity, 10);
    
    return now - lastActivityTime > timeoutMs;
  }

  /**
   * Update session activity
   */
  static updateSessionActivity(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('last_activity', Date.now().toString());
    }
  }

  /**
   * Clear session data
   */
  static clearSession(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.removeItem('passly_auth');
    }
  }
}
