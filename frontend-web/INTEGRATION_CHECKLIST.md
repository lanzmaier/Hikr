# Frontend Integration Checklist

This checklist outlines the steps to fully integrate the authentication system with the Hikr backend and complete the setup.

## Backend Prerequisites ✅

Before starting frontend integration, ensure the backend has:

- [ ] Spring Boot server running on `http://localhost:8080`
- [ ] Keycloak configured as OAuth2/OIDC provider
- [ ] Following endpoints implemented:
  - [ ] `POST /api/v1/auth/login` - User login
  - [ ] `POST /api/v1/auth/refresh` - Token refresh
  - [ ] `GET /api/v1/auth/allowed-domains` - Get allowed email domains
  - [ ] `POST /api/v1/registration` - User registration
  - [ ] `GET /api/v1/users/me` - Get current user profile
- [ ] CORS configured to accept frontend requests
- [ ] Database migrations applied

## Frontend Setup ✅

### 1. Project Structure ✅
- [x] `src/types/` - Type definitions
- [x] `src/services/` - API client & auth service
- [x] `src/context/` - Auth context & provider
- [x] `src/hooks/` - Custom hooks (useAuth)
- [x] `src/components/` - Reusable components (LoginForm, RegistrationForm, ProtectedRoute)
- [x] `src/pages/` - Page components (LoginPage, RegistrationPage, DashboardPage)
- [x] `src/utils/` - Utility functions
- [x] Configuration files (tsconfig, vite config, etc.)

### 2. Environment Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Update `VITE_API_URL` if backend is on different port
- [ ] Install dependencies: `npm install`

### 3. Development Server
- [ ] Start development server: `npm run dev`
- [ ] Server runs on `http://localhost:5173`
- [ ] API proxy configured in vite.config.ts

### 4. Testing
- [ ] Run tests: `npm run test`
- [ ] Run linting: `npm run lint`
- [ ] Check types: `npm run build` (tsc check)

## Integration Steps 📋

### Step 1: Verify Backend Connectivity
```bash
# Test if backend API is reachable
curl http://localhost:8080/api/v1/auth/allowed-domains
```

Expected response:
```json
{
  "domains": ["example.com", "company.com", "...]
}
```

### Step 2: Test Login Flow
1. Start frontend: `npm run dev`
2. Navigate to `http://localhost:5173/register`
3. Register a test user
4. Navigate to `http://localhost:5173/login`
5. Login with test credentials
6. Should redirect to `/dashboard`
7. Check browser console for any errors

### Step 3: Verify Token Storage
In browser DevTools Console:
```javascript
localStorage.getItem('hikr_access_token')  // Should return JWT token
localStorage.getItem('hikr_refresh_token') // Should return refresh token
```

### Step 4: Test Token Refresh
1. Wait for token to expire (backend timeout)
2. Make API request
3. Should automatically refresh token and retry
4. Check `hikr_access_token` changed

### Step 5: Test Protected Routes
1. Login and go to `/dashboard`
2. Clear tokens: `localStorage.clear()`
3. Refresh page
4. Should redirect to login page

## Customization Checklist 🎨

### Styling
- [ ] Update color scheme in `src/index.css`
- [ ] Customize form styles
- [ ] Add Hikr logo/branding
- [ ] Set proper color values in Tailwind config

### Components
- [ ] Replace placeholder dashboard with real content
- [ ] Add more protected routes
- [ ] Implement tour listing/search
- [ ] Implement matching functionality
- [ ] Add user profile page

### Features to Add
- [ ] Forgot password flow
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login (OAuth2)
- [ ] Terms & conditions modal
- [ ] Privacy policy
- [ ] Session timeout warning

## Code Quality ✅

### TypeScript
- [x] All components have proper types
- [x] No `any` types used
- [x] Strict mode enabled
- [x] Path aliases configured (`@` = `src`)

### Testing
- [x] Example test file included
- [ ] Add tests for all auth flows
- [ ] Add tests for form components
- [ ] Add integration tests
- [ ] Target >80% coverage

### Code Style
- [x] ESLint configured
- [x] Prettier configured
- [ ] Run linting: `npm run lint`
- [ ] Format code: `npm run format` (add to package.json)

### Documentation
- [x] Authentication guide
- [x] Component documentation
- [x] API types documented
- [ ] README.md with quick start
- [ ] Contributing guidelines

## Security Checklist 🔐

### Authentication
- [x] JWT tokens properly handled
- [x] Authorization header added to requests
- [x] Token refresh on 401 response
- [x] Logout clears tokens

### Data Protection
- [x] Passwords hashed on backend
- [x] HTTPS recommended for production
- [ ] Implement rate limiting (backend)
- [ ] Implement CSRF protection (backend)

### Form Validation
- [x] Client-side validation
- [x] Password strength checker
- [x] Email domain validation
- [ ] Backend validation (verify on server)
- [ ] Sanitize user input

## Performance Optimization ⚡

- [ ] Code splitting by route
- [ ] Lazy load components
- [ ] Optimize images
- [ ] Implement caching strategy
- [ ] Monitor bundle size: `npm run build` and check `dist/`

## Deployment Checklist 🚀

### Build
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All tests pass

### Environment
- [ ] Production API URL configured
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] CORS properly configured

### Monitoring
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Analytics configured
- [ ] Performance monitoring
- [ ] Logging configured

## Troubleshooting Guide 🔧

### Common Issues

#### 1. CORS Error when login
**Problem:** Cross-Origin Request Blocked

**Solution:**
- Check backend CORS configuration
- Verify frontend URL is allowed
- Check `http://localhost:5173` is allowed

#### 2. Token not persisting
**Problem:** User logged out after refresh

**Solution:**
- Check localStorage is not cleared by browser
- Check token expiration time
- Verify refresh token endpoint works

#### 3. Infinite redirect loop
**Problem:** Login → Redirect → Login → ...

**Solution:**
- Check backend login response format
- Verify user profile endpoint returns correct data
- Check auth context initialization

#### 4. 401 on protected routes
**Problem:** Token valid but still getting 401

**Solution:**
- Verify token format: `Bearer ...`
- Check Authorization header in Network tab
- Verify backend validates token correctly

## Next Steps 📝

### Immediate (This Week)
1. [ ] Deploy and test with backend
2. [ ] Fix any integration issues
3. [ ] Add error handling refinements

### Short Term (This Month)
1. [ ] Implement forgot password flow
2. [ ] Add email verification
3. [ ] Implement tour listing page
4. [ ] Add user profile management

### Medium Term (This Quarter)
1. [ ] Implement matching functionality
2. [ ] Add tour creation/editing
3. [ ] Implement notifications
4. [ ] Add mobile-responsive design

### Long Term
1. [ ] Implement mobile app (React Native)
2. [ ] Add offline functionality
3. [ ] Implement advanced matching algorithm
4. [ ] Add social features (reviews, ratings, etc.)

## Support & Resources

- **Documentation:** See `AUTHENTICATION_GUIDE.md`
- **Backend API:** See OpenAPI spec in `shared-resources/api-contracts/openapi.yaml`
- **Development:** See `docs/guides/DEVELOPMENT-GUIDE.md`
- **Architecture:** See `docs/architecture/ARCHITECTURE.md`
- **Issues:** Create issues in GitHub with label `frontend-web`

---

**Last Updated:** 2025-03-10
**Status:** Initial Implementation Complete ✅
