# Hikr - Development Guide

## 🤖 KI-gestützte Entwicklung

Hikr nutzt spezialisierte KI-Agenten zur Unterstützung der Team-Entwicklung.

### Wichtige Ressourcen
- **Globale Standards:** [.github/copilot-instructions.md](.github/copilot-instructions.md)
- **Spezialisierte Agents:** [.github/agents/](.github/agents/)
- **Workflow-Prompts:** [docs/prompts/workflow-prompts.md](docs/prompts/workflow-prompts.md)

### Schnelle Links zu Agents
1. **Backend (DDD):** [backend-ddd.agent.md](.github/agents/backend-ddd.agent.md)
2. **Business Logic:** [business-logic.agent.md](.github/agents/business-logic.agent.md)
3. **Web (React):** [web-cdd.agent.md](.github/agents/web-cdd.agent.md)
4. **Mobile (React Native):** [mobile-cdd.agent.md](.github/agents/mobile-cdd.agent.md)
5. **Project Management:** [project-manager.agent.md](.github/agents/project-manager.agent.md)

### Häufige Workflows
- **Neue Feature:** Issue-Erstellung → Copilot → Story Refinement → PR → Merge
- **Bug-Report:** Strukturiertes Feedback → Bug-Template → Debugging → Fix
- **Sprint-Planung:** Story-Backlog → Refinement → Sprint Planning → Daily Standups

Mehr unter [Workflow-Prompts](docs/prompts/workflow-prompts.md)

---

## Workspace einrichten

### Voraussetzungen
- Node.js 18+
- Java 21 (JDK)
- Maven 3.8+
- Git
- VS Code

### Erste Schritte

```bash
# Repository klonen
git clone https://github.com/hikr/hikr.git
cd hikr

# Full Workspace öffnen (alle Komponenten)
code hikr-full.code-workspace

# Alternative: Nur Web-Frontend
code hikr-web.code-workspace

# Alternative: Nur Mobile-Frontend
code hikr-mobile.code-workspace

# Alternative: Nur Backend
code hikr-backend.code-workspace
```

### Extensions installieren
1. VS Code öffnet Workspace
2. Klick auf "Install All Recommended Extensions"
3. Warten bis Installation fertig

## Backend Setup

### Maven Dependencies installieren
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> backend: install

# Option 2: Terminal
cd backend
mvn clean install
```

### Backend starten
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> backend: run

# Option 2: Terminal
cd backend
mvn spring-boot:run
```

Server läuft dann auf `http://localhost:8080`

### Backend testen
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> backend: test

# Option 2: Terminal
cd backend
mvn test
```

### API dokumentieren
- OpenAPI-Spec in `shared-resources/api-contracts/openapi.yaml` aktualisieren
- Spec ist erreichbar unter `http://localhost:8080/swagger-ui.html`

## Web-Frontend Setup

### Dependencies installieren
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> web: install

# Option 2: Terminal
cd frontend-web
npm install
```

### Dev-Server starten
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> web: dev

# Option 2: Terminal
cd frontend-web
npm run dev
```

Dev-Server läuft dann auf `http://localhost:5173`

### Web testen
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> web: test

# Option 2: Terminal
cd frontend-web
npm test
```

### Web linting
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> web: lint

# Option 2: Terminal
cd frontend-web
npm run lint
```

### Production Build
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> web: build

# Option 2: Terminal
cd frontend-web
npm run build
```

## Mobile-Frontend Setup

### Dependencies installieren
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> mobile: install

# Option 2: Terminal
cd frontend-mobile
npm install
```

### Android-Emulator starten
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> mobile: android

# Option 2: Terminal
cd frontend-mobile
npm run android
```

### iOS Simulator starten
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> mobile: ios

# Option 2: Terminal (macOS only)
cd frontend-mobile
npm run ios
```

### Mobile testen
```bash
# Option 1: VS Code Task
Ctrl+Shift+P -> Tasks: Run Task -> mobile: test

# Option 2: Terminal
cd frontend-mobile
npm test
```

## API-Clients generieren

### Web-Frontend
```bash
# Im frontend-web Verzeichnis
npx openapi-generator-cli generate \
  -i ../shared-resources/api-contracts/openapi.yaml \
  -g typescript-axios \
  -o src/generated/api
```

### Mobile-Frontend
```bash
# Im frontend-mobile Verzeichnis
npx openapi-generator-cli generate \
  -i ../shared-resources/api-contracts/openapi.yaml \
  -g typescript-axios \
  -o src/generated/api
```

## Debugging

### Web-Debugging
1. Chrome DevTools öffnen (F12)
2. Sources-Tab
3. Breakpoints setzen
4. Code-Änderung triggern

Alternativ: VS Code Debugger
1. Debug-Tab öffnen
2. "web: Chrome" Konfiguration starten
3. Breakpoints in VS Code setzen

