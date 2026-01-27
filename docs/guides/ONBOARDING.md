# Hikr Team Onboarding Guide

Willkommen im Hikr-Team! 🏔️ Dieses Dokument hilft dir, schnell in das Projekt zu starten.

## 🎯 Dein erstes Treffen

**Dauer:** ~2 Stunden

1. **Willkommen im Team** (15 min)
   - Team-Übersicht
   - Projekt-Vision: "Outdoor-Touren-Platform für Abenteurer"
   - Team-Rollen kennenlernen

2. **Hikr Glossar & Architektur** (30 min)
   - Lese [Glossary](shared-resources/documentation/GLOSSAR.md)
   - Lese [Architecture](shared-resources/documentation/ARCHITECTURE.md)
   - Key Concepts: Bounded Context, DDD, CDD, Mono-Repository

3. **Workspace Setup** (45 min)
   - Folge [Development Guide](shared-resources/documentation/DEVELOPMENT-GUIDE.md)
   - Installiere Prerequisites (Node.js, Java, Maven)
   - Clone Repository & öffne VS Code
   - Starte Backend & Frontend

4. **Coding Standards Tour** (30 min)
   - Lese [Copilot Instructions](.github/copilot-instructions.md)
   - Überblick: Naming Conventions, Error Handling, Logging
   - Key Standards für dein Team

---

## 🔧 Workspace Setup Checklist

**Schritt 1: Prerequisites**
```bash
# Node.js (18+)
node --version  # v18.0.0 or higher

# Java (21)
java -version   # java 21.x.x

# Maven (3.8+)
mvn --version   # Apache Maven 3.8.x

# Git
git --version   # git 2.x.x
```

**Schritt 2: Repository klonen**
```bash
git clone https://github.com/hikr/hikr.git
cd hikr
```

**Schritt 3: VS Code Workspace öffnen**

Je nach deinem Team:

```bash
# Full Stack Development
code hikr-full.code-workspace

# Nur Web-Frontend
code hikr-web.code-workspace

# Nur Mobile-Frontend
code hikr-mobile.code-workspace

# Nur Backend
code hikr-backend.code-workspace
```

**Schritt 4: Extensions installieren**
- VS Code fragt: "Install All Recommended Extensions?"
- Klick "Install"
- Warten auf Completion (~5 min)

**Schritt 5: Dependencies installieren**

Je nach Team:

```bash
# Backend Team
npm run backend:install  # oder: cd backend && mvn clean install

# Web Team
npm run web:install     # oder: cd frontend-web && npm install

# Mobile Team
npm run mobile:install  # oder: cd frontend-mobile && npm install
```

**Schritt 6: Services starten**

```bash
# Backend starten
npm run backend:run     # oder: cd backend && mvn spring-boot:run

# Web Dev Server starten
npm run web:dev         # oder: cd frontend-web && npm run dev

# Mobile Emulator starten
npm run mobile:android  # oder mobile:ios
```

**✅ Done!** Wenn alles grün ist, bist du ready to code!

---

## 👥 Deine Team-Rolle

### Backend Developer

**Dein Stack:**
- Java 21 + Spring Boot 3.x
- Maven für Dependency Management
- PostgreSQL für Datenbank
- Domain-Driven Design (DDD)

**Ressourcen:**
- Agent: [Backend DDD](.github/agents/backend-ddd.agent.md)
- Agent: [Business Logic](.github/agents/business-logic.agent.md)
- Standards: [Copilot Instructions](.github/copilot-instructions.md)

**Dein erstes Task:**
1. Backend starten: `npm run backend:run`
2. Öffne [backend/src/main/java/com/hikr/HikrApplication.java](backend/src/main/java/com/hikr/HikrApplication.java)
3. Lies die Kommentare & Struktur
4. Lese einen existierenden Domain Model
5. Starte mit einer einfachen Feature

**Häufige Befehle:**
```bash
npm run backend:test      # Tests ausführen
npm run backend:verify    # Code Quality Check
npm run backend:run       # Server starten
```

