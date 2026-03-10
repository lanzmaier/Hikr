# Frontend Developer Guide - Authentication Implementation

This guide provides practical examples and best practices for working with the Hikr frontend authentication system.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Using Authentication](#using-authentication)
3. [Building Protected Features](#building-protected-features)
4. [Common Patterns](#common-patterns)
5. [Error Handling](#error-handling)
6. [Testing](#testing)
7. [Best Practices](#best-practices)

## Getting Started

### Initial Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Using Authentication

### 1. Access Current User / Auth State

```typescript
import { useAuth } from '@/context/AuthContext';

export const UserMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.username}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### 2. Create Protected Pages

```typescript
import { ProtectedRoute } from '@/components';
import { ProfilePage } from '@/pages/ProfilePage';

<Routes>
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    }
  />
</Routes>
```

### 3. Call APIs with Authentication

The axios client automatically adds the Authorization header:

```typescript
import { apiClient } from '@/services/apiClient';

export const fetchUserTours = async () => {
  const response = await apiClient.get('/tours/my-tours');
  return response.data;
};
```

Token refresh is automatic - if you get a 401, the client will refresh the token and retry.

### 4. Handle Login/Register Logic

Most of the time, use the built-in `LoginForm` and `RegistrationForm` components. 

For custom flows:

```typescript
import { useAuth } from '@/context/AuthContext';

export const CustomLoginFlow: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCustomLogin = async () => {
    try {
      await login(email, password);
      // User is now authenticated
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error.message}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleCustomLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};
```

## Building Protected Features

### Example: Tours Page (Protected)

```typescript
// pages/ToursPage.tsx
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/services/apiClient';
import { useEffect, useState } from 'react';

export const ToursPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchTours = async () => {
      try {
        const response = await apiClient.get('/tours');
        setTours(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [isAuthenticated]);

  if (loading) return <div>Loading tours...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1>Available Tours</h1>
      {tours.map(tour => (
        <div key={tour.id}>
          <h2>{tour.title}</h2>
          <p>{tour.description}</p>
        </div>
      ))}
    </div>
  );
};

// App.tsx
<Routes>
  <Route
    path="/tours"
    element={
      <ProtectedRoute>
        <ToursPage />
      </ProtectedRoute>
    }
  />
</Routes>
```

### Example: User Profile Page

```typescript
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Joined:</strong> {new Date(user?.createdAt || '').toLocaleDateString()}</p>
      
      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
    </div>
  );
};
```

## Common Patterns

### 1. Conditional Rendering Based on Auth

```typescript
import { useAuth } from '@/context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <p>Welcome, {user?.username}</p>
      ) : (
        <p>Please log in</p>
      )}
    </header>
  );
};
```

### 2. Redirect After Login

The `ProtectedRoute` component automatically saves the location the user was trying to access:

```typescript
import { useLocation, useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { from?: { pathname: string } };

  // After successful login, user is redirected to:
  // location.state?.from?.pathname || '/dashboard'
};
```

### 3. Custom Hook for API Call

```typescript
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/services/apiClient';
import { useEffect, useState } from 'react';

export const useTours = () => {
  const { isAuthenticated } = useAuth();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await apiClient.get('/tours');
      setTours(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [isAuthenticated]);

  return { tours, loading, error, refetch: fetchTours };
};

// Usage in component
export const ToursList: React.FC = () => {
  const { tours, loading, error } = useTours();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return tours.map(tour => <TourCard key={tour.id} tour={tour} />);
};
```

### 4. Form with API Call

```typescript
import { apiClient } from '@/services/apiClient';
import { useState } from 'react';

interface CreateTourForm {
  title: string;
  description: string;
  distance: number;
}

