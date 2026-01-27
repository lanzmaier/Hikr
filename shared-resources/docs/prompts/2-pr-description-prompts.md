# PR-Beschreibungen: Von Code-Diffs zu aussagekräftigen Pull Requests

Spezialisierte Prompts für hochwertige Pull Request Dokumentation.

## 2.1 Auto-Generate PR Description Prompt

```
Hier ist ein Git-Diff für einen Pull Request in das Hikr-Projekt:

[PASTE GIT DIFF HERE]

Generiere eine aussagekräftige PR-Beschreibung nach folgendem Template:

---
## What does this PR do?
[Kurze Erklärung in 1-2 Sätzen]

## Why are we doing this?
[Business-Value oder technischer Grund]

## Changes
- Change 1: [Was ändert sich und warum]
- Change 2
- Change 3

## Type of Change
[ ] Bug fix
[ ] New feature
[ ] Breaking change
[ ] Documentation
[ ] Performance improvement

## Affected Components
[ ] Backend (Java/Spring)
[ ] Web Frontend (React/TypeScript)
[ ] Mobile Frontend (React Native)
[ ] API Specification
[ ] Documentation

## Testing
### What testing was performed?
- Unit tests: [Ja/Nein, wie viele]
- Integration tests: [Ja/Nein, welche]
- Manual testing: [Ja/Nein, auf welchen Systemen]

### Test coverage
- New/modified lines: XXX
- Coverage increase: +YY%

## Related Issues
Fixes #123
Relates to #456, #789

## Deployment Considerations
- Database migration: [Ja/Nein]
- Environment variables changed: [Ja/Nein]
- Breaking changes: [Ja/Nein, beschreiben]

---

Validierung:
✓ Beschreibung erklärt "Was" und "Warum", nicht nur "Wie"
✓ Alle betroffenen Komponenten aufgelistet
✓ Testing-Status ist klar
✓ Relationen zu Issues aufgelistet
```

## 2.2 Code Review Feedback Prompt

```
Der folgende Code wurde in einem PR eingereicht. Erstelle konstruktives Feedback:

[CODE SNIPPET]

Beurteile gegen Hikr-Standards:
1. Namenskonventionen: Java PascalCase/camelCase, TypeScript camelCase
2. Error Handling: Werden Fehler angemessen behandelt?
3. Logging: Sind aussagekräftige Logs vorhanden?
4. Tests: Gibt es ausreichend Tests?
5. Dokumentation: Ist der Code dokumentiert?
6. Performance: Gibt es Performance-Probleme?
7. Security: Gibt es Sicherheitsbedenken?

Format des Feedbacks:
**Issue:** [Kurzbeschreibung]
**Location:** [Datei, Zeile]
**Severity:** Critical / High / Medium / Low / Suggestion
**Explanation:** [Warum ist das ein Problem?]
**Suggestion:** [Wie kann man es beheben?]
**Reference:** [Relevant Standard/Dokumentation]
```

---

**Verwandte Dokumentation:**
- [Workflow Prompts Index](workflow-prompts.md)
- [Issue-Erstellungs-Prompts](1-issue-creation-prompts.md)
- [Best Practices](7-best-practices.md)
