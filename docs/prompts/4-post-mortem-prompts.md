# Post-Mortem Analysis

Spezialisierte Prompts für Incident Post-Mortem und Analyse.

## 4.1 Incident Post-Mortem Prompt

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

**Verwandte Dokumentation:**
- [Workflow Prompts Index](workflow-prompts.md)
- [Retrospektive-Prompts](3-retrospective-prompts.md)
- [Best Practices](7-best-practices.md)
