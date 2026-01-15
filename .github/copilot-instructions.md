# Hikr - Copilot Global Instructions

Diese Datei enthält zentrale Coding-Standards, Namenskonventionen und Richtlinien für das gesamte Hikr-Team.

## 1. Allgemeine Coding-Standards

### Namenskonventionen

**Backend (Java/Spring Boot):**
- Klassen: `PascalCase` (z.B. `TourController`, `TourService`)
- Methoden: `camelCase` (z.B. `getTourById()`, `createTour()`)
- Konstanten: `UPPER_SNAKE_CASE` (z.B. `MAX_TOUR_DISTANCE`)
- Packages: `com.hikr.<domain>.<subdomain>` (z.B. `com.hikr.tours.api`)

**Frontend Web (React/TypeScript):**
- Komponenten: `PascalCase` (z.B. `TourCard`, `SearchPage`)
- Hooks: `camelCase` mit `use` Prefix (z.B. `useTourSearch()`)
- Utilities: `camelCase` (z.B. `formatDistance()`)
- Constants: `UPPER_SNAKE_CASE` (z.B. `API_BASE_URL`)

**Frontend Mobile (React Native):**
- Screens: `PascalCase` mit `Screen` Suffix (z.B. `TourListScreen`)
- Components: `PascalCase` (z.B. `TourCard`)
- Hooks: `camelCase` mit `use` Prefix
- Styles: `PascalCase` mit `Styles` Suffix (z.B. `TourCardStyles`)

### Error Handling

**Backend:**
```java
try {
    // Business Logic
} catch (SpecificException e) {
    log.error("Specific error context", e);
    throw new DomainException("User-friendly message", e);
} catch (Exception e) {
    log.error("Unexpected error", e);
    throw new InternalServerException("An error occurred", e);
}
```

**Frontend (Web & Mobile):**
```typescript
try {
    const result = await apiCall();
    return result;
} catch (error) {
    logger.error('Failed to fetch tours', { error, context });
    throw new ApiError('Could not load tours', error);
}
```

### Logging

**Backend:**
```java
log.debug("Starting tour search with params: {}", params);
log.info("Tour created successfully with ID: {}", tourId);
log.warn("No parking available for tour: {}", tourId);
log.error("Database connection failed", exception);
```

**Frontend:**
```typescript
Logger.debug('Rendering tour list', { tourCount: tours.length });
Logger.info('Tour selected by user', { tourId });
Logger.warn('API response slower than expected', { duration });
Logger.error('Failed to load tours', { error });
```

## 2. API Design (OpenAPI-First)

- Alle API-Endpoints müssen in `shared-resources/api-contracts/openapi.yaml` definiert sein
- Request/Response Schemas müssen dokumentiert sein
- Error Responses müssen standardisiert sein (HTTP Status Codes)
- Versionierung: `/api/v1/` als Basis-Path

### Standard-Responses

```yaml
Success: 200 OK | 201 Created
Client Error: 400 Bad Request | 401 Unauthorized | 403 Forbidden | 404 Not Found
Server Error: 500 Internal Server Error
```

## 3. Git-Workflow & Commit-Konventionen

### Branch-Naming
- Features: `feature/tour-search` (kebab-case)
- Bugfixes: `bugfix/login-form`
- Hotfixes: `hotfix/critical-api-issue`
- Documentation: `docs/api-guide`

### Commit-Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `api` - API/OpenAPI-Spec Änderungen
- `backend` - Java/Spring Boot Code
- `web` - React Code
- `mobile` - React Native Code
- `shared` - Gemeinsame Ressourcen
- `ci` - GitHub Actions/CI
- `docs` - Dokumentation
- `test` - Test-Code
- `refactor` - Refactoring
- `perf` - Performance

**Scopes:** `tours`, `matching`, `auth`, `ui`, etc.

**Beispiele:**
```
api: add tour search endpoint
backend(tours): implement distance calculation
web(auth): fix login form validation
mobile(ui): improve button accessibility
test(backend): add tour service tests
docs: update deployment guide
```

## 4. Code Review Standards

