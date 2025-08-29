# Passly Project Structure

This document outlines the enterprise-level project structure for the Passly application.

## 📁 Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalization routes
│   │   ├── (auth)/        # Authentication route group
│   │   └── (site)/        # Main site route group
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root page (redirects to default locale)
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components (Navigation, Footer)
│   ├── features/          # Feature-specific components
│   │   ├── HeroSection/   # Landing page hero
│   │   ├── GetStartedSection/
│   │   ├── JoinThousandsSection/
│   │   ├── CoreValuesSection/
│   │   ├── auth/          # Authentication components
│   │   └── createPass/    # Pass creation components
│   └── shared/            # Shared components (Providers)
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── constants/              # Application constants
├── services/               # API services
├── store/                  # Redux store
├── types/                  # TypeScript type definitions
├── localization/           # Internationalization files
├── lib/                    # Library configurations
├── tests/                  # Test files
├── docs/                   # Documentation
└── scripts/                # Build/deployment scripts
```

## 🏗️ Component Organization

### Layout Components (`/components/layout/`)
- **Navigation.tsx** - Main navigation bar
- **Footer.tsx** - Site footer

### Feature Components (`/components/features/`)
- **HeroSection.tsx** - Landing page hero section
- **GetStartedSection.tsx** - Call-to-action section
- **JoinThousandsSection.tsx** - Social proof section
- **CoreValuesSection.tsx** - Features and benefits
- **auth/** - Authentication-related components
- **createPass/** - Pass creation workflow components

### Shared Components (`/components/shared/`)
- **Providers.tsx** - React context providers

## 🪝 Custom Hooks (`/hooks/`)

- **useLocalStorage** - Local storage management
- **useWindowSize** - Window size tracking
- **useScrollPosition** - Scroll position tracking
- **useClickOutside** - Click outside detection
- **useAsync** - Async operation management

## 🛠️ Utilities (`/utils/`)

- **formatDate** - Date formatting
- **formatNumber** - Number formatting
- **capitalize** - String capitalization
- **generateId** - ID generation
- **debounce** - Function debouncing
- **isEmpty** - Empty value checking
- **deepClone** - Deep object cloning

## 📋 Constants (`/constants/`)

- **APP_CONFIG** - Application configuration
- **API_ENDPOINTS** - API endpoint definitions
- **ROUTES** - Application routes
- **FEATURES** - Feature flags
- **VALIDATION** - Validation rules

## 🔄 State Management

- **Redux Toolkit** for global state
- **Store structure** in `/store/`
- **API services** in `/services/`

## 🌐 Internationalization

- **Dynamic routing** with `[locale]`
- **Translation files** in `/localization/`
- **German (de)** and **English (en)** support

## 📱 Responsive Design

- **Mobile-first** approach
- **Tailwind CSS** for styling
- **Framer Motion** for animations

## 🧪 Development Tools

- **TypeScript** with strict mode
- **ESLint** with enterprise rules
- **Next.js 15** with Turbopack
- **React 19** with modern hooks

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`
4. Run linting: `npm run lint`

## 📝 Code Standards

- **TypeScript** for type safety
- **ESLint** for code quality
- **Import ordering** automation
- **Component composition** over inheritance
- **Custom hooks** for reusable logic
- **Utility functions** for common operations
