# Hikr AI-Assisted Agents Guide

## 🤖 Überblick

Hikr nutzt spezialisierte KI-Agenten zur Unterstützung verschiedener Team-Funktionen:

| Agent | Team | Verantwortung | Workflows |
|-------|------|---|----------|
| **Backend DDD** | Backend | Domain-Driven Design Patterns | Entity-Modellierung, Aggregate Design |
| **Business Logic** | Backend | Use-Case Implementation | Application Services, Transaction Management |
| **Web CDD** | Frontend Web | React Component Development | Atomic Design, TypeScript Components |
| **Mobile CDD** | Frontend Mobile | React Native Components | Cross-Platform, Performance Optimization |
| **Project Manager** | Product/PM | Agile Workflows | Story Creation, Sprint Planning, Retrospectives |

---

## 1️⃣ Backend DDD Agent

**Dateien:** [`.github/agents/backend-ddd.agent.md`](.github/agents/backend-ddd.agent.md)

### Verantwortlichkeiten
- Domain-Modellierung nach DDD-Prinzipien
- Bounded Context Definition
- Entity & Aggregate Design
- Value Object Modellierung
- Domain Event Definition

### Workflows

#### Domain Modelling
```
Input: Geschäftsanforderung / Feature-Description
↓
Agent erstellt:
  - Bounded Context
  - Ubiquitous Language
  - Entity/Value Object Skizzen
  - Domain Events
↓
Output: Domain-Modell für Implementation
```

#### Entity Implementation
```
Input: Domain-Modell + Geschäftsregeln
↓
Agent generiert:
  - Entity.java Klasse mit Business Logic
  - Value Objects
  - Repository Interface
  - Domain Service (falls nötig)
↓
Output: Produktions-ready Code + Tests
```

### Integration
- **→ Business Logic Agent:** Für Application Service Implementation
- **→ Web/Mobile Agents:** Für API-Contracts (OpenAPI)
- **← Project Manager Agent:** Für Story-Details

### Validierungschecklist
- [ ] Entity hat klare Identity
- [ ] Value Objects sind immutable
- [ ] Business Rules sind in der Domain
- [ ] Repository abstrahiert Persistierung
- [ ] Domain Service für Cross-Aggregate Logic
- [ ] Tests für alle Business Rules

---

## 2️⃣ Business Logic Agent

**Dateien:** [`.github/agents/business-logic.agent.md`](.github/agents/business-logic.agent.md)

### Verantwortlichkeiten
- Use-Case Implementierung (Application Services)
- Transaction Management
- DTO & Mapping
- Exception Handling
- Integration mit External Services

### Workflows

#### Application Service Implementation
```
Input: Domain-Modell + Use-Case Anforderung
↓
Agent generiert:
  - ApplicationService.java
  - DTO Classes
  - Mapper Implementation
  - Transaction Boundaries
  - Error Handling
↓
Output: Production-ready Service + Tests
```

#### Complex Business Logic
```
Input: Anforderung mit Cross-Aggregate Dependencies
↓
Agent hilft bei:
  - Service Orchestration
  - Transaction Boundaries
  - Optimistic Locking
  - Event Publishing
↓
Output: Implementierung + Test-Strategie
```

### Integration
- **← Backend DDD Agent:** Domain Model Nutzung
- **→ API Contracts (OpenAPI):** Request/Response DTOs
- **← Project Manager Agent:** Use-Case Details

### Validierungschecklist
- [ ] Service Layer orchestriert Domain
- [ ] DTOs sind Input/Output sauber
- [ ] Transaction Scope ist minimal
- [ ] Error Handling ist vollständig
- [ ] Logging ist aussagekräftig
- [ ] Tests > 80% Coverage

---

## 3️⃣ Web CDD Agent

**Dateien:** [`.github/agents/web-cdd.agent.md`](.github/agents/web-cdd.agent.md)

### Verantwortlichkeiten
- React Component Entwicklung
- Atomic Design (Atoms → Organisms)
- TypeScript & Props Definition
- Component Testing (Vitest)
- Storybook Stories
- Accessibility (a11y)

### Workflows

#### Component Decomposition
```
Input: UI Design / Wireframe + Feature-Requirements
↓
Agent erstellt:
  - Atoms (Button, Input, Badge, ...)
  - Molecules (Form, Card, ...)
  - Organisms (Header, Modal, ...)
  - Props Interfaces (TypeScript)
↓
Output: Component Hierarchie + Dateien
```

#### Component Implementation
```
Input: Component Spezifikation + Design Tokens
↓
Agent generiert:
  - Component.tsx mit TypeScript
  - Component.test.tsx (Vitest)
  - Component.stories.tsx (Storybook)
  - Accessibility Labels
↓
Output: Production-ready Component
```

