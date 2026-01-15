# Hikr AI-Assisted Agents

Spezialisierte KI-Agenten zur Unterstützung verschiedener Team-Funktionen.

## 📋 Agenten Übersicht

| Agent | Team | Fokus | Link |
|-------|------|-------|------|
| **Backend DDD** | Backend | Domain-Driven Design Patterns | [backend-ddd.agent.md](backend-ddd.agent.md) |
| **Business Logic** | Backend | Use-Case Implementation | [business-logic.agent.md](business-logic.agent.md) |
| **Web CDD** | Frontend Web | React Components | [web-cdd.agent.md](web-cdd.agent.md) |
| **Mobile CDD** | Frontend Mobile | React Native Components | [mobile-cdd.agent.md](mobile-cdd.agent.md) |
| **Project Manager** | Product/PM | Agile Workflows | [project-manager.agent.md](project-manager.agent.md) |

## 🚀 Schnelle Links

- **Alle Agents verstehen?** → Lese [AGENTS Guide](../../docs/AGENTS.md)
- **Konkrete Workflows?** → Schau [Workflow Prompts](../../docs/prompts/workflow-prompts.md)
- **Team Onboarding?** → Starte mit [Onboarding Guide](../../docs/ONBOARDING.md)

## 📚 Jeder Agent enthält

1. **Verantwortlichkeiten** - Klar definierte Aufgaben
2. **Workflows** - Schritt-für-Schritt Prozesse mit Input/Output
3. **Code-Templates** - Produktions-ready Code-Beispiele
4. **Test-Templates** - Unit Test & Integration Test Muster
5. **Prüflisten** - Validierungs-Checklisten vor Commit
6. **Integration-Punkte** - Wie Agent mit anderen zusammenarbeitet

## 🔄 Agent Workflows

```
Feature Development:
1. Product Owner → Feature Idea
   ↓
2. Project Manager Agent → Story Creation
   ↓
3. Backend DDD Agent → Domain Modelling
   ↓
4. Business Logic Agent → Service Implementation
   ↓
5. Web/Mobile CDD Agents → UI Implementation (Parallel)
   ↓
6. Integration Testing & Merge
```

## 💡 Wie man einen Agent nutzt

**Schritt 1: Agent-Datei öffnen**
```
Öffne die relevante .agent.md Datei
z.B.: backend-ddd.agent.md für Domain Modelling
```

**Schritt 2: Workflow auswählen**
```
Finde den Workflow, der zu deiner Aufgabe passt
z.B.: "Domain Modelling" oder "Entity Implementation"
```

**Schritt 3: Prompt kopieren**
```
Kopiere den Prompt aus dem Workflow-Abschnitt
```

**Schritt 4: In Copilot Chat einfügen**
```
VS Code: Ctrl+Shift+I (GitHub Copilot Chat öffnen)
Paste Prompt + passe Platzhalter an
```

**Schritt 5: Ergebnisse überprüfen**
```
Nutze die Validierungschecklist
aus dem Agent-Dokument
```

## 🎓 Beispiel: Backend Entity erstellen

```
1. Öffne backend-ddd.agent.md
2. Suche "Entity Implementation" Workflow
3. Kopiere den Prompt
4. Paste in Copilot Chat (Ctrl+Shift+I)
5. Gib ein: "Entity-Name: Tour, Felder: title, distance, difficulty"
6. Copilot generiert:
   - Tour.java Entity
   - TourRepository Interface
   - Geschäftsregeln
   - Unit Tests
7. Nutze Validierungschecklist
8. Commit!
```

## 🔗 Verwandte Ressourcen

- [Complete AGENTS Guide](../../docs/AGENTS.md) - Detaillierte Dokumentation
- [Workflow Prompts](../../docs/prompts/workflow-prompts.md) - Spezialisierte Prompts
- [Global Instructions](../copilot-instructions.md) - Team-Standards
- [Onboarding Guide](../../docs/ONBOARDING.md) - Für neue Team Member

## 📊 Agent Performance Metriken

Überwachen wir monatlich:

- Code Quality (Tests, Coverage)
- Review Time
- Bug Escapeate
- Team Satisfaction

Bei Problemen → GitHub Issue mit `type:agent-feedback` Label

## 🐛 Feedback & Verbesserungen

Falls ein Agent nicht gut funktioniert:

1. **Erstelle einen Issue** mit Label `type:agent-feedback`
2. **Beschreibe** was du versucht hast
3. **Teile** den Output mit
4. **Erkläre** was besser sein sollte

Team wird den Agent iterativ verbessern!

---

**Alle Agents einführen:** [docs/AGENTS.md](../../docs/AGENTS.md)
