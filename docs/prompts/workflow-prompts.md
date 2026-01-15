# Workflow Prompts für KI-gestützte Entwicklung

Spezialisierte Prompts für häufige Team-Workflows im Hikr-Projekt. Kopieren Sie den Prompt, passen Sie die Platzhalter an, und geben Sie ihn an den AI-Assistant ein.

## 1. Issue-Erstellung: Von Brainstorming zu strukturierten GitHub Issues

### 1.1 User Story Creation Prompt

```
Du bist ein erfahrener Product Manager für das Hikr-Outdoor-Touren-Plattform. 
Erstelle eine strukturierte User Story basierend auf folgendem Feedback/Idee:

[FEEDBACK/IDEA HERE]

Erstelle die Story im folgenden Format:
- Title: Kurz und aussagekräftig (max 60 Zeichen)
- User Story: "Als [User-Rolle] möchte ich [Funktionalität] so dass [Geschäftswert]"
- Akzeptanzkriterien (3-5 konkrete, testbare Kriterien)
- Definition of Done: Was muss erfüllt sein?
- Geschätzter Aufwand: Story Points (3/5/8/13)
- Abhängigkeiten: Welche anderen Stories müssen zuerst abgeschlossen sein?
- Betroffene Komponenten: Backend / Web-Frontend / Mobile-Frontend
- Label: art, priority, team

Validiere die Story gegen die Hikr-Standards:
✓ Story ist INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable)
✓ Akzeptanzkriterien sind aus Benutzerperspektive
✓ Keine technischen Implementierungsdetails in der Story
✓ OpenAPI-Spec muss aktualisiert werden (falls API-Change)
```

### 1.2 Bug Report Refinement Prompt

```
Du bist ein QA-Engineer. Der folgende Bug wurde gemeldet:

[BUG DESCRIPTION]

Strukturiere den Bug-Report nach folgendem Schema:
- Title: [System] - [Fehlerhafte Funktion]
- Severity: Critical / High / Medium / Low
- Umgebung: Backend/Web/Mobile, Browser/OS, Netzwerk
- Reproduktionsschritte: Exakte Schrittfolge (1-2-3...)
- Erwartetes Verhalten: Was sollte passieren?
- Aktuelles Verhalten: Was passiert tatsächlich?
- Logs/Screenshots: Relevante Fehler-Ausgaben
- Erste Vermutungen: Welche Komponente könnte betroffen sein?
- Workaround: Gibt es einen Workaround für Nutzer?

Severity-Bewertung:
- Critical: Blockiert Produktion oder Kerntechnologie
- High: Größere Funktionalität beeinträchtigt
- Medium: Einzelne Features beeinträchtigt
- Low: Minor Issues, kosmetisch
```

### 1.3 Feature Request Structuring Prompt

```
Du analysierst einen Feature-Request für das Hikr-Projekt:

[FEATURE REQUEST]

Strukturiere den Feature-Request:
1. Titel: Klare, aussagekräftige Funktionsbeschreibung
2. Hintergrund: Warum ist diese Feature wertvoll?
3. Nutzen: Welche Benutzer profitieren? Warum?
4. Technische Machbarkeit: Einfach / Mittel / Komplex
5. Geschätzter Aufwand: 3/5/8/13/21 Story Points
6. Dependencies: Welche anderen Features müssen vorher fertig sein?
7. Betroffene Komponenten: Backend/Web/Mobile/API
8. OpenAPI-Änderungen: Muss die API-Spec aktualisiert werden?

Validierung gegen Hikr-Strategie:
✓ Passt zu Kern-Missionen (Outdoor-Touren entdecken, Matching, Community)
✓ Nicht redundant mit existierenden Features
✓ Realistische Komplexität für Sprint
```

---

## 2. PR-Beschreibungen: Von Code-Diffs zu aussagekräftigen Pull Requests

### 2.1 Auto-Generate PR Description Prompt

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

### 2.2 Code Review Feedback Prompt

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

## 3. Post-Milestone: Strukturierte Reflexion

### 3.1 Sprint Retro Prompt

