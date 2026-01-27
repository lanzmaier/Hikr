# Post-Milestone: Strukturierte Reflexion

Spezialisierte Prompts für Sprint Retrospektiven und Lessons Learned.

## 3.1 Sprint Retro Prompt

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

## 3.2 Lessons Learned Template Prompt

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

**Verwandte Dokumentation:**
- [Workflow Prompts Index](workflow-prompts.md)
- [Post-Mortem-Prompts](4-post-mortem-prompts.md)
- [Best Practices](7-best-practices.md)
