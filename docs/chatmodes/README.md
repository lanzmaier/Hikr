# Hikr - Chatmodes für GitHub Copilot

Spezialisierte Chatmodes zur Struktur-lierten Zusammenarbeit mit GitHub Copilot in verschiedenen Rollen.

## 📋 Verfügbare Chatmodes

### 1. Requirements Engineer
**Datei:** `requirements-engineer.chatmode.md` *(geplant)*

Führt durch die systematische Anforderungserhebung vom Projektkontext bis zur Story Map:

1. **Projektkontext & Stakeholder-Identifikation**
2. **Informationserhebung** durch:
   - Stakeholder-Interviews
   - Moderierte Workshops
   - Domain Expert Sessions
3. **Story Mapping** - Erstellung einer User Story Map
4. **User Story Erstellung** - Dokumentation aller Stories

**Erstellt:** docs/requirements/

---

### 2. Software Architect
**Datei:** `sw-architect.chatmode.md` *(geplant)*

Führt durch die Strategische Architektur-Gestaltung:

1. **Domain Analysis** - Geschäftsdomäne verstehen
2. **Bounded Contexts** - Kontexte identifizieren
3. **Strategic Design** - 5 Architektur-Dokumente
4. **Validierung** - Feedback mit dem Team

**Erstellt:**
- docs/architecture/strategic-architecture-summary.md
- docs/architecture/bounded-contexts-map.md
- docs/architecture/ubiquitous-language-glossar.md
- docs/architecture/domain-events-integrations.md
- docs/architecture/context-map-visualizations.md

---

### 3. Software Developer (Backend/Frontend)
**Datei:** `sw-developer.chatmode.md` *(geplant)*

Führt durch die Implementierung einer User Story:

1. **Story verstehen** - Anforderungen analysieren
2. **Architektur-Review** - Architecture Docs checken
3. **Code-Generation** - Boilerplate erstellen
4. **Implementierung** - Feature implementieren
5. **Testing** - Tests schreiben
6. **Documentation** - Code dokumentieren

**Erstellt:** Source Code + Tests + Docs

---

### 4. Support Chatmodes

#### request-interview.chatmode.md *(geplant)*
Simulierte Stakeholder-Interviews durchführen

#### request-workshop-moderator.chatmode.md *(geplant)*
Moderierte Workshops durchführen

#### request-workshop-stakeholder.chatmode.md *(geplant)*
Stakeholder-Perspektiven sammeln

---

## 🚀 How to Use

### Option 1: VS Code Chat Interface
```
1. Öffne vs code
2. Drücke Ctrl+Shift+I (Chat öffnen)
3. Kopiere den Inhalt einer .chatmode.md Datei
4. Starten Sie die Konversation
```

### Option 2: Command Line / API
```bash
# Mit GitHub Copilot CLI (zukünftig)
copilot load-chatmode docs/chatmodes/requirements-engineer.chatmode.md
```

---

## 📚 Dokumentation

Jeder Chatmode ist dokumentiert mit:
- **Ziel:** Was wird mit diesem Mode erreicht
- **Phasen:** Schritt-für-Schritt Anleitung
- **Output:** Welche Artefakte entstehen
- **Beispiele:** Konkrete Prompts und Responses

---

## 🔄 Workflow-Integration

```
Requirements Gathering (requirements-engineer)
         ↓
Architecture Design (sw-architect)
         ↓
Backend Implementation (sw-developer)
         ↓
Frontend Implementation (sw-developer)
         ↓
Testing & QA
```

---

## 📝 Weitere Ressourcen

- [Workflow Prompts](../prompts/workflow-prompts.md) - Ad-hoc Prompts
- [Issue Creation Prompts](../prompts/1-issue-creation-prompts.md) - GitHub Issues
- [PR Description Prompts](../prompts/2-pr-description-prompts.md) - Pull Requests
- [Retrospective Prompts](../prompts/3-retrospective-prompts.md) - Sprint Retros

---

**Status:** 🚧 In Vorbereitung  
**Last Updated:** 2026-01-28