```
Sprintzusammenfassung:
- Sprint-Nummer: #XX
- Dauer: [Start-Datum bis End-Datum]
- Team-Zusammensetzung: [Anzahl Backend, Frontend, Mobile, QA]
- Sprint Goals: [Auflistung der Ziele]
- Abgeschlossene Stories: [Anzahl, Story Points]
- Nicht abgeschlossene Stories: [Anzahl, Gründe]

Erstelle eine strukturierte Retrospektive:

## ✅ Was ist gut gelaufen?

**Technisch:**
- [Was funktionierte bei der Implementierung?]
- [Welche Tools/Prozesse halfen?]

**Teamdynamik:**
- [Wie war die Zusammenarbeit?]
- [Welche Kommunikation funktionierte?]

**Prozesse:**
- [Welche Prozesse liefen reibungslos?]

## 🔴 Wo hatten wir Schwierigkeiten?

**Blockers:**
- Blocker 1: [Was blockierte uns?] → Impact: [Wie viele SP verloren?]
- Blocker 2: [Ursache?]

**Technische Schulden:**
- [Welche Schulden haben sich angehäuft?]

**Prozessverbesserungen:**
- [Wo können wir den Prozess verbessern?]

## 🎯 Action Items für nächsten Sprint

| Action | Owner | Sprint | Priority |
|--------|-------|--------|----------|
| [Maßnahme] | [Name] | [Sprint #] | High/Medium/Low |

## 📊 Metriken

- Sprint Velocity: [Sum of completed Story Points]
- Burn-down Rate: [Linear / Declining / Escalating]
- Bug-Rate: [Anzahl Bugs, die während des Sprints geöffnet wurden]
- Code Review Time: [Durchschn. Wartezeit in Stunden]
- Deployment Frequency: [Wie oft wurde deployed?]
- Lead Time: [Durchschn. Zeit von Story bis Production]
```

### 3.2 Lessons Learned Template Prompt

```
Erstelle ein strukturiertes Lessons-Learned-Dokument basierend auf folgendem Projekt/Feature:

[PROJECT/FEATURE DESCRIPTION]

Zeitrahmen: [Dauer]
Team: [Größe und Zusammensetzung]
Ergebnis: [Success/Partial Success/Failed]

## 📚 Key Insights

### Was haben wir gelernt?

**Technische Erkenntnisse:**
1. [Lernen 1] - Impact: [Warum ist das wichtig?]
2. [Lernen 2]
3. [Lernen 3]

**Prozess-Erkenntnisse:**
1. [Lernen 1]
2. [Lernen 2]

**Team-Erkenntnisse:**
1. [Lernen 1]
2. [Lernen 2]

## 🔄 Was wiederholen wir?

[Best Practices, die wir beibehalten sollten]
- Praktik 1: [Beschreibung]
- Praktik 2: [Beschreibung]

## ⚠️ Was vermeiden wir?

[Anti-Patterns und Fehler, die wir nicht wiederholen]
- Anti-Pattern 1: [Was war das Problem?]
- Anti-Pattern 2: [Ursache?]

## 🚀 Verbesserungen für nächste Projekt

| Verbesserung | Begründung | Verantwortlicher | Zielsprirt |
|--------------|-----------|------------------|-----------|
| [Verbesserung] | [Warum?] | [Wer?] | [Wann?] |

## 📖 Dokumentation

- [ ] Lessons Learned dokumentiert
- [ ] Best Practices aktualisiert
- [ ] Team-Wikis aktualisiert
- [ ] Review mit dem Team durchgeführt
```

---

## 4. Post-Mortem Analysis

### 4.1 Incident Post-Mortem Prompt

```
Ein Incident ist aufgetreten:

**Incident:** [Beschreibung]
**Zeitpunkt:** [Datum/Uhrzeit]
**Dauer:** [Von - Bis]
**Severity:** Critical / High / Medium / Low
**Benutzerauswirkung:** [Wie viele Nutzer? Welche Funktionalität?]

Erstelle einen strukturierten Post-Mortem-Report:

## 🔍 Incident Timeline

| Zeit | Event | Komponente | Aktion |
|------|-------|-----------|--------|
| HH:MM | Incident gestartet | [System] | [Automatische Alerts?] |
| HH:MM | Erkannt von | [Team] | [Wer hat es gemerkt?] |
| HH:MM | Response gestartet | [Team] | [Initial triage?] |
| HH:MM | Root Cause gefunden | [System] | [Ursache?] |
| HH:MM | Fix deployed | [System] | [Lösung?] |
| HH:MM | Incident resolved | [System] | [Verification?] |

## 🔴 Root Cause Analysis

**Unmittelbare Ursache:** [Was ist technisch fehlgeschlagen?]
- [Technisches Detail 1]
- [Technisches Detail 2]

**Zugrunde liegende Ursachen:**
- Ursache 1: [Warum war das möglich?]
- Ursache 2: [Präventionsmechanismus fehlte?]

## 🛡️ Verbesserungen (5 Why's)

1. Warum ist der Fehler passiert? → [Antwort 1]
2. Warum [Antwort 1]? → [Antwort 2]
3. Warum [Antwort 2]? → [Antwort 3]
4. Warum [Antwort 3]? → [Antwort 4]
5. Warum [Antwort 4]? → [Root Cause]

**Präventionsmechanismus:**
[Was müsste implementiert sein, um das zu verhindern?]

## ✅ Action Items

| Action Item | Owner | Sprint | Priority | Deadline |
|-------------|-------|--------|----------|----------|
| [Technischer Fix] | [Team] | [Sprint] | Critical | [Datum] |
| [Monitoring verbessern] | [DevOps] | [Sprint] | High | [Datum] |
| [Test hinzufügen] | [QA] | [Sprint] | High | [Datum] |
| [Dokumentation] | [Team] | [Sprint] | Medium | [Datum] |

## 📊 Metriken

- **Time to Detect:** [Minuten]
- **Time to Mitigate:** [Minuten]
- **Time to Resolve:** [Minuten]
- **Customer Impact:** [Anzahl betroffene Nutzer]
- **Reputational Impact:** [Gering/Mittel/Hoch]

## 📝 Lessons Learned

**Was haben wir gelernt?**
- [Lernen 1]
- [Lernen 2]

**Wie verbessern wir unsere Prozesse?**
- [Prozessverbesserung 1]
- [Prozessverbesserung 2]
```

