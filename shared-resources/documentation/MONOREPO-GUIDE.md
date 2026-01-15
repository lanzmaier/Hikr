# Mono-Repository und Multi-Root Workspaces

Orientierungsdokumentation zur Struktur des Hikr-Repositories basierend auf Best Practices von Mono-Repository-Verwaltung.

## Grundprinzipien

Ein **Mono-Repository** ist ein einzelnes Git-Repository, das mehrere zusammenhängende Projekte oder Komponenten enthält. Dies ermöglicht:

✅ **Zentrale Code-Verwaltung:** Alle Projektteile an einem Ort  
✅ **Code-Sharing:** Gemeinsame Utilities und Konfigurationen ohne Duplikation  
✅ **Koordinierte Entwicklung:** API-Änderungen sind sofort in allen Clients sichtbar  
✅ **Vereinfachte Dependency-Verwaltung:** Einheitliche Tool-Versionen  
✅ **Konsistente Standards:** Gemeinsame Code-Formatierung und Konventionen  

## Repository-Struktur von Hikr

```
hikr/
├── frontend-web/                # React Web-App für Touren-Suche
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── frontend-mobile/             # React Native App (iOS/Android)
│   ├── src/
│   ├── ios/
│   ├── android/
│   ├── package.json
│   └── app.json
├── backend/                     # Spring Boot Backend
│   ├── src/main/java/
│   ├── src/test/java/
│   ├── pom.xml
│   └── mvnw
├── shared-resources/            # Gemeinsame Ressourcen
│   ├── api-contracts/           # OpenAPI-Spezifikationen
│   │   └── openapi.yaml
│   ├── design-tokens/           # Design-System
│   │   ├── tokens.json
│   │   └── README.md
│   └── documentation/           # Cross-Platform Dokumentation
│       ├── ARCHITECTURE.md
│       ├── DEVELOPMENT-GUIDE.md
│       ├── GLOSSAR.md
│       └── MONOREPO-GUIDE.md
├── docs/                        # Zusätzliche Dokumentation
│   ├── 2.3-Mono-Repository-und-Multi-Root-Workspaces.md
│   └── hikr_glossar.md
├── infra/                       # Docker, Terraform (Infrastruktur)
│   └── docker-compose.yml
├── .github/workflows/           # CI/CD Pipelines
│   ├── mobile.yml
│   ├── web.yml
│   └── backend.yml
├── .vscode/                     # VS Code Konfiguration
│   ├── tasks.json              # Tasks für alle Projekte
│   ├── launch.json             # Debug-Konfigurationen
│   ├── settings.json           # Globale Einstellungen
│   └── extensions.json         # Empfohlene Extensions
├── .gitignore
├── CODEOWNERS
├── README.md
├── hikr-full.code-workspace     # Full-Stack Development
├── hikr-web.code-workspace      # Nur Web-Development
├── hikr-mobile.code-workspace   # Nur Mobile-Development
└── hikr-backend.code-workspace  # Nur Backend-Development
```

## Multi-Root Workspaces in VS Code

Multi-Root Workspaces ermöglichen es, mehrere Ordner in einer VS Code-Instanz zu öffnen. Wir nutzen mehrere Workspace-Konfigurationen:

### Full Workspace
```bash
code hikr-full.code-workspace
```
**Nutzung:** Cross-Platform-Entwicklung, API-Änderungen über alle Clients  
**Ordner:** ., frontend-web, frontend-mobile, backend

### Focused Workspaces
```bash
# Web Development
code hikr-web.code-workspace

# Mobile Development
code hikr-mobile.code-workspace

# Backend Development
code hikr-backend.code-workspace
```
**Nutzen:** Bessere Performance, weniger visueller Clutter, spezialisierte Extensions

## Zentrale VS Code-Konfiguration

### tasks.json - Projektübergreifende Tasks
Definiert Tasks für alle Projektteile mit korrektem Working Directory (`cwd`):

