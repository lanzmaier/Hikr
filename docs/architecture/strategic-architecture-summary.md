# Strategic Architecture Summary

**Version:** 0.1 (Draft)  
**Phase:** Strategic Design  
**Status:** 🚧 In Bearbeitung  

---

## 📋 Executive Summary

Hikr ist eine Fullstack-Plattform zur Verwaltung, Planung und Durchführung von Gruppentouren. Die Architektur folgt **Domain-Driven Design (DDD)** Prinzipien mit einer klaren Trennung in Bounded Contexts.

### Strategische Entscheidungen

| # | Entscheidung | Begründung | Trade-offs |
|---|--------------|-----------|-----------|
| 1 | **Mono-Repo mit Multi-Root Workspaces** | Shared API Contracts, zentrale Versionierung | Komplexere CI/CD Setup |
| 2 | **API-First Design (OpenAPI)** | Single Source of Truth, Code-Gen möglich | Zusätzliche Maintenance |
| 3 | **Separate Web & Mobile Frontends** | Unterschiedliche UX-Anforderungen | Code-Duplikation möglich |
| 4 | **JWT-basierte Authentifizierung** | Stateless, skalierbar | Token-Management erforderlich |
| 5 | **PostgreSQL als Hauptdatenbank** | Zuverlässig, ACID-konform, GIS-Support | Begrenzte horizontale Skalierung |

---

## 🎯 Bounded Contexts (Überblick)

### 1. **TOURS** (Core Domain)
- Tour-Verwaltung, Metadaten, Schwierigkeit
- Geo-Location basierte Filterung
- **Verantwortlich für:** Tour-Katalog

### 2. **USER** (Generic Subdomain)
- Benutzer-Authentifizierung & Autorisierung
- Benutzer-Profile & Preferences
- **Verantwortlich für:** Identitätsmanagement

### 3. **TOUR-MATCHING** (Core Domain)
- Matching-Engine für Gruppenbildung
- Matching-Requests & Suggestions
- **Verantwortlich für:** Intelligente Gruppierungen

### 4. **PLANNED-TOURS** (Supporting)
- Geplante Touren mit Datum/Zeit
- Varianten & Alternativen
- **Verantwortlich für:** Tour-Planung

### 5. **NOTIFICATIONS** (Supporting)
- Push-Notifications
- Event-basierte Benachrichtigungen
- **Verantwortlich für:** User Communication

---

## 🏗️ Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Apps                            │
│         (Web React + Mobile React Native)                   │
└──────────┬──────────────────────────────────┬────────────────┘
           │                                  │
    ┌──────▼──────────────┐         ┌────────▼─────────────┐
    │   API Gateway       │         │   WebSocket Hub      │
    │   (Load Balancing)  │         │  (Real-time Updates) │
    └──────┬──────────────┘         └────────┬─────────────┘
           │                                 │
    ┌──────▼────────────────────────────────▼──────────────┐
    │            Spring Boot Backend Services              │
    │  ┌─────────────────────────────────────────────────┐ │
    │  │ Tours Context  │  User Context │  Matching ...│ │
    │  └─────────────────────────────────────────────────┘ │
    └──────────────┬──────────────────────────────────────┘
                   │
    ┌──────────────▼──────────────┐
    │   PostgreSQL Database       │
    │   (+ Spatial GIS)           │
    └─────────────────────────────┘
```

---

## 📊 Domänen-Kategorisierung

| Context | Typ | Grund | Komplexität |
|---------|-----|-------|-------------|
| TOURS | **Core** | Geschäftskern, Wettbewerbsvorteil | Mittel |
| USER | **Generic** | Standard-Authentifizierung | Niedrig |
| TOUR-MATCHING | **Core** | AI/ML-Matching ist Unique Selling Point | Hoch |
| PLANNED-TOURS | **Supporting** | Unterstützt Matching | Mittel |
| NOTIFICATIONS | **Supporting** | Infrastruktur-Service | Niedrig |

---

## 🚀 Implementierungs-Roadmap

### Phase 1: MVP (Aktuell)
- [ ] Tours Context (CRUD, Search, Filter)
- [ ] User Context (Auth, Profiles)
- [ ] Planned Tours (Basic Scheduling)
- [ ] Simple Matching (Rule-based)
- [ ] Frontend Web & Mobile (Basic UIs)

### Phase 2: Intelligence
- [ ] Advanced Matching (ML-basiert)
- [ ] Recommendations
- [ ] Analytics

### Phase 3: Scale
- [ ] Caching-Layer (Redis)
- [ ] Event Sourcing
- [ ] Microservices (optional)

---

## ✅ Kernbegriffe & Geschäftsregeln

### Kernbegriffe
- **Tour:** Vordefinierte Wanderroute mit Metadaten
- **Planned Tour:** Buchung einer Tour mit spezifischem Datum
- **Matching:** Prozess, Wanderer in Gruppen einzuteilen
- **Group:** Eine oder mehrere Wanderer für eine Planned Tour

### Geschäftsregeln
1. Eine Tour kann mehrmals geplant werden (unterschiedliche Daten)
2. Eine Planned Tour kann mehrere Gruppen haben
3. Matching berücksichtigt: Skills, Fitness-Level, Interessen, Sprache
4. Eine Gruppe muss 2-8 Personen haben
5. Matching wird manuell akzeptiert/abgelehnt (kein Zwang)

---

## 🔗 Weitere Dokumentation

- [Bounded Contexts Map](bounded-contexts-map.md) - Details pro Context
- [Ubiquitous Language](ubiquitous-language-glossar.md) - Glossar aller Begriffe
- [Domain Events](domain-events-integrations.md) - Events & Integration Patterns
- [Visualisierungen](context-map-visualizations.md) - Mermaid Diagramme

---

**Last Updated:** 2026-01-28  
**Nächste Update:** Nach Team-Feedback