---

## 5. Spezielle Domain-Prompts

### 5.1 Backend DDD Entity Prompt

```
Du implementierst eine neue Domain-Entity für das Hikr-Backend. 
Domäne: [Tours/Matching/UserProfile/...]

**Geschäftsanforderung:**
[Beschreibe die Geschäftsregel oder das Entity]

Generiere:
1. **Value Objects:** Welche unveränderlichen Werte gehören zur Entity?
2. **Aggregates:** Welche Related Entities gehören zusammen?
3. **Repository Interface:** Wie wird die Entity persistiert?
4. **Domain Service:** Welche Geschäftslogik ist erforderlich?
5. **Tests:** Unit Tests für Geschäftsregeln

Validierung gegen DDD:
✓ Entity hat klare Identity
✓ Value Objects sind unveränderlich
✓ Geschäftsregeln sind in der Domain, nicht in der Datenbank
✓ Repository abstrahiert Persistierung
```

### 5.2 React Component Decomposition Prompt

```
Du zerlegst eine UI-Komponente in Atomic Design:

**Feature:** [Zu implementierende UI-Komponente]
**Wireframe/Anforderung:**
[Beschreibe das UI-Layout]

Generiere:
1. **Atoms:** Kleinste, wiederverwendbare Komponenten
2. **Molecules:** Kombinationen von Atoms
3. **Organisms:** Komplexe, selbständige UI-Teile
4. **Templates:** Layout-Templates
5. **Pages:** Komplette Seiten

Für jede Komponente:
- Props-Interface (TypeScript)
- Unit Test (Vitest)
- Story (Storybook)
- Accessibility-Überlegungen

Validierung:
✓ Komponenten sind Single Responsibility
✓ Props sind typsicher
✓ Jede Komponente hat Tests
✓ a11y-Labels vorhanden
```

### 5.3 React Native Cross-Platform Prompt

```
Du entwickelst eine React Native Komponente für iOS/Android:

**Feature:** [Zu implementierende Mobile-UI]
**Plattformen:** iOS / Android / Both

Generiere:
1. **Gemeinsame Logik:** Shared Component Logic
2. **iOS-spezifisch:** .ios.tsx Datei
3. **Android-spezifisch:** .android.tsx Datei
4. **Platform-neutral:** Shared Utils
5. **Tests:** Platform-spezifische Tests

Überlegungen:
- Platform-spezifische APIs (Native Modules wenn nötig)
- Performance (FlatList statt ScrollView für große Listen)
- Accessibility (VoiceOver für iOS, TalkBack für Android)
- Navigation (Stack vs. Tab vs. Drawer)

Validierung:
✓ Code lädt auf iOS und Android
✓ Performance-Metriken ok
✓ Accessibility geprüft
```

---

## 6. Integration mit Copilot

### 6.1 Copilot Extensions (VS Code)

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

### 6.2 GitHub Copilot Chat Integration

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

## 7. Best Practices für Prompt-Nutzung

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

## 8. Prompt-Maintenance

**Letzte Aktualisierung:** [DATUM]
**Verantwortlicher:** Team Lead
**Nächste Review:** [DATUM + 1 Sprint]

### Feedback zu Prompts
Falls ein Prompt nicht funktioniert:
1. Erstelle einen Issue mit Label `type:prompt-feedback`
2. Beschreibe, was du versucht hast
3. Was war das Ergebnis?
4. Wie sollte es sein?

Team wird den Prompt dann iterativ verbessern.

---

**Verwandte Dokumentation:**
- [Copilot Instructions](.github/copilot-instructions.md)
- [Backend-DDD Agent](.github/agents/backend-ddd.agent.md)
- [Web-CDD Agent](.github/agents/web-cdd.agent.md)
- [Mobile-CDD Agent](.github/agents/mobile-cdd.agent.md)
- [Project Manager Agent](.github/agents/project-manager.agent.md)