### Reviewer Checklist
- [ ] Code folgt Namenskonventionen
- [ ] Error Handling ist vorhanden
- [ ] Logging ist angemessen
- [ ] Tests sind vorhanden (Unit + Integration)
- [ ] Dokumentation ist aktualisiert
- [ ] OpenAPI-Spec ist aktualisiert (falls API-Change)
- [ ] Keine hardcodierten Secrets/Credentials

### Feedback-Kultur
- Konstruktiv und hilfsbereit
- Auf Code fokussieren, nicht auf Person
- Spezifische Verbesserungsvorschläge
- Schnelle Turnarounds (24-48h)

## 5. Testing-Standards

### Coverage-Ziele
- **Unit Tests:** >80% für neue Features
- **Integration Tests:** Alle kritischen APIs
- **E2E Tests:** Kritische User Flows

### Test-Struktur
```
<feature>/
├── __tests__/
│   ├── unit/
│   │   └── <feature>.test.ts
│   ├── integration/
│   │   └── <feature>.integration.test.ts
│   └── e2e/
│       └── <feature>.e2e.test.ts
└── <feature>.ts
```

## 6. Documentation Standards

### Code-Dokumentation
- **Public APIs:** JSDoc / JavaDoc mit Beispiele
- **Complex Logic:** Inline-Kommentare für "Warum", nicht "Was"
- **Types:** TypeScript / Java Types für Self-Documentation

### Datei-Header
```typescript
/**
 * Tour Search Service
 * 
 * Handles tour discovery and filtering based on user criteria
 * such as location, difficulty, and distance.
 * 
 * @author Team
 * @version 1.0
 * @see TourRepository for database operations
 */
```

## 7. Performance-Richtlinien

### Backend
- Datenbank-Queries: Indexe für häufige Filters
- Pagination: Immer implementieren für List-Endpoints
- Caching: Redis für häufig abgerufene Daten
- Async: Für I/O-intensive Operationen

### Frontend
- Component Memoization: `React.memo()` für pure Components
- Lazy Loading: Code-Splitting für große Features
- Image Optimization: Responsive Images mit `srcset`
- State Management: Normalize Redux/Zustand Store

## 8. Security-Standards

### Backend
- JWT Token Validation auf allen Protected Routes
- Input Validation: Server-seitig, nicht nur Client
- SQL Injection Prevention: Parameterized Queries
- CORS: Nur trusted domains

### Frontend
- Token Storage: HttpOnly Cookies, nicht localStorage
- XSS Prevention: Content Sanitization
- CSRF Protection: Token-basiert
- Secret Management: Environment Variables, nicht Code

## 9. Accessibility (a11y)

### Web & Mobile
- WCAG 2.1 Level AA Compliance
- Keyboard Navigation: Vollständig unterstützt
- Screen Reader: Semantisches HTML/ARIA Labels
- Color Contrast: Mindestens 4.5:1 für Text

## 10. Versionierung

### Semantic Versioning (MAJOR.MINOR.PATCH)
- **MAJOR:** Breaking API Changes (Neue API-Version)
- **MINOR:** Neue Features, rückwärts kompatibel
- **PATCH:** Bugfixes, rückwärts kompatibel

### API-Versionierung
- Breaking Changes → neue URL (`/api/v2/`)
- Deprecation: Mindestens 2 Versionen vorher ankündigen

## 11. Team-übergreifende Kommunikation

### Agile Rituale
- **Daily Standup:** 15 min, async oder sync
- **Sprint Planning:** User Stories mit Acceptance Criteria
- **Code Review:** 24h Turnaround
- **Sprint Retrospective:** Lessons Learned dokumentieren

### Issue Labeling
- `type: bug|feature|documentation|refactor`
- `priority: critical|high|medium|low`
- `team: backend|web|mobile|pm`
- `status: backlog|in-progress|review|done`

## 12. Ressourcen & Referenzen

- [Development Guide](../shared-resources/documentation/DEVELOPMENT-GUIDE.md)
- [System Architecture](../shared-resources/documentation/ARCHITECTURE.md)
- [Mono-Repository Guide](../shared-resources/documentation/MONOREPO-GUIDE.md)
- [OpenAPI Specification](../shared-resources/api-contracts/openapi.yaml)

---

**Letzte Aktualisierung:** 2025-01-14
**Gültig für:** Hikr v1.0.0+
