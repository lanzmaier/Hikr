# Copilot Integration & Best Practices

Anleitung zur Integration mit VS Code Copilot und Best Practices für Prompt-Nutzung.

## 6.1 Copilot Extensions (VS Code)

Verwenden Sie folgende Prompt-Pattern in VS Code:

```
# Chat Command Pattern
@workspace Erstelle eine User Story basierend auf diesem Feedback:
[PASTE FEEDBACK]

# Slash Commands
/explain - Erkläre den ausgewählten Code gegen Hikr-Standards
/suggest - Vorschläge für Verbesserungen
/test - Generiere Unit Tests
/doc - Generiere JSDoc/JavaDoc
/refactor - Refactorisiere den Code
```

## 6.2 GitHub Copilot Chat Integration

```
In VS Code:
1. Öffne Copilot Chat (Ctrl+Shift+I)
2. Verwende folgende Kommandos:

/workflow Issue-Erstellung
  → Leitet zum Issue-Creation-Prompt

/workflow PR-Beschreibung
  → Leitet zum PR-Generation-Prompt

/workflow Retrospektive
  → Leitet zum Sprint-Retro-Prompt

/workflow Post-Mortem
  → Leitet zum Post-Mortem-Prompt

/domain Backend Entity
  → Leitet zum DDD-Entity-Prompt

/domain React Component
  → Leitet zum Component-Decomposition-Prompt

/domain React Native
  → Leitet zum Cross-Platform-Prompt
```

---

## Best Practices für Prompt-Nutzung

### ✅ Do's
- **Spezifisch sein:** Geben Sie Kontext, nicht nur generische Fragen
- **Standards referenzieren:** "Nach Hikr-Standards" ist explizit
- **Struktur vorgeben:** Nutzen Sie die Templates aus dieser Datei
- **Validierung einfordern:** "Validiere gegen Hikr-Standards"
- **Iterativ verbessern:** Nutzen Sie Feedback, um Prompts zu optimieren

### ❌ Don'ts
- **Zu generisch:** "Schreib Code für eine Tour"
- **Keine Kontext:** Copilot needs history
- **Zu viel auf einmal:** Break down complex tasks
- **Keine Qualitätskriterien:** Definiere DoD für Prompt
- **Standards ignorieren:** Hikr-Standards sind nicht optional

---

## Prompt-Maintenance

**Letzte Aktualisierung:** Januar 2026
**Verantwortlicher:** Team Lead
**Nächste Review:** Nächster Sprint

### Feedback zu Prompts
Falls ein Prompt nicht funktioniert:
1. Erstelle einen Issue mit Label `type:prompt-feedback`
2. Beschreibe, was du versucht hast
3. Was war das Ergebnis?
4. Wie sollte es sein?

Team wird den Prompt dann iterativ verbessern.

---

**Verwandte Dokumentation:**
- [Workflow Prompts Index](workflow-prompts.md)
- [Copilot Instructions](.github/copilot-instructions.md)
- [DEVELOPMENT-GUIDE](../../shared-resources/documentation/DEVELOPMENT-GUIDE.md)
