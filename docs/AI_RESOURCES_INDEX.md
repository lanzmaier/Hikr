# Hikr AI-Assisted Development - Quick Start Index

**Schnelle Navigation zu allen KI-Support Ressourcen**

## 🎯 Deine Situation?

### Ich bin neu im Team
→ Starte mit **[ONBOARDING.md](ONBOARDING.md)** (30 min)

### Ich entwickle Backend Features
→ Nutze **[Backend DDD Agent](.github/agents/backend-ddd.agent.md)** + **[Business Logic Agent](.github/agents/business-logic.agent.md)**

### Ich entwickle Web Features
→ Nutze **[Web CDD Agent](.github/agents/web-cdd.agent.md)**

### Ich entwickle Mobile Features
→ Nutze **[Mobile CDD Agent](.github/agents/mobile-cdd.agent.md)**

### Ich bin Product Manager
→ Nutze **[Project Manager Agent](.github/agents/project-manager.agent.md)**

### Ich schreibe eine GitHub Issue
→ Nutze **[Issue Templates](.github/ISSUE_TEMPLATE/README.md)**

### Ich erstelle einen Pull Request
→ Benutze **[PR Template](.github/pull_request_template.md)**

### Ich brauche einen spezialisierten Prompt
→ Suche in **[Workflow Prompts](prompts/workflow-prompts.md)**

### Ich verstehe die Standards nicht
→ Lese **[Copilot Instructions](.github/copilot-instructions.md)**

---

## 📚 Alle Ressourcen

### 🤖 KI-Agenten (5 Agenten)

| Agent | Fokus | Link |
|-------|-------|------|
| Backend DDD | Domain-Driven Design | [backend-ddd.agent.md](.github/agents/backend-ddd.agent.md) |
| Business Logic | Use-Case Implementation | [business-logic.agent.md](.github/agents/business-logic.agent.md) |
| Web CDD | React Components | [web-cdd.agent.md](.github/agents/web-cdd.agent.md) |
| Mobile CDD | React Native Components | [mobile-cdd.agent.md](.github/agents/mobile-cdd.agent.md) |
| Project Manager | Agile Workflows | [project-manager.agent.md](.github/agents/project-manager.agent.md) |

**→ Kompletter Guide:** [AGENTS.md](AGENTS.md)

### 📋 GitHub Templates

| Template | Verwendung | Link |
|----------|-----------|------|
| User Story | Features & Stories | [user-story.md](.github/ISSUE_TEMPLATE/user-story.md) |
| Bug Report | Bug Reports | [bug-report.md](.github/ISSUE_TEMPLATE/bug-report.md) |
| Feature Request | Feature Ideas | [feature-request.md](.github/ISSUE_TEMPLATE/feature-request.md) |
| Pull Request | Code Review | [pull_request_template.md](.github/pull_request_template.md) |

**→ Template Guide:** [ISSUE_TEMPLATE/README.md](.github/ISSUE_TEMPLATE/README.md)

### 🎓 Team Guides

| Dokument | Inhalt | Link |
|----------|--------|------|
| Onboarding | Neues Team-Setup | [ONBOARDING.md](ONBOARDING.md) |
| AGENTS Guide | Agent-Übersicht & Integration | [AGENTS.md](AGENTS.md) |
| Workflow Prompts | Spezialisierte Prompts | [workflow-prompts.md](prompts/workflow-prompts.md) |
| Setup Status | Projekt-Status & Übersicht | [SETUP_STATUS.md](SETUP_STATUS.md) |

### 📖 Coding Standards

| Standard | Abdeckung | Link |
|----------|-----------|------|
| Global Instructions | Alle Teams | [copilot-instructions.md](.github/copilot-instructions.md) |

### 🏗️ Architektur & Design

| Dokument | Zweck | Link |
|----------|-------|------|
| Architecture | System Design | [shared-resources/documentation/ARCHITECTURE.md](../shared-resources/documentation/ARCHITECTURE.md) |
| Mono-Repository Guide | Repository Struktur | [shared-resources/documentation/MONOREPO-GUIDE.md](../shared-resources/documentation/MONOREPO-GUIDE.md) |
| Glossary | Geschäftsbegriffe | [shared-resources/documentation/GLOSSAR.md](../shared-resources/documentation/GLOSSAR.md) |
| Development Guide | Setup & Befehle | [shared-resources/documentation/DEVELOPMENT-GUIDE.md](../shared-resources/documentation/DEVELOPMENT-GUIDE.md) |

### 🎨 Design & API

