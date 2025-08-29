# 🧪 Testing Guide

This document provides comprehensive information about the testing setup and practices for the Passly application.

## 📋 Overview

The Passly application uses a modern testing stack with:
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **TypeScript** - Type-safe testing
- **Coverage reporting** - Code coverage analysis
- **Automated testing** - CI/CD integration

## 🚀 Quick Start

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

### Running Specific Tests

```bash
# Run tests matching a pattern
npm test -- --testNamePattern="ErrorBoundary"

# Run tests in a specific file
npm test -- src/components/shared/__tests__/ErrorBoundary.test.tsx

# Run tests with verbose output
npm test -- --verbose
```

## 📁 Test Structure

```
src/
├── components/
│   └── shared/
│       └── __tests__/
│           └── ErrorBoundary.test.tsx
├── utils/
│   └── __tests__/
│       ├── security.test.ts
│       └── performance.test.ts
└── store/
    └── __tests__/
        └── builderSlice.test.ts
```

## 🧩 Test Categories

### 1. Unit Tests
- **Location**: `src/**/__tests__/*.test.ts`
- **Purpose**: Test individual functions, classes, and utilities
- **Examples**: Security utilities, performance optimizers, Redux reducers

### 2. Component Tests
- **Location**: `src/components/**/__tests__/*.test.tsx`
- **Purpose**: Test React components in isolation
- **Examples**: Error boundaries, form components, UI elements

### 3. Integration Tests
- **Location**: `tests/integration/**/*.test.ts`
- **Purpose**: Test component interactions and data flow
- **Examples**: Form submissions, API integrations, state management

### 4. E2E Tests
- **Location**: `tests/e2e/**/*.test.ts`
- **Purpose**: Test complete user workflows
- **Examples**: User registration, pass creation, dashboard navigation

## 🛠️ Testing Utilities

### Global Test Utilities

The testing setup provides global utilities accessible via `global.testUtils`:

```typescript
// Wait utilities
await testUtils.wait(1000);
await testUtils.waitForNextTick();

// Mock creation
const mockFile = testUtils.createMockFile('test.png', 1024, 'image/png');
const mockEvent = testUtils.createMockEvent('click');
const mockKeyboardEvent = testUtils.createMockKeyboardEvent('keydown', 'Enter');

// Browser API mocks
testUtils.mockIntersectionObserver();
testUtils.mockResizeObserver();
testUtils.mockClipboard();
```

### Mocking Strategies

#### 1. Next.js Router
```typescript
// Automatically mocked in jest.setup.js
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/dashboard'); // Mocked function
```

#### 2. Browser APIs
```typescript
// localStorage and sessionStorage are automatically mocked
localStorage.setItem('test', 'value');
sessionStorage.getItem('test'); // Returns undefined in tests
```

#### 3. Performance API
```typescript
// performance.now() is mocked to return Date.now()
const startTime = performance.now();
```

## 📊 Coverage Requirements

The project enforces strict coverage thresholds:

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Coverage Reports

```bash
# Generate HTML coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## 🔧 Configuration

### Jest Configuration

The Jest configuration is located in `jest.config.js` and includes:

- **Test environment**: jsdom for DOM testing
- **Path mapping**: `@/` alias for `src/`
- **Coverage thresholds**: Enforced coverage requirements
- **Mock setup**: Comprehensive browser API mocking

### Test Setup Files

1. **`jest.setup.js`** - Main test setup with mocks
2. **`jest.global-setup.js`** - Global test environment setup
3. **`jest.global-teardown.js`** - Global test cleanup
4. **`jest.setup-files.js`** - Per-test file setup

## 📝 Writing Tests

### Test Structure

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    render(<ComponentName />);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    
    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
});
```

### Best Practices

1. **Test Behavior, Not Implementation**
   ```typescript
   // ✅ Good - Test what the user sees
   expect(screen.getByText('Submit')).toBeInTheDocument();
   
   // ❌ Bad - Test implementation details
   expect(component.state.isVisible).toBe(true);
   ```

2. **Use Semantic Queries**
   ```typescript
   // ✅ Good - Use semantic queries
   screen.getByRole('button', { name: 'Submit' });
   screen.getByLabelText('Email address');
   
   // ❌ Bad - Use test-specific attributes
   screen.getByTestId('submit-button');
   ```

3. **Test Error States**
   ```typescript
   it('should show error message for invalid input', () => {
     render(<Form />);
     
     const input = screen.getByLabelText('Email');
     fireEvent.change(input, { target: { value: 'invalid-email' } });
     
     expect(screen.getByText('Invalid email format')).toBeInTheDocument();
   });
   ```

4. **Mock External Dependencies**
   ```typescript
   // Mock API calls
   jest.spyOn(api, 'fetchData').mockResolvedValue(mockData);
   
   // Mock browser APIs
   Object.defineProperty(window, 'matchMedia', {
     writable: true,
     value: jest.fn().mockImplementation(query => ({
       matches: false,
       media: query,
       onchange: null,
       addListener: jest.fn(),
       removeListener: jest.fn(),
       addEventListener: jest.fn(),
       removeEventListener: jest.fn(),
       dispatchEvent: jest.fn(),
     })),
   });
   ```

## 🚨 Common Issues

### 1. Test Environment Issues

```bash
# Error: Jest environment 'jsdom' is not available
npm install --save-dev jest-environment-jsdom
```

### 2. Import Issues

```bash
# Error: Cannot resolve module '@/components/...'
# Ensure tsconfig.json has proper path mapping
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 3. Mock Issues

```typescript
// If mocks aren't working, ensure they're in jest.setup.js
// or explicitly mock in your test file
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));
```

## 🔄 Continuous Integration

### GitHub Actions

The project includes GitHub Actions for automated testing:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:ci
      - run: npm run lint
      - run: npm run type-check
```

### Pre-commit Hooks

Husky and lint-staged ensure code quality:

```bash
# Install pre-commit hooks
npm run prepare

# Pre-commit checks run automatically
git commit -m "Add new feature"
# Runs: lint, format, tests
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [TypeScript Testing](https://www.typescriptlang.org/docs/handbook/testing.html)

## 🤝 Contributing

When adding new tests:

1. Follow the existing test structure
2. Ensure coverage thresholds are met
3. Use semantic queries and user-centric testing
4. Mock external dependencies appropriately
5. Test both success and error scenarios

---

**Happy Testing! 🎉**
