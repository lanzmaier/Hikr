# Hikr - MVP Definition

**Version:** 0.1 (Draft)  
**Phase:** Planning  
**Status:** 🚧 In Vorbereitung  

---

## 🎯 MVP Scope

Hikr MVP ist ein "Hello World" Proof-of-Concept, der die folgenden Kernfunktionen demonstriert:

### Must-Have Features

#### 1. **User Management**
- [ ] Benutzer-Registrierung
- [ ] Login mit JWT
- [ ] Basis-Profil (Name, Location)

#### 2. **Tour Discovery**
- [ ] Tour-Suche nach Geolocation
- [ ] Filterung nach Schwierigkeit (EASY/MODERATE/HARD)
- [ ] Tour-Details anzeigen
- [ ] 10+ vordefinierte Test-Touren

#### 3. **Tour Booking**
- [ ] Planned Tour erstellen (Tour + Datum + Zeit)
- [ ] Bestätigung anzeigen

#### 4. **Matching Engine**
- [ ] Matching starten (rule-based, kein ML)
- [ ] 2-3 Gruppen-Vorschläge anzeigen
- [ ] Accept/Reject pro Benutzer
- [ ] Finale Gruppe bestätigen

#### 5. **Frontend Interfaces**
- [ ] Web Frontend (React)
- [ ] Mobile Frontend (React Native)
- [ ] Basis-Navigation zwischen Features

---

## ❌ Out of MVP Scope

- ❌ Messaging zwischen Usern
- ❌ Friend Invitations
- ❌ Tour Reviews & Ratings
- ❌ Tour Variant Management
- ❌ Advanced ML Matching
- ❌ Push Notifications
- ❌ Payment Integration
- ❌ Analytics
- ❌ Admin Dashboard

---

## 📊 MVP Success Criteria

| Kriterium | Target | Aktuell |
|-----------|--------|---------|
| **Touren durchsuchbar** | ✅ | 🚧 |
| **Benutzer können buchen** | ✅ | 🚧 |
| **Matching funktioniert** | ✅ | 🚧 |
| **Web & Mobile Launch** | ✅ | 🚧 |
| **API-First Design** | ✅ | 🚧 |
| **15+ Test-Stories** | ✅ | 🚧 |

---

## 🏗️ Technical MVP Stack

**Backend:**
- Spring Boot 3.x
- Java 21
- PostgreSQL
- OpenAPI/Swagger
- JWT Authentication

**Frontend Web:**
- React 18+
- TypeScript
- Vite
- React Router
- Vitest

**Frontend Mobile:**
- React Native
- TypeScript
- React Navigation
- (iOS & Android Support)

**Deployment:**
- Docker Containers
- Docker Compose (local)
- Cloud Ready (GCP/Azure/AWS)

---

## 📝 User Stories (MVP)

| ID | Title | Priority | Acceptance Criteria |
|----|-------|----------|-------------------|
| US-USR-01 | Register | MUST | User kann sich mit Email/Password registrieren |
| US-USR-02 | Login | MUST | JWT Token erhalten & bleiben authenticated |
| US-TRS-01 | Search Tours | MUST | Finde Touren nach Location + Difficulty |
| US-TRS-02 | View Details | MUST | Zeige Tour Details (Distance, Elevation, etc) |
| US-PLN-01 | Book Tour | MUST | User kann Tour mit Datum/Zeit buchen |
| US-MCH-01 | View Suggestions | MUST | Zeige 2-3 Matching-Gruppen-Vorschläge |
| US-MCH-02 | Accept/Reject | MUST | User kann Gruppe akzeptieren/ablehnen |

---

## 🎬 Happy Path Demo Flow

```
1. [Unregistered User]
   → Register with Email/Password
   → Confirm Registration

2. [Registered User - Browse]
   → Login with credentials
   → Search tours (by location, difficulty)
   → View tour details + map
   
3. [Registered User - Book]
   → Select a tour
   → Choose date & time
   → Confirm booking
   → See "Planned Tour" in my bookings
   
4. [Registered User - Match]
   → View Matching Suggestions (2-3 groups)
   → See group member profiles
   → Accept a group suggestion
   → Confirm final group
   → See group confirmation

5. [End State]
   → User is part of a group for a tour
   → Can see group members
```

---

## 📅 MVP Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| **Kickoff** | Week 1 | Architecture, Setup, Team |
| **Backend Core** | Week 2-3 | Auth, Tours, Booking APIs |
| **Matching Engine** | Week 4 | Matching Logic, Suggestions |
| **Web Frontend** | Week 3-4 | React UI, Integrated |
| **Mobile Frontend** | Week 4-5 | React Native, Integrated |
| **Testing & Polish** | Week 5-6 | E2E Tests, Bug Fixes |
| **Go-Live** | Week 6 | Production Deployment |

**Total: ~6 Wochen**

---

## 🎯 Definition of Done (MVP)

Vor MVP-Release müssen folgende Kriterien erfüllt sein:

- [ ] Alle MUST User Stories erfüllt
- [ ] Akzeptanzkriterien geprüft
- [ ] Unit Tests (>80% Coverage)
- [ ] Integration Tests für alle APIs
- [ ] E2E Tests für Happy Path
- [ ] Code Review bestanden
- [ ] Documentation vollständig
- [ ] Security Review bestanden
- [ ] Performance Tests OK (< 2s load time)
- [ ] Accessibility Check (WCAG AA)

---

## 📖 Related Documents

- [Story Map](story-map.md) - Priorisierung & Planung
- [User Stories](user-stories/) - Detaillierte Anforderungen
- [Architecture](../architecture/strategic-architecture-summary.md) - Technical Design

---

**Last Updated:** 2026-01-28  
**Nächste Review:** Nach Architecture-Validierung