### Web Frontend Developer

**Dein Stack:**
- React 18+ + TypeScript
- Vite für Bundling
- Tailwind CSS für Styling
- Component-Driven Design (CDD)

**Ressourcen:**
- Agent: [Web CDD](.github/agents/web-cdd.agent.md)
- Standards: [Copilot Instructions](.github/copilot-instructions.md)
- Design Tokens: [tokens.json](shared-resources/design-tokens/tokens.json)

**Dein erstes Task:**
1. Web Dev starten: `npm run web:dev`
2. Browser öffnet sich auf http://localhost:5173
3. Öffne [frontend-web/src/main.tsx](frontend-web/src/main.tsx)
4. Erkunde die Component-Struktur (Atoms → Molecules → Organisms)
5. Starte mit einem einfachen Button Component

**Häufige Befehle:**
```bash
npm run web:dev          # Dev Server (Hot Reload)
npm run web:test         # Tests
npm run web:build        # Production Build
npm run web:lint         # ESLint Check
```

### Mobile Frontend Developer

**Dein Stack:**
- React Native + TypeScript
- Expo für Development
- React Navigation für Routing
- Cross-Platform Component Design

**Ressourcen:**
- Agent: [Mobile CDD](.github/agents/mobile-cdd.agent.md)
- Standards: [Copilot Instructions](.github/copilot-instructions.md)
- Design Tokens: [tokens.json](shared-resources/design-tokens/tokens.json)

**Dein erstes Task:**
1. Emulator starten: `npm run mobile:android` oder `npm run mobile:ios`
2. Öffne [frontend-mobile/src/App.tsx](frontend-mobile/src/App.tsx)
3. Erkunde die Screen-Struktur
4. Erstelle einen einfachen Screen mit Navigation
5. Teste auf beiden iOS & Android

**Häufige Befehle:**
```bash
npm run mobile:android   # Android Emulator
npm run mobile:ios       # iOS Simulator
npm run mobile:test      # Tests
npm run mobile:build     # Production Build
```

### Product Manager / Team Lead

**Deine Verantwortung:**
- Story Creation & Refinement
- Sprint Planning & Execution
- Team Koordination
- KI-Agent Orchestration

**Ressourcen:**
- Agent: [Project Manager](.github/agents/project-manager.agent.md)
- Workflow Prompts: [workflow-prompts.md](docs/prompts/workflow-prompts.md)
- Agents Guide: [AGENTS.md](docs/AGENTS.md)

**Dein erstes Task:**
1. Lese [Project Manager Agent](.github/agents/project-manager.agent.md)
2. Lese [workflow-prompts.md](docs/prompts/workflow-prompts.md) → Issue Creation
3. Erstelle eine Test-Story für das Team
4. Nutze den Story-Template aus [ISSUE_TEMPLATE/user-story.md](.github/ISSUE_TEMPLATE/user-story.md)
5. Teile mit dem Team für Feedback

---

## 🔗 KI-Agents Nutzen

Hikr hat spezialisierte KI-Agenten für verschiedene Tasks:

### Backend Agenten
- **Beim Domain Modelling:** Nutze [Backend DDD Agent](.github/agents/backend-ddd.agent.md)
- **Bei Use-Case Implementation:** Nutze [Business Logic Agent](.github/agents/business-logic.agent.md)

### Frontend Agenten
- **Bei React Components:** Nutze [Web CDD Agent](.github/agents/web-cdd.agent.md)
- **Bei React Native:** Nutze [Mobile CDD Agent](.github/agents/mobile-cdd.agent.md)

### Workflow-Agenten
- **Bei Story Creation:** Nutze [Project Manager Agent](.github/agents/project-manager.agent.md)
- **Bei Retrospectives:** Nutze Workflow Prompts aus [workflow-prompts.md](docs/prompts/workflow-prompts.md)

**Schnelle Start:**
1. Öffne relevanten Agent (z.B. `.github/agents/backend-ddd.agent.md`)
2. Finde den relevanten Workflow
3. Kopiere den Prompt
4. Paste in GitHub Copilot Chat (Ctrl+Shift+I in VS Code)
5. Passe die Platzhalter an
6. Führe aus!

