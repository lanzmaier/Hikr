# GitHub Issue Templates für Hikr

Strukturierte Vorlagen für verschiedene Issue-Typen zur Sicherstellung von Konsistenz und Qualität.

## 📋 Verfügbare Templates

### 1. User Story (`user-story.md`)
**Wann nutzen?** Wenn du eine neue Feature entwickeln möchtest

**Struktur:**
- Title: Kurze Featurebeschreibung
- User Story: "Als [Role] möchte ich [Feature] so dass [Nutzen]"
- Acceptance Criteria: Testbare Kriterien
- Definition of Done: Abschlusskriterien
- Story Points: Aufwandsschätzung
- Dependencies: Abhängigkeiten

**Beispiel:**
```
Title: Touren nach Schwierigkeitsgrad filtern

User Story:
Als Wanderer möchte ich Touren nach Schwierigkeitsgrad filtern
so dass ich nur Touren finde, die meinen Fähigkeiten entsprechen

Acceptance Criteria:
1. Filter-Dropdown zeigt alle verfügbaren Schwierigkeitsgrade
2. Nach Auswahl werden nur passende Touren angezeigt
3. Filter funktioniert auf Web und Mobile
```

### 2. Bug Report (`bug-report.md`)
**Wann nutzen?** Wenn du einen Fehler gefunden hast

**Struktur:**
- Title: [System] - [Kurzbeschreibung]
- Severity: Critical / High / Medium / Low
- Environment: System, Browser, OS
- Reproduction Steps: Exakte Schritte zum Reproduzieren
- Expected vs. Actual: Was sollte passieren vs. was passiert
- Logs/Screenshots: Debug-Informationen

**Beispiel:**
```
Title: [Web] - Tour Map wird nicht angezeigt

Severity: High
Environment: Windows 10, Firefox 115, Backend running

Steps to Reproduce:
1. Öffne Tour Detail Seite
2. Scrolle zu "Map" Sektion
3. Karte wird nicht angezeigt
```

### 3. Feature Request (`feature-request.md`)
**Wann nutzen?** Für Ideen, die noch nicht vollständig ausgearbeitet sind

**Struktur:**
- Title: Feature-Idee
- Background: Warum ist das wertvoll?
- Users: Welche Nutzer profitieren?
- Viability: Technisch machbar?
- Estimated Effort: Ungefähre Größe

**Beispiel:**
```
Title: Tour-Sharing via Social Media

Background:
Nutzer möchten Touren mit Freunden auf Social Media teilen

Users:
- Hiking Enthusiasts
- Tour Planners

Viability: Medium (braucht Social Media Integration)
```

## 🔄 Issue Template Workflow

```
1. Gehe zu GitHub Issues
2. Klick "New Issue"
3. Wähle Template:
   - "User Story" für Features
   - "Bug Report" für Fehler
   - "Feature Request" für Ideen
4. Fülle Template aus
5. Add Labels (type, priority, team)
6. Submit!
```

## 📝 Best Practices für Issue-Writing

### ✅ Do's

**User Stories:**
- Schreib aus Nutzer-Perspektive
- Mache Acceptance Criteria testbar
- Estimiere mit Story Points (3, 5, 8, 13)
- Add Team & Component Labels

**Bug Reports:**
- Sei präzise mit Reproduktionsschritten
- Teile Umgebungsinformationen
- Anhang Logs/Screenshots wenn möglich
- Markiere Severity korrekt

### ❌ Don'ts

- Keine zu großen Stories (max 13 Points)
- Keine technischen Details in User Stories
- Keine Mittagessen-Bug-Beschreibungen ("Es funktioniert nicht")
- Keine fehlenden Acceptance Criteria

## 🏷️ Issue Labels

### Type Labels
- `type:story` - User Story
- `type:bug` - Bug Report
- `type:feature` - Feature Request
- `type:documentation` - Dokumentation
- `type:refactor` - Code Refactoring
- `type:performance` - Performance Issue

### Priority Labels
- `priority:critical` - Blockiert Produktion
- `priority:high` - Wichtige Feature
- `priority:medium` - Normale Priorität
- `priority:low` - Nice to have

### Team Labels
- `team:backend` - Backend Development
- `team:web` - Web Frontend
- `team:mobile` - Mobile Frontend
- `team:devops` - Infrastructure
- `team:pm` - Product Management

