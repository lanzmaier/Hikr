# Contributing to Hikr

Danke, dass du zum Hikr-Projekt beitragen möchtest! 🎉

## Code of Conduct

Bitte beachte unseren [Code of Conduct](./CODE_OF_CONDUCT.md) bei allen Interaktionen mit dem Projekt.

## Wie kann ich beitragen?

### Bugs melden

1. **Prüfe die [GitHub Issues](https://github.com/hikr/hikr/issues)**, ob der Bug bereits gemeldet wurde
2. **Erstelle ein neues Issue** mit folgendem Format:
   - Titel: Klare, aussagekräftige Beschreibung
   - Beschreibung: Schritte zum Reproduzieren, erwartetes Verhalten, aktuales Verhalten
   - Environment: Betriebssystem, Browser, Versionen
   - Screenshots/Logs: Falls zutreffend

### Features vorschlagen

1. **Öffne eine [GitHub Discussion](https://github.com/hikr/hikr/discussions)** oder ein Issue mit dem Label `enhancement`
2. **Beschreibe das Feature** so detailliert wie möglich
3. **Begründe, warum** diese Feature sinnvoll ist
4. **Sammle Feedback** von anderen Beitragenden

### Code beitragen

#### Setup

```bash
# Fork und Clone
git clone https://github.com/DEIN_USERNAME/hikr.git
cd hikr
git remote add upstream https://github.com/hikr/hikr.git

# Branch erstellen
git checkout -b feature/dein-feature
```

#### Entwicklung

1. **Beachte die Coding Standards:** Siehe [Development Guide](./shared-resources/documentation/DEVELOPMENT-GUIDE.md)
2. **Schreibe Tests** für neue Features
3. **Dokumentiere** deine Änderungen
4. **Führe Linting durch:** `npm run lint` / `mvn checkstyle:check`

#### Git-Workflow

```bash
# Atomare Commits mit Konventionen
git add shared-resources/api-contracts/
git commit -m "api: add new endpoint"

git add backend/
git commit -m "backend: implement service"

git add frontend-web/
git commit -m "web: implement UI"

# Push to fork
git push origin feature/dein-feature

# Erstelle Pull Request
# - Titel: prägnant und aussagekräftig
# - Beschreibung: Verwende PR Template
# - Linked Issues: Referenziere verwandte Issues
```

#### Commit-Konventionen

Format: `<type>(<scope>): <subject>`

**Types:**
- `api` - API/OpenAPI-Spec Änderungen
- `backend` - Java/Spring Boot Code
- `web` - React/Web Code
- `mobile` - React Native/Mobile Code
- `shared` - Gemeinsame Ressourcen
- `ci` - GitHub Actions/CI-Pipelines
- `docs` - Dokumentation
- `test` - Test-Code
- `refactor` - Code Refactoring
- `perf` - Performance-Optimierungen

**Scopes:** `tours`, `matching`, `auth`, `ui`, etc.

**Beispiele:**
```
api: add tour search parameters
backend(tours): implement search service
web(auth): fix login form validation
mobile(ui): improve responsive design
test(backend): add tour service tests
docs: update deployment guide
```

#### Pull Request Checklist

- [ ] Branch basiert auf `develop`
- [ ] Tests geschrieben/aktualisiert
- [ ] Alle Tests grün (`npm test`, `mvn test`)
- [ ] Linting erfolgreich (`npm run lint`, `mvn checkstyle:check`)
- [ ] Dokumentation aktualisiert
- [ ] CHANGELOG.md aktualisiert
- [ ] OpenAPI-Spec aktualisiert (falls API-Änderung)
- [ ] Keine `console.log()` oder Debug-Code
- [ ] Keine Secrets/Credentials committed

### Dokumentation verbessern

- Fehler in [README.md](./README.md) gefunden? → Edit + PR
- Architektur unklar? → [ARCHITECTURE.md](./shared-resources/documentation/ARCHITECTURE.md) verbessern
- Neues Feature? → [Development Guide](./shared-resources/documentation/DEVELOPMENT-GUIDE.md) aktualisieren

## Review-Prozess

1. **Automatische Checks:** GitHub Actions führt Tests durch
2. **Code Review:** Mindestens ein Reviewer aus dem entsprechenden Team
3. **Changes:** Feedback implementieren und nachschieben
4. **Merge:** Ein Maintainer merged den PR

### Reviewer Guidelines

```
✅ Gute Reviews sind:
- Konstruktiv und hilfreiche Kritik
- Auf Code, nicht auf Person fokussiert
- Schnell (24-48h Turnover)
- Detailliert mit konkreten Vorschlägen

❌ Schlechte Reviews:
- "Das macht keinen Sinn" ohne Begründung
- Persönliche Anmerkungen
- Bikeshedding (unnötige Diskussionen)
```

## Entwicklungs-Workflow pro Team

### Backend-Team
- Neue Endpoints in OpenAPI-Spec definieren
- Spring Boot Services implementieren
- Datenbank-Migrations schreiben
- Integration Tests hinzufügen

### Frontend-Team (Web)
- React Components erstellen
- TypeScript nutzen
- Accessibility beachten (a11y)
- Responsive Design testen

### Frontend-Team (Mobile)
- React Native Screens implementieren
- Plattformspezifische Tests (iOS/Android)
- Push-Notifications integrieren
- Offline-Funktionalität unterstützen

## Setup lokal

```bash
# Full Workspace
code hikr-full.code-workspace

# Focused Workspace (empfohlen für Anfänger)
code hikr-backend.code-workspace   # oder
code hikr-web.code-workspace       # oder
code hikr-mobile.code-workspace
```

## Support

- 📖 [Development Guide](./shared-resources/documentation/DEVELOPMENT-GUIDE.md)
- 🏗️ [System Architecture](./shared-resources/documentation/ARCHITECTURE.md)
- 🔗 [Mono-Repository Guide](./shared-resources/documentation/MONOREPO-GUIDE.md)
- 💬 [GitHub Discussions](https://github.com/hikr/hikr/discussions)

## Community

- Sei respektvoll und hilfsbereit
- Teile Wissen mit anderen Contributoren
- Freue dich auf Code Reviews - sie machen den Code besser!

---

Danke für dein Engagement zum Hikr-Projekt! ❤️

**Happy Coding!** 🚀
