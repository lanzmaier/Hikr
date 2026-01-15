# Hikr - Tour & Matching Platform

> **Eine moderne Fullstack-Plattform zur Planung und Durchführung von Gruppentouren mit KI-gestützter Entwicklung**

![Build Status](https://github.com/hikr/hikr/workflows/Backend%20CI/badge.svg)
![Coverage](https://codecov.io/gh/hikr/hikr/branch/main/graph/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🏔️ Übersicht

Hikr ermöglicht Wanderern, Touren zu entdecken, zu planen und in Gruppen durchzuführen. Die Plattform besteht aus:

- **Web-Frontend:** React + TypeScript (Desktop & Tablet)
- **Mobile-Frontend:** React Native (iOS & Android)
- **Backend:** Spring Boot REST API mit PostgreSQL (Domain-Driven Design)
- **API-First Design:** OpenAPI 3.0 Specification
- **KI-Assistants:** Spezialisierte Agenten für verschiedene Team-Rollen

## 🤖 KI-gestützte Entwicklung

Hikr nutzt spezialisierte KI-Agenten zur Unterstützung der Entwicklung:

- **Backend DDD Agent** → Domain Modelling & Entity Design
- **Business Logic Agent** → Use-Case Implementation
- **Web CDD Agent** → React Component Development
- **Mobile CDD Agent** → React Native Cross-Platform Development
- **Project Manager Agent** → Story Refinement & Sprint Planning

**📖 Schnelle Navigation:**
- 🚀 **Neues Team-Member?** → [ONBOARDING.md](docs/ONBOARDING.md)
- 🔍 **Alle KI-Ressourcen?** → [AI_RESOURCES_INDEX.md](docs/AI_RESOURCES_INDEX.md)
- 📚 **Agent-Dokumentation?** → [AGENTS.md](docs/AGENTS.md)
- 💡 **Spezielle Prompts?** → [workflow-prompts.md](docs/prompts/workflow-prompts.md)

## 📁 Repository-Struktur

```
hikr/
├── frontend-web/           # React Web-App
├── frontend-mobile/        # React Native App
├── backend/               # Spring Boot API
├── shared-resources/      # Gemeinsame Ressourcen
│   ├── api-contracts/     # OpenAPI Spezifikation
│   ├── design-tokens/     # Design System
│   └── documentation/     # Guides & Architektur
├── .vscode/              # VS Code Konfiguration
├── .github/workflows/    # CI/CD Pipelines
└── infra/               # Docker & Deployment
```

Detaillierte Beschreibung: [Mono-Repository Guide](./shared-resources/documentation/MONOREPO-GUIDE.md)

## 🚀 Quick Start

### Voraussetzungen

- **Node.js:** 18.x oder 20.x
- **Java:** 21 (JDK)
- **Maven:** 3.8+
- **Git**
- **VS Code** (empfohlen)

### Installation

```bash
# Repository klonen
git clone https://github.com/hikr/hikr.git
cd hikr

# Full Workspace in VS Code öffnen
code hikr-full.code-workspace

# Alle Extensions installieren (wenn VS Code fragt)
```

### Backends starten

**Terminal 1 - Backend:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
# Server läuft auf http://localhost:8080
```

**Terminal 2 - Web Frontend:**
```bash
cd frontend-web
npm install
npm run dev
# App läuft auf http://localhost:5173
```

**Terminal 3 - Mobile Frontend:**
```bash
cd frontend-mobile
npm install
npm run android  # oder npm run ios
```

### Alternativ mit VS Code Tasks

```
Ctrl+Shift+P → Tasks: Run Task
- backend: install & run
- web: install & dev
- mobile: install & android
```

```

### Alternativ mit VS Code Tasks

```
Ctrl+Shift+P → Tasks: Run Task
- backend: install & run
- web: install & dev
- mobile: install & android
```

## 📖 Dokumentation & Ressourcen

### 🎓 Schnelle Einstiege
| Link | Für wen? |
|------|----------|
| [Team Onboarding](docs/ONBOARDING.md) | Neue Team Member |
| [AGENTS Guide](docs/AGENTS.md) | Alle, die KI-Assistants nutzen wollen |
| [Workflow Prompts](docs/prompts/workflow-prompts.md) | PMs, Developers für strukturierte Tasks |

### 📚 Detaillierte Dokumentation
| Dokument | Beschreibung |
|----------|-------------|
| [Development Guide](./shared-resources/documentation/DEVELOPMENT-GUIDE.md) | Vollständiger Leitfaden für lokale Entwicklung |
| [System Architecture](./shared-resources/documentation/ARCHITECTURE.md) | Architektur, Datenfluss, Deployment |
| [Mono-Repository Guide](./shared-resources/documentation/MONOREPO-GUIDE.md) | Multi-Root Workspaces, Shared Resources, Best Practices |
| [Copilot Instructions](.github/copilot-instructions.md) | Coding Standards & Conventions für alle Teams |
| [API Documentation](./shared-resources/api-contracts/openapi.yaml) | OpenAPI 3.0 Spezifikation (Swagger UI) |
| [Design Tokens](./shared-resources/design-tokens/README.md) | Farben, Typografie, Spacing |
| [Glossar](./shared-resources/documentation/GLOSSAR.md) | Domänen-Begriffe und Business Logic |

## 🛠️ Technologie-Stack

### Backend
- **Framework:** Spring Boot 3.x
- **Language:** Java 21
- **Architecture:** Domain-Driven Design (DDD)
- **API:** RESTful mit OpenAPI 3.0
- **Database:** PostgreSQL
- **Auth:** JWT Tokens
- **Testing:** JUnit 5, Mockito

### Web Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Architecture:** Component-Driven Design (CDD)
- **State:** React Query + Zustand
- **Testing:** Vitest, React Testing Library

### Mobile Frontend
- **Framework:** React Native
- **Language:** TypeScript
- **Architecture:** Component-Driven Design (CDD)
- **Navigation:** React Navigation
- **State:** React Query + Context API
- **UI Components:** React Native Paper / Native Base

## 🔄 Workflows

### Feature-Entwicklung (API-First)

1. **OpenAPI aktualisieren**
   ```bash
   # shared-resources/api-contracts/openapi.yaml
   git commit -m "api: add tour search endpoints"
   ```

2. **Backend implementieren**
   ```bash
   # backend/src/main/java/.../TourController.java
   git commit -m "backend: implement tour search"
   ```

3. **Clients regenerieren**
   ```bash
   npm run generate:api
   ```

4. **Frontend implementieren**
   ```bash
   # frontend-web/src/features/tours/TourSearch.tsx
   git commit -m "web: implement tour search UI"
   ```

### Git-Workflow

```bash
# Feature-Branch
git checkout -b feature/tour-search

# Atomare Commits pro Komponente
git add shared-resources/api-contracts/
git commit -m "api: add search endpoints"

git add backend/
git commit -m "backend: implement service"

git add frontend-web/
git commit -m "web: implement UI"

git push origin feature/tour-search
# Pull Request erstellen
```

**Commit-Konventionen:** `api:` | `backend:` | `web:` | `mobile:` | `shared:` | `ci:` | `docs:`

## 🧪 Testing

```bash
# Backend
cd backend
mvn test              # Unit Tests
mvn verify            # Integration Tests + Coverage

# Web Frontend
cd frontend-web
npm test              # Watch Mode
npm run test:ci       # CI Mode mit Coverage

# Mobile Frontend
cd frontend-mobile
npm test              # Jest Tests
```

## 🚢 Deployment

### Docker
```bash
docker-compose up
# oder: docker-compose -f infra/docker-compose.prod.yml up
```

## 🔐 Sicherheit

- **HTTPS:** In Production erzwungen
- **Authentication:** JWT Tokens
- **Authorization:** Rollenbasiert (ADMIN, USER, ORGANIZER)
- **Input Validation:** Server-seitig
- **CORS:** Nur trusted domains
- **Secrets:** Nicht in Git committed (`.env`)

## 📊 CI/CD

GitHub Actions automatisiert Tests und Deployment:

| Workflow | Trigger | Aktion |
|----------|---------|--------|
| **web.yml** | `frontend-web/**` | npm build & test |
| **mobile.yml** | `frontend-mobile/**` | npm build & test |
| **backend.yml** | `backend/**` | mvn verify & deploy |

**Path-basierte Trigger:** Nur betroffene Komponenten werden gebaut

## 👥 Teams & Code-Ownership

```
backend/            → @backend-team
frontend-web/       → @frontend-team
frontend-mobile/    → @mobile-team
shared-resources/   → @all-teams (Approval erforderlich)
```

Siehe [CODEOWNERS](./CODEOWNERS)

## 📝 Workspace-Strategien

Mehrere `.code-workspace` Dateien für unterschiedliche Entwicklungs-Szenarien:

```bash
code hikr-full.code-workspace      # Alle Komponenten (Cross-Platform)
code hikr-web.code-workspace       # Nur Web
code hikr-mobile.code-workspace    # Nur Mobile
code hikr-backend.code-workspace   # Nur Backend
```

## 🐛 Debugging

### VS Code Debugging

**Web + Backend gleichzeitig:**
```
Run and Debug → Full Stack: Web + Backend
```

**Breakpoints:** In VS Code setzen und Code ausführen

## 🤝 Beitragen

1. Dieses Repository forken
2. Feature-Branch erstellen (`git checkout -b feature/awesome`)
3. Änderungen committen mit Konventionen
4. Push und Pull Request erstellen
5. Code-Review abwarten (siehe [CODEOWNERS](./CODEOWNERS))

## 📋 PR Checklist

- [ ] Tests grün
- [ ] Code-Style check erfolgreich
- [ ] Dokumentation aktualisiert
- [ ] Keine Breaking Changes oder Migration-Guide vorhanden
- [ ] OpenAPI-Spec aktualisiert (falls API-Änderung)

Weitere Details: [PR Template](./.github/pull_request_template.md)

## 📄 Lizenz

MIT License - siehe [LICENSE](./LICENSE) für Details

## 📞 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/hikr/hikr/issues)
- **Discussions:** [GitHub Discussions](https://github.com/hikr/hikr/discussions)

---

**Made with ❤️ by the Hikr Team**

**Version:** 1.0.0 | **Last Updated:** 2025-01-14 | **Status:** 🟢 In Active Development