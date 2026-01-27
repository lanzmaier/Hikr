# Workflow Prompts für KI-gestützte Entwicklung

Zentrales Verzeichnis spezialisierter Prompts für häufige Team-Workflows im Hikr-Projekt.

> **Tipp:** Verwenden Sie die Prompts als Vorlagen. Kopieren Sie den Prompt, passen Sie die Platzhalter an, und geben Sie ihn an den AI-Assistant ein.

---

## 🚀 Schnellstartguide

| Aufgabe | Prompt-Datei | Use Case |
|---------|--------------|----------|
| User Story erstellen | [1-issue-creation-prompts.md](1-issue-creation-prompts.md) | Feature-Planung |
| Bug reportieren | [1-issue-creation-prompts.md](1-issue-creation-prompts.md) | Bug-Triage |
| Feature-Request strukturieren | [1-issue-creation-prompts.md](1-issue-creation-prompts.md) | Feature-Planung |
| PR beschreiben | [2-pr-description-prompts.md](2-pr-description-prompts.md) | PR-Dokumentation |
| Code Review Feedback | [2-pr-description-prompts.md](2-pr-description-prompts.md) | Code-Qualität |
| Sprint Retrospektive | [3-retrospective-prompts.md](3-retrospective-prompts.md) | Sprint-Abschluss |
| Lessons Learned | [3-retrospective-prompts.md](3-retrospective-prompts.md) | Projekt-Learnings |
| Incident Post-Mortem | [4-post-mortem-prompts.md](4-post-mortem-prompts.md) | Incident-Analyse |
| DDD Entity entwickeln | [5-domain-prompts.md](5-domain-prompts.md) | Backend-Development |
| React Component zerlegen | [5-domain-prompts.md](5-domain-prompts.md) | Web-Development |
| React Native Component | [5-domain-prompts.md](5-domain-prompts.md) | Mobile-Development |
| Copilot Integration | [6-copilot-integration.md](6-copilot-integration.md) | VS Code Setup |

---

## 📂 Prompt-Kategorien

### 1. [Issue-Erstellung](1-issue-creation-prompts.md)
Spezialisierte Prompts für GitHub Issue-Management:
- **User Story Creation** - Strukturierte User Stories nach INVEST-Kriterien
- **Bug Report Refinement** - Professionelle Bug-Reports mit Reproduktionsschritten
- **Feature Request Structuring** - Feature-Requests mit Business-Value

**Wann verwenden?** Beim Erstellen von Issues, Pull Requests vorbereiten

---

### 2. [PR-Beschreibungen](2-pr-description-prompts.md)
Prompts für hochwertige Pull Request Dokumentation:
- **Auto-Generate PR Description** - Aussagekräftige PR-Beschreibungen aus Git-Diffs
- **Code Review Feedback** - Konstruktives Code-Review-Feedback gegen Hikr-Standards

**Wann verwenden?** Nach Code-Änderungen, vor PR-Merge

---

### 3. [Retrospektiven & Learnings](3-retrospective-prompts.md)
Prompts für strukturierte Reflexion:
- **Sprint Retrospektive** - Was lief gut? Was müssen wir verbessern?
- **Lessons Learned** - Dokumentation von Erkenntnissen aus Projekten

**Wann verwenden?** Am Ende von Sprints oder Projekten

---

### 4. [Post-Mortem Analysis](4-post-mortem-prompts.md)
Prompt für Incident-Analyse:
- **Incident Post-Mortem** - Strukturierte Root Cause Analysis mit 5-Whys-Methode

**Wann verwenden?** Nach Production Incidents zur Analyse und Prävention

---

### 5. [Domain-spezifische Prompts](5-domain-prompts.md)
Spezialisierte Prompts für verschiedene Technologie-Stacks:
- **Backend DDD Entity** - Domain-Driven Design mit Java/Spring
- **React Component Decomposition** - Atomic Design für Web-Frontend
- **React Native Cross-Platform** - iOS/Android Mobile Development

**Wann verwenden?** Bei der Implementierung neuer Features

---

### 6. [Copilot Integration & Best Practices](6-copilot-integration.md)
Integration mit VS Code und Best Practices:
- **Copilot Chat Commands** - Slash-Commands und Chat-Patterns
- **GitHub Copilot Integration** - Workflows direkt in VS Code
- **Best Practices** - Do's und Don'ts für Prompt-Nutzung

**Wann verwenden?** Beim Setup und tägliche Copilot-Nutzung

---

## 🎯 Nach Rolle

