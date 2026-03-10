# Frontend Authentication Architecture

## Overview

This document describes the comprehensive authentication architecture implemented for the Hikr web frontend. The system provides:

- **OAuth2 / OpenID Connect** integration with backend
- **JWT Token Management** with automatic refresh
- **Secure Token Storage** using localStorage
- **Global Authentication State** via React Context
- **Protected Route Guards** for authorization
- **Form Validation** with real-time feedback
- **Error Handling** with meaningful messages

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              AuthProvider (Context)                  │  │
│  │  - Manages global auth state                         │  │
│  │  - Handles login, register, logout, refresh         │  │
│  │  - Provides useAuth hook to all components          │  │
│  └──────────────────────────────────────────────────────┘  │
│         ▲                                        │           │
│         │                                        ▼           │
│  ┌──────────────────┐              ┌──────────────────────┐ │
│  │  Components:     │              │  Protected Routes    │ │
│  │  - LoginForm     │              │  - Dashboard         │ │
│  │  - RegForm       │              │  - Tours             │ │
│  │  - Dashboard     │              │  - Matching          │ │
│  └──────────────────┘              └──────────────────────┘ │
│         │                                   ▲                │
│         └───────────────────┬───────────────┘                │
│                             │                                │
│                    ┌────────▼────────┐                       │
│                    │  useAuth Hook   │                       │
│                    │  useLoginForm   │                       │
│                    │  useRegForm     │                       │
│                    └────────┬────────┘                       │
│                             │                                │
└─────────────────────────────┼────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │    Auth Service      │
                    │  - loginUser()       │
                    │  - registerUser()    │
                    │  - getAllowedDomains │
                    │  - refreshToken()    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    API Client        │
                    │  (axios with auth)   │
                    │  - Request intercept │
                    │  - Response intercept│
                    │  - Token refresh     │
                    │  - Error handling    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Backend API        │
                    │  /api/v1/auth/*      │
                    │  /api/v1/users/*     │
                    └──────────────────────┘
```

## Directory Structure

```
frontend-web/
├── src/
│   ├── components/
│   │   ├── LoginForm.tsx              # Login form component
│   │   ├── RegistrationForm.tsx       # Registration form component
│   │   └── ProtectedRoute.tsx         # Route guard component
│   ├── context/
│   │   └── AuthContext.tsx            # Global auth context & provider
│   ├── hooks/
│   │   └── useAuth.ts                 # Auth hooks (useLoginForm, etc.)
│   ├── pages/
│   │   ├── LoginPage.tsx              # Login page
│   │   ├── RegistrationPage.tsx       # Registration page
│   │   └── DashboardPage.tsx          # Protected dashboard
│   ├── services/
│   │   ├── apiClient.ts               # Axios instance with interceptors
│   │   ├── authService.ts             # Auth API calls
│   │   └── __tests__/
│   │       └── authService.test.ts    # Service tests
│   ├── types/
│   │   ├── auth.ts                    # Auth types & DTOs
│   │   └── api.ts                     # API types
│   ├── utils/
│   │   └── formValidation.ts          # Form validation utilities
│   ├── App.tsx                        # Main app routing
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── .env.example
```

## Key Components

### 1. AuthContext & AuthProvider

**Location:** `src/context/AuthContext.tsx`

Provides global authentication state and actions:

```typescript
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegistrationRequest) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  clearError: () => void;
}
```

**Usage in components:**
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### 2. API Client with Interceptors

**Location:** `src/services/apiClient.ts`

Features:
- **Request Interceptor:** Adds `Authorization: Bearer {token}` header
- **Response Interceptor:** Automatically refreshes expired tokens
- **Error Handling:** Converts Axios errors to `ApiError` class
- **Token Management:** Stores and retrieves tokens from localStorage

**Token Refresh Flow:**
1. API returns 401 (Unauthorized)
2. Interceptor detects 401 and attempts token refresh
3. If refresh succeeds, retries original request with new token
4. If refresh fails, clears tokens and redirects to login

### 3. Authentication Service

**Location:** `src/services/authService.ts`

Provides business logic for:
- User login/registration
- Token refresh
- Email validation
- Password strength validation
- Domain validation

### 4. Form Hooks

**Location:** `src/hooks/useAuth.ts`

Custom hooks for form management:
- `useLoginForm()` - Handles login form state & validation
- `useRegistrationForm()` - Handles registration form state & validation
- `useRequireAuth()` - Checks if user is authenticated

### 5. Protected Routes

**Location:** `src/components/ProtectedRoute.tsx`

Wrapper component that:
- Checks if user is authenticated
- Shows loading spinner while checking
- Redirects to login if not authenticated
- Saves intended destination for post-login redirect

## Authentication Flow

### Login Flow

```
1. User fills login form
   └─→ Real-time validation (email format, required fields)

2. User clicks "Login"
   └─→ Form validation (all fields valid?)
   └─→ If invalid, show errors and stop

3. Submit credentials via loginUser()
   └─→ POST /api/v1/auth/login { email, password }

4. Backend returns tokens and user info
   └─→ Store accessToken & refreshToken in localStorage
   └─→ Update AuthContext state
   └─→ Redirect to dashboard (or intended page)

5. On subsequent requests
   └─→ API client adds Authorization header
   └─→ If token expired (401), refresh token
   └─→ Retry request with new token
```

### Registration Flow

```
1. User fills registration form
   └─→ Real-time validation (email format, password strength, etc.)
   └─→ Fetch allowed domains from /api/v1/auth/allowed-domains
   └─→ Validate email domain against allowed list

2. User clicks "Register"
   └─→ Final validation of all fields
   └─→ If invalid, show errors and stop

3. Submit registration via registerUser()
   └─→ POST /api/v1/registration { ...data }

4. Backend creates user and returns confirmation
   └─→ Show success message
   └─→ Redirect to login page
   └─→ User must login with new credentials

5. User logs in
   └─→ Follow login flow above
```

### Token Refresh Flow

```
Automatic (on 401 response):
1. API request returns 401 Unauthorized
2. Response interceptor detects 401
3. POST /api/v1/auth/refresh { refreshToken }
4. Backend returns new accessToken
5. Retry original request with new token
6. If refresh fails, redirect to login

Manual (via useAuth hook):
1. Component calls refreshAccessToken()
2. Same flow as automatic refresh
3. Useful for proactive token refresh
```

## Type Safety

All API interactions are fully typed with TypeScript interfaces defined in `src/types/`:

### Auth Types (`src/types/auth.ts`)
```typescript
export interface LoginRequest { email: string; password: string }
export interface LoginResponse { accessToken: string; refreshToken: string; user: User }
export interface User { id: string; email: string; username: string; ... }
export interface AuthState { user: User | null; accessToken: string | null; ... }
```

### API Types (`src/types/api.ts`)
```typescript
export class ApiError extends Error { code: string; statusCode: number; ... }
export interface ApiErrorResponse { code: string; message: string; ... }
```

## Security Considerations

### ✅ Best Practices Implemented

1. **Token Storage**
   - Tokens stored in localStorage (accessible only to same domain)
   - Alternative: Use httpOnly cookies for better security (backend integration needed)

2. **Authorization Header**
   - Used `Authorization: Bearer {token}` standard format
   - Never expose tokens in URL or GET parameters

3. **Token Refresh**
   - Automatic refresh on 401 responses
   - Prevents users from getting stuck on expired token
   - Refresh token stored separately

4. **Error Handling**
   - Generic error messages to users (don't expose sensitive info)
   - Detailed error logging for debugging (masked in production)
   - Failed refresh triggers logout (prevents infinite loops)

5. **CORS Protection**
   - API configured to only accept same-domain requests
   - Backend handles CORS headers

### ⚠️ Recommendations for Production

1. **Use HttpOnly Cookies**
   ```
   // Backend should set: Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Strict
   // Frontend can't access, but browser auto-includes in requests
   ```

2. **HTTPS Only**
   - Enable `Secure` flag on cookies
   - Prevent token interception in transit

3. **Token Expiration**
   - accessToken: 15 minutes (short lived)
   - refreshToken: 7 days (long lived)
   - Backend validates token expiration

4. **Rate Limiting**
   - Backend should rate-limit login/refresh attempts
   - Prevents brute force attacks

5. **CSRF Protection**
   - Backend should implement CSRF tokens for state-changing operations
   - Frontend includes token in request headers

## Usage Examples

### Login Component
```typescript
import { useLoginForm } from '@/hooks/useAuth';

export const LoginForm: React.FC = () => {
  const { formData, errors, handleChange, handleSubmit } = useLoginForm();
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={formData.email} onChange={e => handleChange('email', e.target.value)} />
      {errors.email && <p>{errors.email}</p>}
      <button type="submit">Login</button>
    </form>
  );
};
```

### Protected Route
```typescript
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardPage from '@/pages/DashboardPage';

<Routes>
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } />
</Routes>
```

### Using Authentication State
```typescript
const { user, isAuthenticated, login, logout } = useAuth();

if (!isAuthenticated) {
  return <div>Please log in</div>;
}

return <div>Welcome {user?.username}!</div>;
```

## Testing

Example test cases are provided in `src/services/__tests__/authService.test.ts`:

Run tests:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test -- --ui
```

Generate coverage:
```bash
npm run test:ci
```

## Environment Configuration

Create `.env.local` based on `.env.example`:

```
VITE_API_URL=http://localhost:8080/api/v1
VITE_ENABLE_DEBUG_MODE=false
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

3. Update API URL if needed in `.env.local`

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | User login |
| `/auth/refresh` | POST | Refresh access token |
| `/auth/allowed-domains` | GET | Get allowed email domains |
| `/registration` | POST | User registration |
| `/users/me` | GET | Get current user profile |

## Common Issues & Solutions

### Issue: Token not being sent
- **Check:** Token exists in localStorage
- **Check:** Authorization header in request
- **Solution:** Verify API client interceptor is installed

### Issue: Infinite loop of 401s
- **Check:** Refresh token is valid
- **Check:** Backend successfully returns new token
- **Solution:** Clear tokens and redirect to login

### Issue: User logged out unexpectedly
- **Check:** Token expiration time
- **Check:** Backend logout endpoint called
- **Solution:** Implement token refresh before expiration

## Related Documentation

- [Backend Authentication Guide](../../backend/README.md)
- [OpenAPI Specification](../../shared-resources/api-contracts/openapi.yaml)
- [Development Guide](../../docs/guides/DEVELOPMENT-GUIDE.md)
- [Application Architecture](../../docs/architecture/ARCHITECTURE.md)
