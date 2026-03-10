# Frontend Project Structure & Conventions

## Directory Organization

### `src/components/`
Reusable, composable React components. Usually presentational (no business logic).

```
components/
├── LoginForm.tsx              # Form component for login
├── RegistrationForm.tsx       # Form component for registration
├── ProtectedRoute.tsx         # Route guard wrapper
└── index.ts                   # Exports for easy importing
```

**Naming Rules:**
- File name = Component name (PascalCase)
- Components are functional, not classes
- No business logic (logic goes in hooks/services)
- Use `React.FC` type for components

**Example:**
```typescript
export const LoginForm: React.FC = () => {
  // Component code
};
```

---

### `src/pages/`
Page-level components that represent routes.

```
pages/
├── LoginPage.tsx              # Full login page
├── RegistrationPage.tsx       # Full registration page
├── DashboardPage.tsx          # Protected dashboard
└── [FeaturePage].tsx          # Add pages for new features
```

**Naming Rules:**
- File name = Page name + "Page.tsx"
- Usually larger components that compose smaller components
- Handle page-level state and routing
- Use path in route: `/dashboard` for `DashboardPage`

**Example:**
```typescript
export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  return <div>{/* Page content */}</div>;
};
```

---

### `src/context/`
React Context for global state management.

```
context/
└── AuthContext.tsx            # Authentication context & provider
```

**Naming Rules:**
- File name = Context name
- Export both: `[Name]Context` and `[Name]Provider`
- Export custom hook `use[Name]()`
- Always include JSDoc comments

**Example:**
```typescript
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Provider implementation
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

### `src/hooks/`
Custom React hooks for reusable logic.

```
hooks/
├── useAuth.ts                 # Auth-related hooks
├── [useFeatue].ts             # Feature-specific hooks
└── __tests__/                 # Hook tests
```

**Naming Rules:**
- File name = First hook name (camelCase with `use` prefix)
- If multiple hooks in file, all start with `use`
- File can contain related hooks
- Always include JSDoc

**Pattern:**
```typescript
// hooks/useTours.ts
export const useTours = () => { /* hook logic */ };
export const useTourSearch = () => { /* related hook */ };
```

**Example:**
```typescript
/**
 * useAuth - Access global auth state
 * @returns Auth context value
 */
export const useAuth = (): AuthContextType => {
  // Hook implementation
};
```

---

### `src/services/`
Business logic, API calls, and utilities.

```
services/
├── apiClient.ts               # Axios configuration & interceptors
├── authService.ts             # Auth-specific API calls
├── index.ts                   # Service exports
└── __tests__/
    └── [service].test.ts      # Service tests
```

**Naming Rules:**
- File name = Service name (camelCase with "Service" suffix for API services)
- Export as default or named exports
- Group related functions in same file
- Always include JSDoc with @param and @returns

**Example:**
```typescript
// services/authService.ts
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  // Implementation
};

export const registerUser = async (data: RegistrationRequest): Promise<RegistrationResponse> => {
  // Implementation
};
```

---

### `src/types/`
TypeScript type definitions and interfaces.

```
types/
├── auth.ts                    # Auth-related types
├── api.ts                     # API-related types
├── [feature].ts               # Feature-specific types
└── index.ts                   # Central export point
```

**Naming Rules:**
- File name = Domain (no "Types" suffix)
- Export interfaces/types for domain concepts
- Group related types in same file
- One file per domain (auth, api, tours, matching, etc.)

**Pattern:**
```typescript
// types/auth.ts
export interface User { /* ... */ }
export interface LoginRequest { /* ... */ }
export interface AuthState { /* ... */ }

// types/index.ts
export * from './auth';
export * from './api';
```

---

### `src/utils/`
Utility functions for common tasks.

```
utils/
├── formValidation.ts          # Form validation helpers
├── formatting.ts              # Data formatting functions
├── constants.ts               # App constants
└── [utility].ts               # Other utilities
```

**Naming Rules:**
- File name = Utility category (camelCase)
- Pure functions (no side effects)
- Can export utility class (rare)
- Always include JSDoc

**Example:**
```typescript
// utils/formValidation.ts
export const getFieldError = (errors: Record<string, string>, field: string): string | undefined => {
  return errors[field];
};

