import { SecurityUtils, CSRFProtection, SessionSecurity } from '../security';

describe('SecurityUtils', () => {
  describe('sanitizeHtml', () => {
    it('should sanitize HTML input', () => {
      const input = '<script>alert("xss")</script>';
      const result = SecurityUtils.sanitizeHtml(input);
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('should handle empty input', () => {
      const result = SecurityUtils.sanitizeHtml('');
      expect(result).toBe('');
    });

    it('should handle non-string input', () => {
      const result = SecurityUtils.sanitizeHtml(null as unknown as string);
      expect(result).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      const result = SecurityUtils.validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('test@example.com');
    });

    it('should reject invalid email', () => {
      const result = SecurityUtils.validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('should validate correct phone number', () => {
      const result = SecurityUtils.validatePhoneNumber('+1234567890');
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid phone number', () => {
      const result = SecurityUtils.validatePhoneNumber('abc');
      expect(result.isValid).toBe(false);
    });
  });
});

describe('CSRFProtection', () => {
  beforeEach(() => {
    // Clear session storage before each test
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  });

  it('should generate and validate tokens', () => {
    const token = CSRFProtection.generateToken();
    expect(token).toBeTruthy();
    expect(CSRFProtection.validateToken(token)).toBe(true);
  });

  it('should reject invalid tokens', () => {
    expect(CSRFProtection.validateToken('invalid-token')).toBe(false);
  });
});

describe('SessionSecurity', () => {
  beforeEach(() => {
    // Clear session storage before each test
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  });

  it('should check session expiration', () => {
    expect(SessionSecurity.isSessionExpired()).toBe(true);
  });

  it('should update session activity', () => {
    SessionSecurity.updateSessionActivity();
    expect(SessionSecurity.isSessionExpired()).toBe(false);
  });
});