```json
{
  "label": "web: dev",
  "command": "npm run dev",
  "options": {
    "cwd": "${workspaceFolder:hikr}/frontend-web"
  },
  "isBackground": true
}
```

**Ausführung:** `Ctrl+Shift+P` → `Tasks: Run Task` → Task auswählen

### launch.json - Cross-Platform Debugging
Ermöglicht simultanes Debugging mehrerer Komponenten:

```json
{
  "compounds": [
    {
      "name": "Full Stack: Web + Backend",
      "configurations": ["web: Chrome", "backend: Spring Boot"]
    }
  ]
}
```

**Ausführung:** `Run and Debug` → `Full Stack: Web + Backend`

### settings.json - Globale Einstellungen
- Formatter: Prettier (für Web/Mobile), Java Formatter (Backend)
- File Exclusion: node_modules, build, target
- Auto-Save und Format-on-Save aktiviert

### extensions.json - Empfohlene Extensions
VS Code schlägt automatisch folgende Extensions vor:
- Prettier, ESLint (Web)
- React Native Tools (Mobile)
- Extension Pack for Java (Backend)
- GitLens (Allgemein)

## Shared Resources: Code-Sharing

### 1. API-Contracts (OpenAPI)
**Dateort:** `shared-resources/api-contracts/openapi.yaml`

**Single Source of Truth** für alle API-Operationen. Wird verwendet zur Code-Generierung:

```bash
# Web-Client generieren
npx openapi-generator-cli generate \
  -i ../shared-resources/api-contracts/openapi.yaml \
  -g typescript-axios \
  -o src/generated/api

# Mobile-Client generieren
npx openapi-generator-cli generate \
  -i ../shared-resources/api-contracts/openapi.yaml \
  -g typescript-axios \
  -o src/generated/api
```

### 2. Design Tokens
**Dateort:** `shared-resources/design-tokens/tokens.json`

Zentrale Definition von Farben, Typografie, Abstände:

```json
{
  "colors": {
    "primary": "#2E7D32",
    "secondary": "#FF6F00"
  },
  "typography": {
    "fontFamily": "Roboto"
  }
}
```

Verwendung in:
- **Web:** CSS Variables
- **Mobile:** React Native Theme
- **Design:** Figma Tokens

### 3. Gemeinsame Dokumentation
**Dateort:** `shared-resources/documentation/`

- `ARCHITECTURE.md` - Systemarchitektur
- `DEVELOPMENT-GUIDE.md` - Entwicklungsleitfaden
- `GLOSSAR.md` - Domänen-Glossar

## CI/CD für Mono-Repositories

Effiziente CI/CD durch **path-basierte Triggers** - nur geänderte Komponenten werden gebaut:

### Mobile Workflow (.github/workflows/mobile.yml)
```yaml
on:
  push:
    paths:
      - "frontend-mobile/**"
      - "shared-resources/api-contracts/**"
```
Triggert nur bei Änderungen in `frontend-mobile/` oder Änderungen der API

### Web Workflow (.github/workflows/web.yml)
```yaml
on:
  push:
    paths:
      - "frontend-web/**"
      - "shared-resources/api-contracts/**"
```

### Backend Workflow (.github/workflows/backend.yml)
```yaml
on:
  push:
    paths:
      - "backend/**"
      - "shared-resources/api-contracts/**"
```

**Vorteile:**
- Effiziente Builds (nur geänderte Komponenten)
- Parallele Ausführung
- Schnelleres Feedback für Entwickler
- Einsparung von CI-Minuten

## Best Practices

### Feature-Entwicklung (API-First)

```bash
# 1. Feature-Branch erstellen
git checkout -b feature/tour-search

# 2. OpenAPI-Spec aktualisieren
git add shared-resources/api-contracts/
git commit -m "api: add tour search endpoints"

# 3. Backend implementieren
git add backend/
git commit -m "backend: implement tour search service"

# 4. API-Clients regenerieren
npx openapi-generator-cli generate ...

# 5. Web UI implementieren
git add frontend-web/
git commit -m "web: implement tour search UI"

# 6. Mobile UI implementieren
git add frontend-mobile/
git commit -m "mobile: implement tour search UI"

# 7. Push und PR
git push origin feature/tour-search
```