export const hasFieldError = (errors: Record<string, string>, field: string): boolean => {
  return !!errors[field];
};
```

---

### `src/` (Root)
Main application files.

```
src/
├── App.tsx                    # Main app component with routing
├── main.tsx                   # Entry point (renders app)
└── index.css                  # Global styles
```

**Files:**
- **App.tsx** - Router configuration, route definitions
- **main.tsx** - React 18 createRoot, renders to #root
- **index.css** - Tailwind, global styles, custom utilities

---

## Named Conventions

### Functions

**API Calls:**
```typescript
// Pattern: [action][Resource]
export const loginUser = async (credentials) => { };
export const registerUser = async (data) => { };
export const getCurrentUser = async () => { };
export const fetchTours = async () => { };
export const createTour = async (data) => { };
export const updateTour = async (id, data) => { };
export const deleteTour = async (id) => { };
```

**Validators:**
```typescript
// Pattern: is[Noun] or validate[Noun]
export const isValidEmail = (email: string): boolean => { };
export const isEmailDomainAllowed = (email, domains) => { };
export const validatePasswordStrength = (password) => { };
```

**Getters/Retrievers:**
```typescript
// Pattern: get[Noun] or [noun]From[Container]
export const getFieldError = (errors, field) => { };
export const getPasswordStrengthColor = (score) => { };
export const getAccessToken = () => { };
```

**Formatters:**
```typescript
// Pattern: format[Noun]
export const formatErrorMessage = (error) => { };
export const formatDate = (date) => { };
export const sanitizeEmail = (email) => { };
```

### Variables

**State:**
```typescript
// Pattern: [noun]State or is[Adjective]
const authState = { user: null, isAuthenticated: false };
const isLoading = true;
const hasError = false;
```

**Booleans:**
```typescript
// Pattern: is[Adjective] or has[Noun]
const isAuthenticated = true;
const hasError = false;
const isLoading = true;
const hasPermission = false;
```

**Collections:**
```typescript
// Pattern: [plural][s]
const tours = [];
const users = [];
const errors: Record<string, string> = {};
```

**Configuration:**
```typescript
// Pattern: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8080/api/v1';
const TOKEN_KEY = 'hikr_access_token';
const MAX_PASSWORD_LENGTH = 128;
```

### Types/Interfaces

**Pattern:** PascalCase, Suffix for clarity

```typescript
// DTO (Data Transfer Object)
export interface LoginRequest { /* ... */ }
export interface LoginResponse { /* ... */ }

// Domain Model
export interface User { /* ... */ }
export interface Tour { /* ... */ }

// State
export interface AuthState { /* ... */ }

// Context Contract
export interface AuthContextType { /* ... */ }

// Component Props
export interface LoginFormProps { /* ... */ }

// Error Types
export interface AuthError { /* ... */ }
```

### Hooks

**Pattern:** use[Noun] or use[Feature]

```typescript
const useAuth = () => { };           // Access context
const useLoginForm = () => { };      // Form-specific logic
const useTours = () => { };          // Feature-specific hook
const useLocalStorage = (key) => { }; // Utility hook
```

---

## Import Patterns

### Absolute Imports (Preferred)
```typescript
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/services/apiClient';
import { LoginForm } from '@/components';
import { User, LoginRequest } from '@/types';
import { isValidEmail } from '@/utils/formValidation';
```

### Relative Imports (When necessary)
```typescript
// From sibling file
import { useLoginForm } from './useAuth';

// From parent
import { apiClient } from '../services/apiClient';
```

### Index Exports (Recommended)
```typescript
// src/components/index.ts
export { LoginForm } from './LoginForm';
export { RegistrationForm } from './RegistrationForm';
export { ProtectedRoute } from './ProtectedRoute';

