/**
 * Jest setup files configuration
 * This file runs before each test file
 */

// Set up test environment
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise in tests
const originalConsole = { ...console };

beforeEach(() => {
  // Suppress console.log in tests unless explicitly needed
  jest.spyOn(console, 'log').mockImplementation(() => {});
  
  // Suppress console.warn in tests unless explicitly needed
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  
  // Keep console.error for debugging test failures
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    // Only log errors that aren't React warnings
    if (args[0] && typeof args[0] === 'string') {
      if (!args[0].includes('Warning: ReactDOM.render is deprecated') &&
          !args[0].includes('Warning: componentWillReceiveProps') &&
          !args[0].includes('Warning: componentWillUpdate')) {
        originalConsole.error(...args);
      }
    }
  });
});

afterEach(() => {
  // Restore console methods
  jest.restoreAllMocks();
  
  // Clear all mocks
  jest.clearAllMocks();
  
  // Clear timers
  jest.clearAllTimers();
});

// Global test utilities
global.testUtils = {
  // Wait for a specified time
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Wait for next tick
  waitForNextTick: () => new Promise(resolve => setImmediate(resolve)),
  
  // Create mock file
  createMockFile: (name, size, type) => {
    const file = new File([''], name, { type });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  },
  
  // Create mock event
  createMockEvent: (type, options = {}) => {
    const event = new Event(type, { bubbles: true, cancelable: true, ...options });
    return event;
  },
  
  // Create mock keyboard event
  createMockKeyboardEvent: (type, key, options = {}) => {
    const event = new KeyboardEvent(type, {
      key,
      bubbles: true,
      cancelable: true,
      ...options,
    });
    return event;
  },
  
  // Create mock mouse event
  createMockMouseEvent: (type, options = {}) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      ...options,
    });
    return event;
  },
  
  // Mock IntersectionObserver
  mockIntersectionObserver: () => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    return mockIntersectionObserver;
  },
  
  // Mock ResizeObserver
  mockResizeObserver: () => {
    const mockResizeObserver = jest.fn();
    mockResizeObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.ResizeObserver = mockResizeObserver;
    return mockResizeObserver;
  },
  
  // Mock matchMedia
  mockMatchMedia: (matches = false) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  },
  
  // Mock window.scrollTo
  mockScrollTo: () => {
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: jest.fn(),
    });
  },
  
  // Mock window.URL methods
  mockURLMethods: () => {
    Object.defineProperty(window.URL, 'createObjectURL', {
      writable: true,
      value: jest.fn(() => 'mocked-url'),
    });
    
    Object.defineProperty(window.URL, 'revokeObjectURL', {
      writable: true,
      value: jest.fn(),
    });
  },
  
  // Mock navigator.clipboard
  mockClipboard: () => {
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: jest.fn(),
        readText: jest.fn(),
      },
    });
  },
  
  // Mock crypto API
  mockCrypto: () => {
    Object.defineProperty(global, 'crypto', {
      value: {
        getRandomValues: jest.fn((arr) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(Math.random() * 256);
          }
          return arr;
        }),
        subtle: {
          digest: jest.fn(),
        },
      },
    });
  },
  
  // Mock performance API
  mockPerformance: () => {
    Object.defineProperty(global, 'performance', {
      value: {
        now: jest.fn(() => Date.now()),
        getEntriesByType: jest.fn(() => []),
      },
    });
  },
};

// Set up global test environment
beforeAll(() => {
  // Initialize all mocks
  testUtils.mockIntersectionObserver();
  testUtils.mockResizeObserver();
  testUtils.mockMatchMedia();
  testUtils.mockScrollTo();
  testUtils.mockURLMethods();
  testUtils.mockClipboard();
  testUtils.mockCrypto();
  testUtils.mockPerformance();
  
  console.log('🧪 Jest setup files initialized');
});

afterAll(() => {
  // Clean up global test environment
  delete global.testUtils;
  
  console.log('🧹 Jest setup files cleaned up');
});
