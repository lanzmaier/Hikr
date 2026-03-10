# Hikr Web Frontend

React + TypeScript web application for discovering and joining hiking tours.

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/hikr/hikr.git
   cd frontend-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Update VITE_API_URL if backend is on different port
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests in watch mode
- `npm run test:ci` - Run tests once with coverage report

### Project Structure

```
frontend-web/
├── src/
│   ├── components/       # Reusable components
│   ├── context/          # React Context (Auth)
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   ├── services/         # API & business logic
│   ├── types/            # TypeScript types & DTOs
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vitest.config.ts
├── vite.config.ts
└── README.md
```

## Features

### Authentication ✅
- Login with email/password
- User registration with domain validation
- Automatic token refresh
- Protected routes
- Session persistence

### Form Handling ✅
- Real-time validation
- Password strength indicator
- Email domain validation
- Error display
- Loading states

### API Integration ✅
- Axios HTTP client with interceptors
- Automatic token refresh on 401
- Consistent error handling
- Request/response logging

### Security ✅
- JWT token management
- Authorization headers
- Protected routes
- Form validation
- CORS protection

## Documentation

- **[Authentication Guide](./AUTHENTICATION_GUIDE.md)** - Architecture & implementation details
- **[Integration Checklist](./INTEGRATION_CHECKLIST.md)** - Setup & deployment guide
- **Main Dev Guide** - See [docs/guides/DEVELOPMENT-GUIDE.md](../docs/guides/DEVELOPMENT-GUIDE.md)

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript 5
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **State Management:** React Context + Zustand
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Routing:** React Router 6
- **Linting:** ESLint + Prettier

## Backend Integration

The frontend is configured to communicate with a Spring Boot backend using OAuth2/OIDC.

**Default API URL:** `http://localhost:8080/api/v1`

**Required Endpoints:**
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `GET /auth/allowed-domains` - Allowed email domains
- `POST /registration` - User registration
- `GET /users/me` - Current user profile

See [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) for detailed API documentation.

## Code Style

This project follows the Hikr coding standards:

- **Naming:** PascalCase for components, camelCase for functions
- **Types:** Strong typing with TypeScript (no `any`)
- **Components:** Functional components with hooks
- **Error Handling:** Try-catch with meaningful messages
- **Comments:** JSDoc for public APIs and complex logic

See [Copilot Instructions](../.github/copilot-instructions.md) for complete style guide.

## Testing

### Run All Tests
```bash
npm run test
```

### Run Tests with Coverage
```bash
npm run test:ci
```

### View Test UI
```bash
npm run test -- --ui
```

### Write Tests
Tests are located in `__tests__` or `.test.ts` files next to source code:

```typescript
import { describe, it, expect } from 'vitest';

describe('Component', () => {
  it('should render correctly', () => {
    expect(true).toBe(true);
  });
});
```

## Deployment

### Production Build
```bash
npm run build
```

Build output is in `dist/` directory.

### Environment Variables
```
VITE_API_URL=https://api.hikr.example.com/v1
```

### Deploy to Vercel/Netlify
Push to GitHub and connect repository to Vercel/Netlify for automatic deployments.

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### CORS Errors
Check backend CORS configuration and verify `http://localhost:5173` is allowed.

### Token Refresh Issues
1. Check backend token endpoint returns valid response
2. Verify refresh token is stored in localStorage
3. Check browser Network tab for response format

See [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md#troubleshooting-guide-🔧) for more solutions.

## Contributing

1. Follow the [Hikr Coding Standards](../.github/copilot-instructions.md)
2. Create feature branches: `git checkout -b feature/tour-search`
3. Write tests for new features
4. Ensure linting passes: `npm run lint`
5. Submit pull request with description

## Support

- **Issues:** [GitHub Issues](https://github.com/hikr/hikr/issues)
- **Documentation:** See [docs/](../docs/) folder
- **Team:** @Hikr Team

## License

MIT License - See [LICENSE](../LICENSE)

---

**Last Updated:** 2025-03-10
**Version:** 1.0.0
