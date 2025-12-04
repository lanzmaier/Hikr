# Hikr

Hikr ist eine moderne Wander- und Outdoor-Tracking-Anwendung, die als Mono-Repository organisiert ist. Das Projekt kombiniert eine leistungsstarke Backend-API mit plattformübergreifenden Frontend-Anwendungen.

## 📁 Projekt-Struktur

Dieses Mono-Repository ist in folgende Workspaces unterteilt:

### Workspaces

- **`backend/`** - Spring Boot Backend-Anwendung
  - REST API für die Hikr-Anwendung
  - Java/Maven-basiert
  - Authentifizierung, Datenverwaltung und Business-Logik

- **`frontend/`** - React Native Web/Desktop Frontend
  - Webanwendung basierend auf React Native
  - Gemeinsame Codebasis mit der mobilen App
  
- **`mobile-frontend/`** - React Native Mobile App
  - Native mobile App für iOS und Android
  - React Native mit Expo oder bare workflow

### Zusätzliche Verzeichnisse

- **`.github/`** - GitHub-spezifische Konfiguration
  - Workflows, Issue-Templates, etc.
  
- **`shared-resources/`** - Gemeinsame Ressourcen
  - Geteilte Assets, Konfigurationen und Utilities
  - Wiederverwendbare Komponenten zwischen Workspaces
  
- **`docs/`** - Projektdokumentation
  - Architektur-Dokumentation
  - API-Dokumentation
  - Entwicklerhandbücher

## 🚀 Getting Started

### Voraussetzungen

- **Backend**: Java 17+, Maven 3.8+
- **Frontend/Mobile**: Node.js 18+, npm oder yarn
- Git

### Installation

Jeder Workspace hat seine eigenen Abhängigkeiten und Build-Prozesse. Siehe die jeweiligen README-Dateien in den Workspace-Verzeichnissen für detaillierte Anweisungen.

```bash
# Backend
cd backend
mvn clean install

# Frontend
cd frontend
npm install
npm start

# Mobile Frontend
cd mobile-frontend
npm install
npm start
```

## 🛠 Entwicklung

Dieses Projekt folgt der Mono-Repository-Struktur, um Code-Sharing und konsistente Entwicklung über alle Plattformen hinweg zu ermöglichen.

## 📝 Lizenz

Weitere Informationen folgen.

## 👥 Beiträge

Beiträge sind willkommen! Bitte beachten Sie die Contribution-Guidelines im `docs/`-Verzeichnis.