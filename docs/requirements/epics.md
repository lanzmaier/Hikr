# Hikr - Epics

**Version:** 0.1 (Draft)  
**Status:** 🚧 In Vorbereitung  

---

## 📚 Epic Definition

Ein **Epic** ist eine große Anforderung, die aus mehreren User Stories besteht.

---

## 🎯 Epics Overview

| Epic | User Stories | Priority | Phase | Status |
|------|--------------|----------|-------|--------|
| **E1: User Authentication** | USR-01, USR-02 | MUST | MVP | 🚧 |
| **E2: Tour Discovery** | TRS-01, TRS-02, TRS-03 | MUST | MVP | 🚧 |
| **E3: Tour Booking** | PLN-01, PLN-02 | MUST | MVP | 🚧 |
| **E4: Matching Engine** | MCH-01, MCH-02 | MUST | MVP | 🚧 |
| **E5: User Profiles** | USR-03, USR-04 | SHOULD | S2 | ⏱️ |
| **E6: Advanced Matching** | MCH-03, MCH-04 | COULD | S3+ | ⏱️ |

---

## 📖 Epic Details

### **E1: User Authentication**

**Ziel:** Sichere Benutzer-Authentifizierung und Autorisierung

**Umfang:**
- Benutzer-Registrierung
- Login & Logout
- JWT Token Management
- Password Security

**User Stories:**
- US-USR-01: Register
- US-USR-02: Login

**Acceptance Criteria:**
- [ ] Benutzer können sich registrieren
- [ ] Password wird gehasht gespeichert
- [ ] JWT Token ist 24h gültig
- [ ] Logout ungültig macht Token
- [ ] Endpoints sind mit HTTPS verschlüsselt

**Timeline:** Sprint 1 (2 weeks)

---

### **E2: Tour Discovery**

**Ziel:** Benutzer können Touren finden und erkunden

**Umfang:**
- Tour-Katalog
- Suche & Filterung
- Tour-Details
- Geo-basierte Suche

**User Stories:**
- US-TRS-01: Search tours by location
- US-TRS-02: Filter by difficulty
- US-TRS-03: View tour details

**Acceptance Criteria:**
- [ ] 10+ Testtouren in Datenbank
- [ ] Suche funktioniert nach Geolocation (< 50km Radius)
- [ ] Filterung nach EASY/MODERATE/HARD
- [ ] Tour-Details zeigen: Distance, Elevation, Rating, Warnings
- [ ] Response Time < 500ms

**Timeline:** Sprint 1-2 (2-3 weeks)

---

### **E3: Tour Booking**

**Ziel:** Benutzer können Touren mit Datum planen

**Umfang:**
- Planned Tour Creation
- Date/Time Selection
- Booking Confirmation
- My Bookings Liste

**User Stories:**
- US-PLN-01: Book a tour
- US-PLN-02: Schedule date/time

**Acceptance Criteria:**
- [ ] Benutzer können Datum & Uhrzeit wählen
- [ ] Nur zukünftige Daten erlaubt
- [ ] Bestätigungs-Email gesendet
- [ ] Booking wird in "My Bookings" angezeigt
- [ ] Max. X Bookings pro Benutzer (Business Rule)

**Timeline:** Sprint 2 (2 weeks)

---

### **E4: Matching Engine**

**Ziel:** Intelligente Gruppierung von Wanderern für Touren

**Umfang:**
- Matching-Algorithmus (rule-based)
- Suggestion Generation
- Accept/Reject Workflow
- Group Finalization

**User Stories:**
- US-MCH-01: View matching suggestions
- US-MCH-02: Accept/reject group

**Acceptance Criteria:**
- [ ] Mindestens 2 Gruppen-Vorschläge pro Booking
- [ ] Score >= 0.7 für "Good Match"
- [ ] User können akzeptieren/ablehnen
- [ ] Finale Gruppe = 100% Akzeptanz aller Mitglieder
- [ ] Timeout nach 48h automatisch Storno

**Timeline:** Sprint 3-4 (2-3 weeks)

**Algorithm (v1 - Rule-Based):**
```
Score = 
  0.3 * FitnessLevelMatch +
  0.2 * LocationProximity +
  0.2 * InterestOverlap +
  0.15 * GroupSizeFit +
  0.15 * ExperienceMatch
```

---

### **E5: User Profiles**

**Ziel:** Benutzer können ihre Profile und Präferenzen verwalten

**User Stories:**
- US-USR-03: Create profile
- US-USR-04: Set preferences

**Acceptance Criteria:**
- [ ] Benutzer können FirstName, LastName, Bio setzen
- [ ] Fitness Level, Interests, Languages speichern
- [ ] Profile-Picture optional
- [ ] Preferences beeinflussen Matching

**Timeline:** Sprint 2-3

---

### **E6: Advanced Matching**

**Ziel:** ML-basiertes Matching mit Recommendations

**User Stories:**
- US-MCH-03: ML Matching (zukünftig)
- US-MCH-04: Recommendations (zukünftig)

**Status:** Future Phase (nicht MVP)

---

## 🗂️ Epic-zu-Feature Mapping

```
E1: User Authentication
  └── Backend: Auth Service
  └── Frontend: Login, Register Screens

E2: Tour Discovery
  └── Backend: Tours Service + Search
  └── Frontend: Search, Filter, Details Screens

E3: Tour Booking
  └── Backend: PlannedTours Service
  └── Frontend: Booking Flow

E4: Matching Engine
  └── Backend: Matching Service + Algorithm
  └── Frontend: Suggestions, Accept/Reject Screens
```

---

## 📊 Dependency Graph

```
E1: User Auth (Start Here)
  ↓
E2: Tour Discovery (parallel)
E3: Tour Booking (nach E2)
  ↓
E4: Matching (nach E3)
  ↓
E5: User Profiles (optional)
  ↓
E6: Advanced (Future)
```

---

## ✅ MVP Epics

Für MVP müssen folgende Epics **komplett erfüllt** sein:

- ✅ E1: User Authentication
- ✅ E2: Tour Discovery
- ✅ E3: Tour Booking
- ✅ E4: Matching Engine

---

## 🚀 Post-MVP Epics

Nach MVP-Release:

- 🔄 E5: User Profiles (Sprint 2-3)
- 🔄 E6: Advanced Matching with ML (Future)
- 🔄 E7: Messaging & Social (Future)
- 🔄 E8: Analytics & Insights (Future)

---

**Last Updated:** 2026-01-28  
**Nächste Update:** Nach Epic-Refinement mit Team