### Integration
- **→ Mobile CDD Agent:** Für Shared Utilities
- **← API Contracts (OpenAPI):** Data Models
- **← Project Manager Agent:** Feature Details

### Validierungschecklist
- [ ] Component Isolation (no prop drilling)
- [ ] TypeScript Types vollständig
- [ ] Unit Tests > 80%
- [ ] Storybook Stories vorhanden
- [ ] WCAG 2.1 Level AA Compliance
- [ ] Responsive Design geprüft

---

## 4️⃣ Mobile CDD Agent

**Dateien:** [`.github/agents/mobile-cdd.agent.md`](.github/agents/mobile-cdd.agent.md)

### Verantwortlichkeiten
- React Native Component Entwicklung
- Cross-Platform Implementation (.ios/.android)
- Performance Optimization
- Platform-spezifische APIs
- Mobile Testing
- Accessibility (VoiceOver, TalkBack)

### Workflows

#### Cross-Platform Component
```
Input: Feature Requirement + Platform Considerations
↓
Agent erstellt:
  - Component.tsx (Shared Logic)
  - Component.ios.tsx (iOS-spezifisch)
  - Component.android.tsx (Android-spezifisch)
  - Platform Utils
↓
Output: iOS + Android implementiert
```

#### Performance Optimization
```
Input: Performance Metrics + Component Code
↓
Agent optimiert:
  - FlatList statt ScrollView
  - React.memo() wo nötig
  - Lazy Loading
  - Asset Optimization
↓
Output: Optimierter Code + Metrics
```

### Integration
- **← Web CDD Agent:** Für Shared Patterns
- **← API Contracts (OpenAPI):** Data Models
- **← Project Manager Agent:** Feature Details

### Validierungschecklist
- [ ] iOS & Android funktionieren
- [ ] Performance-Metriken ok
- [ ] Accessibility (VoiceOver/TalkBack)
- [ ] Navigation funktioniert
- [ ] Bilder optimiert (lazy loading)
- [ ] Tests für beide Plattformen

---

## 5️⃣ Project Manager Agent

**Dateien:** [`.github/agents/project-manager.agent.md`](.github/agents/project-manager.agent.md)

### Verantwortlichkeiten
- User Story Erstellung
- Story Refinement
- Sprint Planning
- Daily Standup Moderation
- Sprint Retrospectives
- Post-Mortem Analysis

### Workflows

#### Story Creation
```
Input: Feedback / Feature Idea
↓
Agent erstellt:
  - User Story Format
  - Acceptance Criteria (testbar)
  - Definition of Done
  - Story Points Estimation
  - Dependencies
↓
Output: Backlog-ready Issue
```

#### Sprint Retrospective
```
Input: Sprint Events + Metrics
↓
Agent erstellt:
  - Went Well / Challenges Matrix
  - Action Items für nächsten Sprint
  - Metrics Review (Velocity, Burndown)
  - Team Feedback Integration
↓
Output: Lessons Learned Dokumentation
```

#### Post-Mortem Analysis
```
Input: Incident Description + Timeline
↓
Agent erstellt:
  - Root Cause Analysis (5-Whys)
  - Action Items (preventive)
  - Metrics (MTTD, MTTR)
  - Lessons Learned
↓
Output: Post-Mortem Report
```

### Integration
- **→ Backend DDD Agent:** Domain Model Details
- **→ Web CDD Agent:** UI/UX Requirements
- **→ Mobile CDD Agent:** Mobile-spezifische Requirements
- **← All Teams:** Sprint Feedback

### Validierungschecklist
- [ ] Story ist INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- [ ] Acceptance Criteria sind testbar
- [ ] Dependencies sind aufgelistet
- [ ] Story Points sind realistisch
- [ ] Team Alignment vorhanden

---

## 🔄 Agent Workflows & Handoffs

### Feature Development Workflow

