# Hikr - Documentation Index

Zentrale Dokumentation für die Hikr-Plattform.

## 📚 Hauptbereiche

### [Architecture](architecture/README.md)
Strategische Architektur-Dokumentation basierend auf Domain-Driven Design.
- Strategic Architecture Summary
- Bounded Contexts Map
- Ubiquitous Language Glossar
- Domain Events & Integrations
- Context Map Visualizations

👉 **Start hier:** [Architecture Index](architecture/README.md)

---

### [Requirements](requirements/README.md)
Requirements Engineering Dokumentation und User Stories.
- User Stories
- Story Map
- Interview Transcripts
- Workshop Summaries

👉 **Start hier:** [Requirements Index](requirements/README.md)

---

### [Guides](guides/)
Entwicklungs- und Onboarding-Guides.

- [DEVELOPMENT-GUIDE.md](guides/DEVELOPMENT-GUIDE.md) - Setup und lokale Entwicklung
- [MONOREPO-GUIDE.md](guides/MONOREPO-GUIDE.md) - Mono-Repository Struktur
- [ONBOARDING.md](guides/ONBOARDING.md) - Team Onboarding

---

### [Architecture Decisions](architecture/)
Architektur-Entscheidungen und Design-Patterns.

- [ARCHITECTURE.md](architecture/ARCHITECTURE.md) - System-Architektur Übersicht
- [project-structure.md](architecture/project-structure.md) - Technische Projektstruktur

---

## 🎯 Häufige Aufgaben

### Ich bin neu im Team
→ Lesen Sie: [Onboarding Guide](guides/ONBOARDING.md)

### Ich will die Architektur verstehen
→ Start hier: [Architecture Index](architecture/README.md)

### Ich will ein Feature implementieren
→ Lesen Sie: [Requirements](requirements/README.md) + [Development Guide](guides/DEVELOPMENT-GUIDE.md)

### Ich arbeite im Mono-Repo
→ Lesen Sie: [Monorepo Guide](guides/MONOREPO-GUIDE.md)

### Ich brauche API-Dokumentation
→ Lesen Sie: [API Contracts](../shared-resources/api-contracts/openapi.yaml)

---

## 📖 Dokumentations-Struktur

```
docs/
├── README.md                    ← Sie sind hier
├── architecture/
│   ├── README.md               # Architektur-Index
│   ├── ARCHITECTURE.md         # System-Übersicht
│   ├── project-structure.md    # Technische Details
│   ├── chats/                  # Archived chat logs
│   └── (zukünftig)
│       ├── strategic-architecture-summary.md
│       ├── bounded-contexts-map.md
│       ├── ubiquitous-language-glossar.md
│       ├── domain-events-integrations.md
│       └── context-map-visualizations.md
│
├── requirements/
│   ├── README.md               # Requirements-Index
│   ├── story-map.md           # User Story Map
│   ├── user-stories/
│   │   └── (user stories)
│   └── transcripts/
│       └── (interview & workshop)
│
├── guides/
│   ├── DEVELOPMENT-GUIDE.md    # Setup & Lokale Entwicklung
│   ├── MONOREPO-GUIDE.md       # Mono-Repo Struktur
│   ├── ONBOARDING.md           # Team Onboarding
│   ├── AGENTS.md               # GitHub Copilot Agents
│   ├── COMPLETE_OVERVIEW.md    # Projekt-Übersicht
│   └── workflow-prompts.md     # Workflow Automation
│
├── prompts/                    # GitHub Copilot Prompts
│   ├── 1-issue-creation-prompts.md
│   ├── 2-pr-description-prompts.md
│   ├── 3-retrospective-prompts.md
│   └── ...
│
└── chatmodes/                  # Chatmode Definitionen (geplant)
    ├── requirements-engineer.chatmode.md
    ├── sw-architect.chatmode.md
    └── ...
```

---

## 🔗 Schnelle Links

- **API Spec:** [openapi.yaml](../shared-resources/api-contracts/openapi.yaml)
- **Design Tokens:** [tokens.json](../shared-resources/design-tokens/tokens.json)
- **Backend README:** [backend/README.md](../backend/README.md)
- **Frontend Web README:** [frontend-web/README.md](../frontend-web/README.md)
- **Frontend Mobile README:** [frontend-mobile/README.md](../frontend-mobile/README.md)

---

## 👥 Wer macht was?

| Rolle | Primäre Dokumentation | Sekundäre Dokumentation |
|-------|----------------------|------------------------|
| **Product Owner** | Requirements, Story Map | Architecture Intro |
| **Architect** | Architecture (alle 5 Docs) | Project Structure |
| **Backend Dev** | Architecture, API Spec | Development Guide |
| **Frontend Dev** | Requirements, API Spec | Development Guide |
| **QA/Test** | Requirements, API Spec | Development Guide |
| **New Team Member** | Onboarding, Guides | Architecture |

---

## 🚀 Nächste Schritte

1. **Für Setup:** Siehe [Development Guide](guides/DEVELOPMENT-GUIDE.md)
2. **Für Architektur:** Siehe [Architecture Index](architecture/README.md)
3. **Für Features:** Siehe [Requirements](requirements/README.md)

---

**Last Updated:** 2026-01-28  
**Responsible:** Hikr Team  
**Next Review:** 2026-02-28