Mehr Details: [AGENTS Guide](docs/AGENTS.md)

---

## 📚 Wichtigste Dokumentation

**Muss lesen (in dieser Reihenfolge):**

1. **[GLOSSARY](shared-resources/documentation/GLOSSAR.md)** (15 min)
   - Hikr-spezifische Begriffe kennenlernen
   - Domain Vocabulary verstehen

2. **[ARCHITECTURE](shared-resources/documentation/ARCHITECTURE.md)** (20 min)
   - System-Übersicht
   - Komponenten & Interaktion
   - Bounded Contexts

3. **[Copilot Instructions](.github/copilot-instructions.md)** (20 min)
   - Dein Team's Coding Standards
   - Naming Conventions
   - Error Handling & Logging

4. **[DEVELOPMENT GUIDE](shared-resources/documentation/DEVELOPMENT-GUIDE.md)** (15 min)
   - Workspace Setup Details
   - Frontend/Backend spezifische Guides
   - Common Commands

5. **[AGENTS Guide](docs/AGENTS.md)** (20 min)
   - Wie man KI-Agenten nutzt
   - Team-Workflows
   - Handoff-Protokolle

6. **Team-spezifischer Agent** (15 min)
   - [Backend DDD](.github/agents/backend-ddd.agent.md) oder
   - [Web CDD](.github/agents/web-cdd.agent.md) oder
   - [Mobile CDD](.github/agents/mobile-cdd.agent.md)

---

## 🚀 Dein erstes Feature

Folge diesem Workflow für dein erstes Feature:

### Phase 1: Story Understanding (15 min)
```
1. Finde deine assigned Story in GitHub Issues
2. Lese die User Story ("As a... I want... So that...")
3. Verstehe die Acceptance Criteria
4. Stelle Fragen, wenn etwas unklar ist
```

### Phase 2: Technical Design (30 min)

**Für Backend:**
```
1. Öffne Backend DDD Agent
2. Nutze "Domain Modelling" Workflow
3. Modelliere deine Entities & Aggregates
4. Frag um Feedback im Team
```

**Für Frontend:**
```
1. Öffne Web/Mobile CDD Agent
2. Nutze "Component Decomposition" Workflow
3. Zerlege die UI in Atoms/Molecules/Organisms
4. Frag um Feedback im Team
```

### Phase 3: Implementation (varies)

```
1. Erstelle einen Feature Branch
   git checkout -b feature/my-awesome-feature

2. Implementiere die Feature
   - Nutze die Agent-generierten Templates
   - Folge Hikr Coding Standards
   - Schreib Unit Tests (>80% coverage)

3. Commit mit Standard-Format
   git commit -m "api(tours): add tour search filter"

4. Push & erstelle einen Pull Request
   git push origin feature/my-awesome-feature
```

### Phase 4: Code Review (varies)

```
1. GitHub zeigt Code Review Checks
2. Antworte auf Reviewer Feedback
3. Apporte Änderungen vor
4. Re-request Review
```

### Phase 5: Merge & Deploy (5 min)

```
1. Kein Feedback mehr → "Squash and Merge"
2. GitHub Actions startet CI/CD Pipelines
3. Feature deployed auf Staging
4. Feiere deinen ersten Merge! 🎉
```

---

## 💬 Häufig gestellte Fragen

### Q: Mein Backend startet nicht
**A:** 
```bash
1. Check Java: java -version (muss 21 sein)
2. Check Maven: mvn --version
3. Clean install: cd backend && mvn clean install
4. Starte: mvn spring-boot:run
5. Logs checken auf Fehler
```

### Q: Mein Frontend zeigt "Fehler beim Laden von Module"
**A:**
```bash
1. Lösche node_modules: rm -rf node_modules
2. Lösche lock file: rm package-lock.json (oder yarn.lock)
3. Neu install: npm install
4. Restart Dev Server: npm run dev
```

