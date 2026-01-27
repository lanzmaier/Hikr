# Issue-Erstellung: Von Brainstorming zu strukturierten GitHub Issues

Spezialisierte Prompts für Issue-Management im Hikr-Projekt.

## 1.1 User Story Creation Prompt

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

## 1.2 Bug Report Refinement Prompt

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

## 1.3 Feature Request Structuring Prompt

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

**Verwandte Dokumentation:**
- [Workflow Prompts Index](workflow-prompts.md)
- [PR-Beschreibungs-Prompts](2-pr-description-prompts.md)
- [Retrospektive-Prompts](3-retrospective-prompts.md)