export const CreateTourForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateTourForm>({
    title: '',
    description: '',
    distance: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiClient.post('/tours', formData);
      setSuccess(true);
      setFormData({ title: '', description: '', distance: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Tour created!</p>}

      <input
        type="text"
        placeholder="Tour name"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Distance (km)"
        value={formData.distance}
        onChange={e => setFormData({ ...formData, distance: parseFloat(e.target.value) })}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Tour'}
      </button>
    </form>
  );
};
```

## Error Handling

### Catching API Errors

```typescript
import { apiClient } from '@/services/apiClient';
import { ApiError } from '@/types';

try {
  const response = await apiClient.post('/tours', tourData);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Error [${error.code}]: ${error.message}`);
    console.error('Status:', error.statusCode);
    console.error('Details:', error.details);
  } else {
    console.error('Unknown error:', error);
  }
}
```

### Using Auth Context Error

```typescript
import { useAuth } from '@/context/AuthContext';

export const LoginForm: React.FC = () => {
  const { error, clearError, login } = useAuth();

  useEffect(() => {
    if (error) {
      // Show error notification
      console.error(error.message);

      // Optional: clear error after some time
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div>
      {error && (
        <div className="p-4 bg-red-100 border border-red-500 rounded">
          <p className="text-red-800">{error.message}</p>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}
      {/* Form content */}
    </div>
  );
};
```

## Testing

### Test Protected Component

```typescript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/components';
import { AuthProvider } from '@/context/AuthContext';
import { describe, it, expect } from 'vitest';

describe('ProtectedRoute', () => {
  it('should show loading while checking auth', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    );

    // Should show loading or redirect to login
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
```

### Test API Call

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '@/services/apiClient';

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add authorization header', async () => {
    localStorage.setItem('hikr_access_token', 'test-token');

    // Mock axios
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: { tours: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    });

    await apiClient.get('/tours');

    expect(apiClient.defaults.headers.common['Authorization']).toBeDefined();
  });
});
```

## Best Practices

### 1. Always Use useAuth in Components

```typescript
// ✅ Good
import { useAuth } from '@/context/AuthContext';

export const MyComponent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  // ...
};

// ❌ Bad - don't directly access localStorage
const token = localStorage.getItem('hikr_access_token');
```

### 2. Use ProtectedRoute for Route Guards

```typescript
// ✅ Good
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>

// ❌ Bad - manual checks in component
export const Dashboard = () => {
  if (!localStorage.getItem('hikr_access_token')) {
    return <Redirect to="/login" />;
  }
  // ...
};
```

### 3. Handle Errors Gracefully

```typescript
// ✅ Good
try {
  await login(email, password);
} catch (error) {
  // Show user-friendly message
  setErrorMessage('Failed to log in. Please check your credentials.');
}

// ❌ Bad - exposing technical details
setErrorMessage(error.toString());
```

### 4. Type Your API Responses

```typescript
// ✅ Good
interface Tour {
  id: string;
  title: string;
  distance: number;
}

const response = await apiClient.get<Tour[]>('/tours');
const tours: Tour[] = response.data;

// ❌ Bad - no typing
const response = await apiClient.get('/tours');
const tours = response.data as any;
```

### 5. Use Loading and Error States

```typescript
// ✅ Good
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleSubmit = async (data) => {
  setLoading(true);
  setError(null);
  try {
    await apiClient.post('/tours', data);
  } catch (err) {
    setError(err instances Error ? err.message : 'Error');
  } finally {
    setLoading(false);
  }
};

return (
  <div>
    {loading && <Spinner />}
    {error && <ErrorMessage message={error} />}
    <button disabled={loading}>Submit</button>
  </div>
);

// ❌ Bad - no feedback to user
const handleSubmit = async (data) => {
  await apiClient.post('/tours', data);
};
```

### 6. Keep Components Small and Focused

```typescript
// ✅ Good - separate concerns
export const LoginPage = () => <LoginForm />;

export const LoginForm = () => {
  // Form state and handlers
};

export const PasswordStrengthIndicator = ({ password }) => {
  // Just shows strength
};

// ❌ Bad - everything in one component
export const LoginPage = () => {
  // Form validation, password strength, styling, etc.
};
```

### 7. Document Complex Logic

```typescript
// ✅ Good - clear documentation
/**
 * Validates email domain against allowed domains list
 * @param email - Email address to validate
 * @param allowedDomains - List of allowed domains from backend
 * @returns true if domain is allowed, false otherwise
 */
export const isEmailDomainAllowed = (email: string, allowedDomains: string[]): boolean => {
  const [, domain] = email.split('@');
  return domain ? allowedDomains.includes(domain) : false;
};

// ❌ Bad - no documentation
const checkEmail = (e, d) => {
  const [, d2] = e.split('@');
  return d2 ? d.includes(d2) : false;
};
```

## Resources

- **API Documentation:** [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)
- **Setup Checklist:** [INTEGRATION_CHECKLIST.md](./INTEGRATION_CHECKLIST.md)
- **Coding Standards:** [../../.github/copilot-instructions.md](../../.github/copilot-instructions.md)
- **React Documentation:** [https://react.dev](https://react.dev)
- **TypeScript Handbook:** [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs)

---

**Last Updated:** 2025-03-10
**Version:** 1.0.0
