# Hikr - System-Architektur

## Überblick

Hikr ist eine Fullstack-Plattform zur Planung und Durchführung von Gruppentouren. Das System folgt einer Mono-Repository-Struktur mit klarer Trennung von Frontend-, Backend- und gemeinsamen Ressourcen.

## Komponenten-Übersicht

### Backend
- **Framework:** Spring Boot
- **Sprache:** Java 21
- **Datenbanktyp:** PostgreSQL (empfohlen)
- **Authentifizierung:** JWT
- **API:** RESTful, OpenAPI-Spezifikation

**Verantwortlichkeiten:**
- Tour-Verwaltung (Touren anlegen, aktualisieren, löschen)
- Geplante Touren-Management
- Matching & Gruppenbildung
- Benutzer-Authentifizierung und -Verwaltung

### Frontend Web
- **Framework:** React 18+
- **Sprache:** TypeScript
- **Build Tool:** Vite
- **State Management:** React Query / Zustand
- **Styling:** Tailwind CSS / CSS-in-JS

**Verantwortlichkeiten:**
- Tourensuche und Filterung
- Tourendetail-Ansicht
- Geplante Touren-Übersicht
- Matching & Gruppenbildung
- Benutzer-Management

### Frontend Mobile
- **Framework:** React Native (TypeScript)
- **Plattformen:** iOS & Android
- **Navigation:** React Navigation
- **State Management:** React Query / Context API
- **Styling:** Native Base / React Native Paper

**Verantwortlichkeiten:**
- Native Tourenerkundung
- Geplante Touren mit Offline-Unterstützung
- Matching auf Mobilgeräten
- Push-Benachrichtigungen

## Deployment-Architektur

```
┌─────────────────────────────────────────────────────────┐
│                    Internet / Users                      │
└────────┬────────────────────────────┬────────────────────┘
         │                            │
    ┌────▼────┐              ┌───────▼────────┐
    │ Web App │              │  Mobile App    │
    │(React)  │              │(React Native)  │
    └────┬────┘              └────────┬───────┘
         │                            │
         └───────────┬────────────────┘
                     │
              ┌──────▼─────────┐
              │  API Gateway   │
              │  (Load Balancer)
              └──────┬──────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼────────┐       ┌─────▼──────┐
    │   Spring    │       │   Spring   │
    │   Boot App  │       │   Boot App │
    │ (Replica 1) │       │ (Replica 2)│
    └────┬────────┘       └─────┬──────┘
         │                      │
         └──────────┬───────────┘
                    │
         ┌──────────▼───────────┐
         │    PostgreSQL        │
         │    Database          │
         └──────────────────────┘
```

## Datenfluss

### Tour-Suche
1. User gibt Such-Kriterien in Web/Mobile ein
2. Frontend sendet GET `/api/v1/tours?location=...&difficulty=...`
3. Backend filtert Touren aus Datenbank
4. Frontend zeigt Ergebnisse mit Map-Visualisierung

### Geplante Tour erstellen
1. User wählt Tour und Datum aus
2. Frontend sendet POST `/api/v1/planned-tours`
3. Backend erstellt Planned Tour Aggregate
4. Matching-Engine wird benachrichtigt

### Matching & Gruppenbildung
1. User können Angebote/Gesuche für geplante Tour einreichen
2. Matching-Service analysiert Profile und Präferenzen
3. Vorschläge werden berechnet und dem User angezeigt
4. User können Gruppen-Vorschlag akzeptieren oder ablehnen

## Datenbankschema (Überblick)