| Ressource | Verwendung | Link |
|-----------|-----------|------|
| OpenAPI Spec | API-Definition | [shared-resources/api-contracts/openapi.yaml](../shared-resources/api-contracts/openapi.yaml) |
| Design Tokens | Design System | [shared-resources/design-tokens/tokens.json](../shared-resources/design-tokens/tokens.json) |

---

## 🚀 Quick Start für verschiedene Aufgaben

### Feature implementieren

```
1. Öffne: AGENTS.md
2. Finde: "Agent Workflows & Handoffs"
3. Nutze: Relevanter Agent (DDD, CDD, etc.)
4. Validiere: Mit Checklist im Agent
5. Commit: Mit Standard-Konvention
```

### Bug fixen

```
1. Öffne: ISSUE_TEMPLATE/bug-report.md
2. Nutze: Template zur Strukturierung
3. Öffne: Relevanter Agent (DDD, CDD, etc.)
4. Implementiere: Mit Agent-Template
5. Validiere: Mit Agent-Checklist
```

### Story erstellen

```
1. Öffne: workflow-prompts.md
2. Nutze: "User Story Creation Prompt"
3. Paste: In GitHub Copilot Chat
4. Generiere: Story-Template
5. Verfeinere: Mit Team
```

### Retrospektive durchführen

```
1. Öffne: workflow-prompts.md
2. Nutze: "Sprint Retro Prompt"
3. Paste: In Copilot Chat
4. Generiere: Retro-Dokumentation
5. Teile: Mit Team
```

### Team Onboarden

```
1. Öffne: ONBOARDING.md
2. Folge: Schritt-für-Schritt Anleitung
3. Setup: Workspace & Dependencies
4. Lese: Team-spezifischen Agent
5. Starte: Mit erstem Task
```

---

## 🔍 Weitere Informationen

### Troubleshooting

**Workspace Setup Probleme?**
→ [ONBOARDING.md - FAQ](ONBOARDING.md#häufig-gestellte-fragen)

**Agent funktioniert nicht richtig?**
→ [AGENTS.md - Troubleshooting](AGENTS.md#-troubleshooting)

**Nicht sicher welchen Agent ich nutzen soll?**
→ [AGENTS.md - Agenten Übersicht](AGENTS.md#-überblick)

**Template-Feedback?**
→ Create Issue mit `type:template-feedback` Label

### Regelmäßige Tasks

**Tägliche Standups:**
→ Nutze [Project Manager Agent](.github/agents/project-manager.agent.md) → Daily Standup Workflow

**Sprint Planning:**
→ Nutze [Project Manager Agent](.github/agents/project-manager.agent.md) → Story Creation & Refinement

**Sprint Retrospektive:**
→ Nutze [workflow-prompts.md](prompts/workflow-prompts.md) → Sprint Retro Prompt

**Post-Mortem nach Incident:**
→ Nutze [workflow-prompts.md](prompts/workflow-prompts.md) → Post-Mortem Prompt

---

## 🎓 Learning Path

**Week 1 - Foundations**
1. Lese ONBOARDING.md
2. Setup Workspace
3. Lese Global Instructions
4. Lese Team-spezifischer Agent

**Week 2 - Praktiken**
1. Implementiere erste Feature mit Agent
2. Erstelle Pull Request mit Template
3. Durchlaufe Code Review
4. Dokumentiere Lessons Learned

**Week 3+ - Expertise**
1. Nutze Agents proaktiv
2. Mentoriere neue Developer
3. Gib Feedback zu Agents
4. Optimiere Workflows

---

## 📊 Projekt Übersicht

**Setup Date:** 2025-01-14  
**Status:** ✅ Production Ready  
**Version:** 1.0

**Komponenten:**
- ✅ 5 spezialisierte KI-Agenten
- ✅ 4 GitHub Templates
- ✅ 1500+ Zeilen Workflow Prompts
- ✅ Vollständige Dokumentation
- ✅ Global Coding Standards
- ✅ Team Onboarding Guide

**Siehe auch:** [SETUP_STATUS.md](SETUP_STATUS.md)

---

## 🆘 Hilfe & Support

**Wo kann ich Fragen stellen?**
- GitHub Issues: Bug Reports & Feature Requests
- GitHub Discussions: Technical Questions
- Slack/Discord: Quick Questions
- Team Meeting: Komplexe Themen

**Wer kann helfen?**
- Team Colleague: Quick Questions
- Team Lead: Complex Issues
- Relevant Agent: Technical Guidance

**Feedback geben?**
- GitHub Issues mit entsprechendem Label
- Team Retro
- Direct Slack/Discord

---

**Viel Spaß mit Hikr!** 🏔️

Letzte Aktualisierung: 2025-01-14