### Status Labels
- `status:backlog` - Backlog (nicht gestartet)
- `status:in-progress` - Aktuell in Arbeit
- `status:review` - Im Code Review
- `status:done` - Abgeschlossen

### Component Labels
- `component:tours` - Tour Management
- `component:matching` - Matching Algorithm
- `component:auth` - Authentication
- `component:ui` - User Interface
- `component:api` - API/Backend

## 🔗 Integration mit KI-Agents

### Project Manager Agent
- Nutze **User Story Template** mit Agent
- [Project Manager Agent Guide](../../docs/AGENTS.md#5️⃣-project-manager-agent)

### Workflow Prompts
- **Issue Creation Prompt** für strukturiertes Feedback
- [Workflow Prompts](../../docs/prompts/workflow-prompts.md#11-issue-erstellung)

## 💡 Beispiel-Issues

### Good User Story ✅

```
Title: Display tour difficulty level on tour cards

User Story:
As a hiker, I want to see the difficulty level on tour preview cards,
so that I can quickly identify tours that match my skill level

Acceptance Criteria:
- [ ] Tour card shows difficulty badge (Easy/Medium/Hard)
- [ ] Difficulty color coding matches design tokens
- [ ] Badge visible on all tour card sizes (list & grid)
- [ ] Works on Web and Mobile

Definition of Done:
- [ ] Unit tests written (80%+ coverage)
- [ ] Storybook stories created
- [ ] Code review approved
- [ ] Accessibility (a11y) verified

Story Points: 5
Team: @web, @mobile
Components: tours, ui
```

### Good Bug Report ✅

```
Title: [Mobile] - Tour profile image crops incorrectly

Severity: High
Component: tours, ui
Team: @mobile

Environment:
- iOS 17.1
- iPhone 14 Pro
- App Version: 1.2.3

Reproduction Steps:
1. Open tour detail page
2. Scroll to profile section
3. Tour image is cropped incorrectly
4. Image height is less than 200px (should be 300px)

Expected Behavior:
Tour profile image should fill entire container (300px height)

Actual Behavior:
Image is cropped to ~150px height

Screenshots:
[Attach screenshot showing the issue]

Logs:
[Share any error logs from Xcode console]
```

## 🔍 Issue Review Checklist

**Vor dem Assignment:**
- [ ] Title ist klar und prägnant
- [ ] Template wurde vollständig ausgefüllt
- [ ] Acceptance Criteria sind testbar (für Stories)
- [ ] Reproduktionsschritte sind genau (für Bugs)
- [ ] Labels sind korrekt gesetzt
- [ ] Abhängigkeiten sind aufgelistet

**Vor dem Merge (PR Review):**
- [ ] Alle Acceptance Criteria erfüllt
- [ ] Tests geschrieben (80%+ coverage)
- [ ] Code folgt Standards
- [ ] Dokumentation aktualisiert

## ⚙️ Automation & CI

### GitHub Actions Integration

```yaml
on:
  issues:
    types: [opened]

jobs:
  add-labels:
    runs-on: ubuntu-latest
    steps:
      - if: contains(issue.title, '[Bug]')
        run: gh issue edit ${{ issue.number }} --add-label "type:bug"
```

### Auto-Close Template

Issues werden auto-closed wenn:
- Stale (60 Tage ohne Aktivität)
- Duplicate (markiert mit `duplicate`)
- Won't Fix (markiert mit `wontfix`)

## 📊 Issue Metrics

**Monatlich überprüfen:**
- Issue Creation Rate
- Average Resolution Time
- Bug Escapeate Rate
- User Story Estimation Accuracy

## 🐛 Feedback zu Templates

Falls ein Template nicht funktioniert:

1. Erstelle ein Issue mit Label `type:template-feedback`
2. Beschreibe das Problem
3. Schlag Verbesserungen vor

Team wird Templates iterativ verbessern!

---

**Verwandte Ressourcen:**
- [GitHub Issue Best Practices](https://github.com/features/issues)
- [Project Manager Agent](../../docs/AGENTS.md#5️⃣-project-manager-agent)
- [Workflow Prompts](../../docs/prompts/workflow-prompts.md)
- [Global Standards](./../copilot-instructions.md)