### Commit-Konventionen
- `api:` - API/OpenAPI-Spec Änderungen
- `backend:` - Java/Spring Boot Code
- `web:` - React/Web Code
- `mobile:` - React Native/Mobile Code
- `shared:` - Gemeinsame Ressourcen
- `ci:` - GitHub Actions/CI-Pipelines
- `docs:` - Dokumentation

### Code-Ownership (CODEOWNERS)
```
# Backend Team
/backend/   @backend-team

# Frontend Teams
/frontend-web/   @frontend-team
/frontend-mobile/   @mobile-team

# Shared Resources (alle Teams)
/shared-resources/   @backend-team @frontend-team @mobile-team
```

Änderungen an `shared-resources/` erfordern Approvals von allen Teams!

## Namenskonventionen über Plattformen

| Konzept | Backend (Java) | Web (TypeScript) | Mobile (React Native) |
|---------|---|---|---|
| Entity | `Tour.java` | `Tour.ts` | `Tour.ts` |
| Service | `TourService.java` | `TourService.ts` | `TourService.ts` |
| Controller/Screen | `TourController.java` | `TourPage.tsx` | `TourScreen.tsx` |
| API | `GET /api/v1/tours` | `useTours()` hook | `useTours()` hook |

## Performance-Optimierung

### VS Code Performance mit großem Repo
1. **Focused Workspaces nutzen:** Nur relevante Dateien indexieren
2. **File Watchers limitieren:**
   ```json
   {
     "files.watcherExclude": {
       "**/node_modules/**": true,
       "**/build/**": true,
       "**/target/**": true
     }
   }
   ```
3. **Extensions selektiv aktivieren:** Nur in relevanten Workspaces

### Build-Performance
1. **Shallow Clones:** `git clone --depth 1`
2. **Selektive Builds:** Nur geänderte Komponenten (CI/CD)
3. **Caching:** Maven/npm cache nutzen
4. **Parallel Builds:** CI-Runner parallel konfigurieren

## Wann ist ein Mono-Repository geeignet?

✅ **Geeignet für:**
- Fullstack-Projekte mit mehreren Clients (Web, Mobile) und Backend
- Teams, die eng zusammenarbeiten
- Projekte mit vielen gemeinsamen Abhängigkeiten
- Koordinierte Feature-Entwicklung über Plattformen

❌ **Nicht ideal für:**
- Vollständig unabhängige Projekte ohne Code-Sharing
- Sehr große Projekte mit hunderten von Microservices
- Teams mit strikter Codebasis-Trennung

## Checkliste für Hikr

- [x] Repository-Struktur mit `frontend-web/`, `frontend-mobile/`, `backend/`, `shared-resources/`
- [x] Workspace-Dateien erstellt: `hikr-full.code-workspace`, `hikr-web.code-workspace`, etc.
- [x] `.vscode/tasks.json` mit allen wichtigen Tasks konfiguriert
- [x] `.vscode/launch.json` mit Debug-Konfigurationen eingerichtet
- [x] `.vscode/extensions.json` mit empfohlenen Extensions erstellt
- [ ] OpenAPI-Spec in `shared-resources/api-contracts/openapi.yaml` definiert ✓
- [ ] GitHub Actions Workflows für `mobile`, `web`, `backend` konfiguriert
- [ ] `.gitignore` für alle Technologien (Node, Maven) angepasst
- [ ] `CODEOWNERS` Datei für Code-Ownership erstellt
- [ ] Pull Request Template angelegt

## Ressourcen

- [VS Code Multi-root Workspaces Documentation](https://code.visualstudio.com/docs/editor/multi-root-workspaces)
- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.3)
- [GitHub Actions Workflow Triggers](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow)
- [Mono-Repository Tools: Nx, Turborepo, Bazel](https://monorepo.tools/)