### Q: Ich verstehe den Code nicht, wo kann ich fragen?
**A:**
1. Lese die Kommentare im Code
2. Lese die relevante Agent-Dokumentation
3. Frag im Team Slack/Discord
4. Erstelle einen GitHub Issue mit "help wanted" Label

### Q: Ich weiß nicht, welchen Agent ich nutzen soll
**A:**
1. Öffne [AGENTS Guide](docs/AGENTS.md)
2. Finde deine Situation in der Tabelle
3. Folge dem verlinkten Agent

### Q: Mein Code-Style passt nicht
**A:**
```bash
# Web Frontend
npm run web:lint -- --fix

# Backend
cd backend && mvn spotless:apply

# Mobile
npm run mobile:lint -- --fix
```

### Q: Wann soll ich Tests schreiben?
**A:** Immer! Der Standard ist:
- Backend: >80% Coverage
- Frontend: >80% Coverage
- Mobile: Mindestens kritische User Flows

### Q: Wie soll ich Commits schreiben?
**A:** Follow [Git Commit Convention](.github/copilot-instructions.md#5-git-workflow--commit-konventionen):
```
<type>(<scope>): <subject>

backend(tours): implement distance calculation
```

---

## 🔗 Nützliche Links

**Dokumentation:**
- [Glossary](shared-resources/documentation/GLOSSAR.md)
- [Architecture](shared-resources/documentation/ARCHITECTURE.md)
- [Development Guide](shared-resources/documentation/DEVELOPMENT-GUIDE.md)
- [Mono-Repository Guide](shared-resources/documentation/MONOREPO-GUIDE.md)

**Standards & Conventions:**
- [Copilot Instructions](.github/copilot-instructions.md)
- [AGENTS Guide](docs/AGENTS.md)
- [Workflow Prompts](docs/prompts/workflow-prompts.md)

**Code Resources:**
- [OpenAPI Specification](shared-resources/api-contracts/openapi.yaml)
- [Design Tokens](shared-resources/design-tokens/tokens.json)

**Team Communication:**
- GitHub Issues: Backlog & Bug Reports
- GitHub Discussions: Technical Discussions
- Pull Requests: Code Review & Collaboration

---

## ✅ Onboarding Checklist

Hake ab, wenn du folgende Items abgeschlossen hast:

**Vor dem ersten Feature:**
- [ ] Workspace erfolgreich Setup
- [ ] Backend/Frontend/Mobile startet
- [ ] Glossary gelesen
- [ ] Architecture verstanden
- [ ] Coding Standards gelesen
- [ ] Development Guide durchgearbeitet
- [ ] AGENTS Guide überflogen
- [ ] Team-spezifischer Agent gelesen

**Während des ersten Features:**
- [ ] Story verstanden
- [ ] Technical Design mit Team besprochen
- [ ] Feature implementiert
- [ ] Unit Tests geschrieben (>80%)
- [ ] Code Linting erfolgreich
- [ ] Git Commits mit Konvention geschrieben
- [ ] Pull Request erstellt
- [ ] Code Review Feedback umgesetzt
- [ ] Feature merged & deployed

**Nach dem ersten Feature:**
- [ ] Retrospective Feedback gegeben
- [ ] Lessons Learned dokumentiert
- [ ] Team danken für Unterstützung 🙏

---

## 🎓 Nächste Schritte

**Week 1:**
- Workspace Setup ✅
- Dokumentation lesen ✅
- Erste Feature Assignment erhalten

**Week 2-3:**
- Erste Feature implementieren
- Feedback vom Team einholen
- Best Practices lernen

**Week 4:**
- Volle Produktivität
- Mentoring für neue Team Member übernehmen
- Kontinuierliches Lernen & Improvement

---

**Willkommen im Hikr-Team!** 🏔️ Viel Spaß beim Coding!

**Fragen?** Kontaktiere deinen Team Lead oder stelle eine Frage in einem GitHub Issue.

---

**Last Updated:** 2025-01-14
**Maintained by:** Team Lead