```
1. Product Owner
   ↓ (Feature Idea)
   ↓
2. Project Manager Agent
   - Story Creation
   - Acceptance Criteria
   - Story Points Estimation
   ↓ (Backlog-ready Issue)
   ↓
3. Backend Team
   ↓ (Technical Design)
   ↓
4. Backend DDD Agent
   - Domain Modelling
   - Entity Design
   - Repository Interfaces
   ↓ (Domain Model)
   ↓
5. Backend Business Logic Agent
   - Application Service
   - DTO Mapping
   - Transaction Management
   ↓ (Service Implementation)
   ↓
6. API Specification Update
   - OpenAPI.yaml Update
   - Request/Response Schemas
   ↓ (API Contract)
   ↓
7. Frontend Teams (Parallel)
   ↓
   ├─ Web Team
   │  ↓
   │  └─ Web CDD Agent
   │     - Component Decomposition
   │     - Component Implementation
   │     - Tests & Storybook
   │
   └─ Mobile Team
      ↓
      └─ Mobile CDD Agent
         - Cross-Platform Components
         - iOS/Android specific code
         - Performance Optimization
   ↓
8. Integration Testing
   ↓
9. Demo / Sprint Review
   ↓
10. Retrospective & Lessons Learned
    ↓
    └─ Project Manager Agent
       - Retro Facilitation
       - Action Items
       - Metrics
```

### Agent Communication Protocol

Agents kommunizieren über strukturierte Handoffs:

```
Agent A → [Artifact: JSON Schema / Markdown] → Agent B

Beispiel:
Backend DDD → [Domain Model .json] → Business Logic Agent
Business Logic → [OpenAPI Update] → Web CDD Agent
Web CDD → [Component Storybook] → Developer Review
```

---

## 🚀 Wie man Agents nutzt

### In VS Code

**Option 1: Direct Agent File**
```
1. Öffne .github/agents/[agent-name].agent.md
2. Kopiere den relevanten Workflow/Prompt
3. Paste in Copilot Chat
4. Passe Platzhalter an
5. Führe aus
```

**Option 2: Workflow Prompts**
```
1. Öffne docs/prompts/workflow-prompts.md
2. Finde den relevanten Workflow
3. Kopiere den Prompt
4. Nutze in Copilot Chat
```

**Option 3: Custom Instructions**
```
# In VS Code Settings → Copilot → Custom Instructions:

For backend work:
"Follow the patterns in .github/agents/backend-ddd.agent.md"

For frontend work:
"Follow the patterns in .github/agents/web-cdd.agent.md"

For project management:
"Follow the patterns in .github/agents/project-manager.agent.md"
```

### In GitHub Issues

**Labels für Agent-Zuweisung:**
```
@agent-backend-ddd  → Für Domain Modelling
@agent-business-logic → Für Use-Case Implementation
@agent-web-cdd → Für React Components
@agent-mobile-cdd → Für React Native Components
@agent-pm → Für Story Refinement
```

---

## 📊 Agent Metrics & Monitoring

### Tracking Agent Effectiveness

**Metriken pro Agent:**

| Metrik | Zielwert | Frequenz |
|--------|----------|----------|
| Code Review Time | < 24h | Per PR |
| Test Coverage | > 80% | Per PR |
| Post-Review Changes | < 20% | Per PR |
| Bug-Escapeate | < 5% | Per Sprint |
| Team Satisfaction | > 4/5 | Per Retro |

### Agent Performance Review

**Monatlich:**
- Durchschnittliche Code Quality
- Test Coverage Trends
- Review Time Trends
- Team Feedback

**Quarterly:**
- Agent Effectiveness Review
- Process Improvements
- Neue Workflows hinzufügen

---

## ⚡ Troubleshooting

### Agent gibt schlechte Output
**Probleme:**
- Zu generischer Prompt
- Zu viel Kontext auf einmal
- Fehlende Standards-Referenz

**Lösung:**
```
1. Nutze spezifischeren Prompt aus docs/prompts/
2. Break down task into smaller steps
3. Explizit: "Nach Hikr Standards" hinzufügen
4. Validierungschecklist durchgehen
```

### Agent kennt Standards nicht
**Problem:** Agent folgt nicht den Hikr-Standards

**Lösung:**
```
1. Referenziere .github/copilot-instructions.md
2. Nutze Agent-spezifischen Prompt aus .github/agents/
3. Gib Beispiele von bestehendem Code
```

### Integration nicht klar
**Problem:** Unklar, welche Agenten zusammenarbeiten

**Lösung:**
```
1. Schau in die "Agent Workflows & Handoffs" oben
2. Nutze Feature Development Workflow als Template
3. Kontakt Team Lead für komplexe Scenarios
```

---

## 📚 Weitere Ressourcen

- [Copilot Global Instructions](.github/copilot-instructions.md)
- [Workflow Prompts](docs/prompts/workflow-prompts.md)
- [Development Guide](shared-resources/documentation/DEVELOPMENT-GUIDE.md)
- [Architecture Documentation](shared-resources/documentation/ARCHITECTURE.md)
- [Glossary](shared-resources/documentation/GLOSSAR.md)

---

**Last Updated:** 2025-01-14
**Maintained by:** Team Lead
**Version:** 1.0