// Usage
import { LoginForm, ProtectedRoute } from '@/components';
```

---

## File Naming Summary

| Type | Pattern | Example |
|------|---------|---------|
| Component | PascalCase.tsx | `LoginForm.tsx` |
| Page | PascalCasePage.tsx | `DashboardPage.tsx` |
| Hook | useCamelCase.ts | `useAuth.ts` |
| Service | camelCaseService.ts | `authService.ts` |
| Type | camelCase.ts | `auth.ts` |
| Utility | camelCase.ts | `formValidation.ts` |
| Context | CamelCaseContext.tsx | `AuthContext.tsx` |
| Test | *.test.ts | `authService.test.ts` |

---

## Code Style Rules

### TypeScript
- ✅ Use `interface` over `type` (generally)
- ✅ Use strict property types (not `any`)
- ✅ Export public APIs with `export type` or `export interface`
- ✅ Use generics `<T>` for reusable types
- ❌ Avoid `any` type

### React
- ✅ Use functional components with hooks
- ✅ Use `React.FC<Props>` for component typing
- ✅ Custom hooks start with `use`
- ✅ Wrap hooks in try-catch in effects
- ❌ Class components (unless error boundary)

### Functions
- ✅ Use arrow functions `const fn = () => {}`
- ✅ Include JSDoc for public APIs
- ✅ Type parameters and return values
- ✅ Keep functions small and focused
- ❌ Function declarations `function fn() {}`

### Comments
```typescript
// Single line for quick notes
// ✅ This is correct usage

/**
 * Multi-line for functions/types
 * Especially for public APIs
 * 
 * @param param - Description
 * @returns Description of return
 */
export const myFunction = (param: string): string => {
  // Implementation
};
```

---

## Testing Conventions

### Test File Location
```
src/
├── services/
│   ├── authService.ts
│   └── __tests__/
│       └── authService.test.ts
├── hooks/
│   └── __tests__/
│       └── useAuth.test.ts
└── utils/
    └── __tests__/
        └── formValidation.test.ts
```

### Test Pattern
```typescript
import { describe, it, expect } from 'vitest';

describe('functionName', () => {
  it('should do something when condition', () => {
    const result = functionName();
    expect(result).toBe(expectedValue);
  });

  it('should handle edge case', () => {
    const result = functionName(edgeCase);
    expect(result).toThrow();
  });
});
```

---

## Key Principles

1. **Single Responsibility** - Each file/function does one thing
2. **DRY** - Don't Repeat Yourself - extract reusable logic
3. **KISS** - Keep It Simple, Stupid - avoid over-engineering
4. **SOLID** - Follow SOLID principles (especially SRP, DIP)
5. **Clean Code** - Write code for humans, not machines
6. **Type Safety** - Use TypeScript fully, avoid `any`
7. **Error Handling** - Handle errors explicitly
8. **Documentation** - Comment complex logic, document public APIs
9. **Consistency** - Follow conventions in codebase
10. **Performance** - Avoid unnecessary renders, minimize bundle

---

## Adding New Features

### Step 1: Create Types
```typescript
// types/tours.ts
export interface Tour { /* ... */ }
export interface CreateTourRequest { /* ... */ }
```

### Step 2: Create Service
```typescript
// services/tourService.ts
export const fetchTours = async () => { };
export const createTour = async (data) => { };
```

### Step 3: Create Hooks (if needed)
```typescript
// hooks/useTours.ts
export const useTours = () => {
  // Use service, manage state
};
```

### Step 4: Create Components
```typescript
// components/TourList.tsx
export const TourList: React.FC = () => {
  const { tours } = useTours();
  return <div>{/* render tours */}</div>;
};
```

### Step 5: Add Route
```typescript
// App.tsx
<Route path="/tours" element={<TourList />} />
```

### Step 6: Test
```typescript
// services/__tests__/tourService.test.ts
describe('tourService', () => {
  it('should fetch tours', async () => { });
});
```

---

## Resources

- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org
- **Vite:** https://vitejs.dev
- **Tailwind:** https://tailwindcss.com
- **Vitest:** https://vitest.dev

---

**Last Updated:** 2025-03-10  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