```
users
├── id (UUID)
├── username (VARCHAR)
├── email (VARCHAR)
├── password_hash (VARCHAR)
└── location (POINT)

tours
├── id (UUID)
├── title (VARCHAR)
├── start_point (POINT)
├── end_point (POINT)
├── distance (DECIMAL)
├── duration_minutes (INTEGER)
├── difficulty (ENUM)
└── created_by (FK users.id)

planned_tours
├── id (UUID)
├── tour_id (FK tours.id)
├── scheduled_date (DATE)
├── scheduled_time (TIME)
└── created_by (FK users.id)

matching
├── id (UUID)
├── planned_tour_id (FK planned_tours.id)
├── status (ENUM: PENDING, PROCESSING, COMPLETED)
└── created_at (TIMESTAMP)

matching_requests
├── id (UUID)
├── matching_id (FK matching.id)
├── user_id (FK users.id)
├── type (ENUM: OFFER, SEARCH)
└── criteria (JSONB)
```

## Shared Resources

### API-Contracts
- **Dateort:** `shared-resources/api-contracts/openapi.yaml`
- **Single Source of Truth** für alle API-Operationen
- Wird verwendet zur Code-Generierung in Web und Mobile

### Design Tokens
- **Dateort:** `shared-resources/design-tokens/tokens.json`
- Zentrale Definition von Farben, Typografie, Abstände
- Sichert visuelle Konsistenz über alle Plattformen

### Dokumentation
- **Dateort:** `shared-resources/documentation/`
- Architecture Decision Records (ADRs)
- API-Dokumentation
- Development Guides

## Development-Workflow

### Initial Setup
```bash
# Repository klonen
git clone https://github.com/hikr/hikr.git
cd hikr

# Full Workspace öffnen
code hikr-full.code-workspace
```

### Tasks ausführen
```bash
# Ctrl+Shift+P -> Tasks: Run Task
- backend: install     # Maven dependencies
- web: install         # npm dependencies
- mobile: install      # npm dependencies
- backend: run         # Spring Boot server
- web: dev            # Vite dev server
- mobile: android     # React Native auf Android
```

### Feature-Entwicklung (API-First)
1. OpenAPI-Spec aktualisieren (`shared-resources/api-contracts/openapi.yaml`)
2. Backend-Endpoint implementieren
3. API-Clients neu generieren
4. Frontend-UI implementieren

### Git-Workflow
```bash
# Feature-Branch
git checkout -b feature/tour-search

# Atomare Commits pro Komponente
git add shared-resources/api-contracts/
git commit -m "api: add tour search endpoints"

git add backend/
git commit -m "backend: implement tour search service"

git add frontend-web/
git commit -m "web: implement tour search UI"

git add frontend-mobile/
git commit -m "mobile: implement tour search UI"

git push origin feature/tour-search
```

## Best Practices

### Code-Stil
- **Web/Mobile:** ESLint + Prettier (TypeScript)
- **Backend:** Checkstyle + Spring conventions (Java)
- Formatierung: `editor.formatOnSave: true`

### Testing-Strategie
- **Unit Tests:** Für Business-Logic
- **Integration Tests:** Für APIs
- **E2E Tests:** Für kritische Flows

### Versionierung
- **Backend API:** Semantische Versionierung (MAJOR.MINOR.PATCH)
- **Breaking Changes:** Neue API-Version als neuer Endpoint
- **Deprecation:** Mindestens 2 Versionen vorher ankündigen

## Sicherheit

- **Authentifizierung:** JWT-Tokens
- **Autorisierung:** Rolle-basiert (ADMIN, USER, ORGANIZER)
- **HTTPS:** In Production erzwungen
- **CORS:** Nur trusted domains
- **Input Validation:** Server-seitig validiert

## Performance-Optimierung

- **Caching:** Redis für häufige Abfragen
- **Database Indexing:** Auf `location`, `difficulty`, `scheduled_date`
- **Pagination:** Alle List-Endpoints unterstützen `skip`/`limit`
- **Lazy Loading:** Komponenten-basiert in Web und Mobile

## Quellen

- [Mono-Repository und Multi-Root Workspaces](../../../docs/2.3-Mono-Repository-und-Multi-Root-Workspaces.md)
- [API Dokumentation](openapi.yaml)
- OpenAPI 3.0 Specification