### Product Manager / Team Lead
- [User Story Creation](1-issue-creation-prompts.md#11-user-story-creation-prompt)
- [Feature Request Structuring](1-issue-creation-prompts.md#13-feature-request-structuring-prompt)
- [Sprint Retrospektive](3-retrospective-prompts.md#31-sprint-retro-prompt)

### Backend-Entwickler
- [DDD Entity Prompt](5-domain-prompts.md#51-backend-ddd-entity-prompt)
- [PR Description](2-pr-description-prompts.md#21-auto-generate-pr-description-prompt)
- [Code Review Feedback](2-pr-description-prompts.md#22-code-review-feedback-prompt)

### Frontend-Entwickler (Web)
- [React Component Decomposition](5-domain-prompts.md#52-react-component-decomposition-prompt)
- [PR Description](2-pr-description-prompts.md#21-auto-generate-pr-description-prompt)
- [Code Review Feedback](2-pr-description-prompts.md#22-code-review-feedback-prompt)

### Frontend-Entwickler (Mobile)
- [React Native Cross-Platform](5-domain-prompts.md#53-react-native-cross-platform-prompt)
- [PR Description](2-pr-description-prompts.md#21-auto-generate-pr-description-prompt)
- [Code Review Feedback](2-pr-description-prompts.md#22-code-review-feedback-prompt)

### QA / Test-Engineer
- [Bug Report Refinement](1-issue-creation-prompts.md#12-bug-report-refinement-prompt)
- [Incident Post-Mortem](4-post-mortem-prompts.md#41-incident-post-mortem-prompt)
- [Code Review Feedback](2-pr-description-prompts.md#22-code-review-feedback-prompt)

### DevOps / Infra
- [Incident Post-Mortem](4-post-mortem-prompts.md#41-incident-post-mortem-prompt)
- [Lessons Learned](3-retrospective-prompts.md#32-lessons-learned-template-prompt)

---

## 🛠️ Verwendungsbeispiele

### Beispiel 1: Neue Feature entwickeln

```
1. Story erstellen
   → [User Story Creation](1-issue-creation-prompts.md#11-user-story-creation-prompt)
   
2. Backend implementieren
   → [DDD Entity Prompt](5-domain-prompts.md#51-backend-ddd-entity-prompt)
   
3. Frontend implementieren
   → [React Component Decomposition](5-domain-prompts.md#52-react-component-decomposition-prompt)
   
4. PR dokumentieren
   → [PR Description](2-pr-description-prompts.md#21-auto-generate-pr-description-prompt)
   
5. Code Review geben
   → [Code Review Feedback](2-pr-description-prompts.md#22-code-review-feedback-prompt)
```

### Beispiel 2: Bug beheben

```
1. Bug reportieren
   → [Bug Report Refinement](1-issue-creation-prompts.md#12-bug-report-refinement-prompt)
   
2. Fix implementieren & testen
   
3. PR dokumentieren
   → [PR Description](2-pr-description-prompts.md#21-auto-generate-pr-description-prompt)
   
4. Code Review geben
   → [Code Review Feedback](2-pr-description-prompts.md#22-code-review-feedback-prompt)
```

### Beispiel 3: Sprint abschließen

```
1. Retrospektive durchführen
   → [Sprint Retrospektive](3-retrospective-prompts.md#31-sprint-retro-prompt)
   
2. Lessons Learned dokumentieren
   → [Lessons Learned](3-retrospective-prompts.md#32-lessons-learned-template-prompt)
   
3. Action Items für nächsten Sprint erstellen
```

### Beispiel 4: Production Incident

```
1. Incident analysieren
   → [Incident Post-Mortem](4-post-mortem-prompts.md#41-incident-post-mortem-prompt)
   
2. Fix implementieren & deployen
   
3. Action Items für Prävention erstellen
```

---

## 📖 Verwandte Dokumentation

- [Copilot Global Instructions](.github/copilot-instructions.md)
- [Development Guide](../../shared-resources/documentation/DEVELOPMENT-GUIDE.md)
- [Architecture Guide](../../shared-resources/documentation/ARCHITECTURE.md)
- [Mono-Repository Guide](../../shared-resources/documentation/MONOREPO-GUIDE.md)

---

## 🔄 Prompt-Struktur

Alle Prompts folgen diesem Schema:

```
[Problem/Kontext]
    ↓
[Eingabeformat spezifizieren]
    ↓
[Gewünschte Ausgabestruktur]
    ↓
[Validierungskriterien]
```

Dadurch sind die Prompts konsistent und wiederverwendbar.

---

## Feedback & Verbesserungen

Falls ein Prompt nicht funktioniert:
1. Erstelle einen Issue mit Label `type:prompt-feedback`
2. Beschreibe, was du versucht hast
3. Was war das Ergebnis?
4. Wie sollte es sein?

Team wird die Prompts dann iterativ verbessern.

**Letzte Aktualisierung:** Januar 2026
**Nächste Review:** Nächster Sprint