### Backend-Debugging
1. VS Code Debug-Tab öffnen
2. "backend: Spring Boot" Konfiguration starten
3. Breakpoints in Java-Dateien setzen
4. Request machen, um Breakpoint zu treffen

### Simultanes Debugging
1. Debug-Tab öffnen
2. "Full Stack: Web + Backend" starten
3. Beide Debugger sind aktiv
4. Breakpoints in Web und Backend gleichzeitig

## Code-Struktur

### Backend
```
backend/
├── src/main/java/com/hikr/
│   ├── HikrApplication.java
│   ├── api/
│   │   └── TourController.java
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Tour.java
│   │   └── services/
│   │       └── TourService.java
│   └── infrastructure/
│       ├── repositories/
│       │   └── TourRepository.java
│       └── config/
│           └── AppConfig.java
├── src/test/java/
└── pom.xml
```

### Web-Frontend
```
frontend-web/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── pages/
│   ├── features/
│   │   ├── tours/
│   │   ├── matching/
│   │   └── auth/
│   ├── services/
│   ├── hooks/
│   ├── generated/  (Auto-generiert)
│   │   └── api/
│   └── App.tsx
├── tests/
└── package.json
```

### Mobile-Frontend
```
frontend-mobile/
├── src/
│   ├── components/
│   ├── screens/
│   ├── features/
│   ├── services/
│   ├── hooks/
│   ├── generated/  (Auto-generiert)
│   │   └── api/
│   └── App.tsx
├── __tests__/
└── package.json
```

## Git-Workflow

### Feature entwickeln
```bash
# 1. Feature-Branch erstellen
git checkout -b feature/tour-search

# 2. Änderungen vornehmen (mehrere Commits pro Komponente)
git add shared-resources/api-contracts/
git commit -m "api: add tour search endpoints"

git add backend/
git commit -m "backend: implement tour search service"

git add frontend-web/
git commit -m "web: implement tour search UI"

# 3. Push und PR erstellen
git push origin feature/tour-search
```

### Commit-Konventionen
- **api:** API/OpenAPI-Spec Änderungen
- **backend:** Java/Spring Boot Code
- **web:** React/Web Code
- **mobile:** React Native/Mobile Code
- **shared:** Gemeinsame Ressourcen
- **ci:** GitHub Actions/CI-Pipelines
- **docs:** Dokumentation

Beispiel:
```
git commit -m "web: add tour detail page

- Display tour information
- Show elevation profile
- Add reviews section
- Fix mobile responsiveness

Fixes #123"
```

## Testing-Strategie

### Unit Tests
```bash
# Backend
cd backend
mvn test

# Web
cd frontend-web
npm test

# Mobile
cd frontend-mobile
npm test
```

### Integration Tests
```bash
# Backend
cd backend
mvn verify
```

### E2E Tests (zukünftig)
```bash
cd frontend-web
npm run test:e2e
```

## Häufige Aufgaben

### Neue API-Endpoints hinzufügen
1. OpenAPI-Spec aktualisieren (`shared-resources/api-contracts/openapi.yaml`)
2. Clients regenerieren (siehe "API-Clients generieren")
3. Backend-Controller implementieren
4. Frontend-Services verwenden

### Neuen Component hinzufügen
```bash
# Web
cd frontend-web
npm run generate:component -- TourCard

# Mobile
cd frontend-mobile
npm run generate:component -- TourCard
```

### Abhängigkeiten hinzufügen
```bash
# Backend
cd backend
mvn dependency:tree  # Abhängigkeiten anschauen
# Dann in pom.xml hinzufügen

# Web
cd frontend-web
npm install <package-name>

# Mobile
cd frontend-mobile
npm install <package-name>
```

## Troubleshooting

### Maven Build schlägt fehl
```bash
cd backend
mvn clean install -DskipTests
```

### Node Modules Probleme
```bash
# Web
cd frontend-web
rm -rf node_modules package-lock.json
npm install

# Mobile
cd frontend-mobile
rm -rf node_modules package-lock.json
npm install
```

### Port ist bereits in Verwendung
```bash
# Verwendete Ports prüfen
lsof -i :8080     # Backend
lsof -i :5173     # Web Dev
lsof -i :5174     # Web Dev (Alternative)

# Prozess killen
kill -9 <PID>
```

### VS Code Performance
1. Nur einen Workspace öffnen (nicht Full)
2. Extensions deaktivieren, die nicht benötigt werden
3. `.vscode/settings.json` anpassen

## Weitere Ressourcen

- [System-Architektur](./ARCHITECTURE.md)
- [OpenAPI Dokumentation](../api-contracts/openapi.yaml)
- [Design Token Richtlinien](../design-tokens/README.md)
