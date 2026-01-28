# Bounded Contexts Map

**Version:** 0.1 (Draft)  
**Phase:** Strategic Design  
**Status:** 🚧 In Bearbeitung  

---

## 🗺️ Contexts Überblick

```
┌─────────────────────────────────────────────────────────┐
│                    HIKR SYSTEM                          │
│                                                         │
│  ┌─────────────┐         ┌──────────────┐             │
│  │   TOURS     │         │ PLANNED TOURS│             │
│  │  (Core)     │────────→│ (Supporting) │             │
│  └─────────────┘         └──────────────┘             │
│         │                       │                      │
│         └───────────┬───────────┘                      │
│                     │                                 │
│         ┌───────────▼────────────┐                    │
│         │  TOUR-MATCHING         │                    │
│         │  (Core Domain)         │                    │
│         └───────────┬────────────┘                    │
│                     │                                 │
│         ┌───────────┼────────────┐                    │
│         │           │            │                    │
│    ┌────▼───┐ ┌─────▼────┐ ┌────▼─────┐            │
│    │ USER   │ │NOTIF.    │ │ EXTERNAL │            │
│    │Context │ │Context   │ │ Services │            │
│    └────────┘ └──────────┘ └──────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📍 Context 1: TOURS (Core Domain)

### Purpose
Verwaltung von Tour-Definitionen, Routen und Metadaten

### Entities & Value Objects
- **Tour** (Entity)
  - id: UUID
  - title: String
  - startPoint: Location (VO)
  - endPoint: Location (VO)
  - distance: Double (km)
  - duration: Integer (minutes)
  - difficulty: Enum (EASY, MODERATE, HARD)
  - elevation: Integer (m)
  - season: String
  - pathType: String
  - rating: Double (1-5)
  - warnings: List[String]

- **Location** (Value Object)
  - latitude: Double
  - longitude: Double
  - name: String
  - parking: Parking (VO, optional)

- **Parking** (Value Object)
  - available: Boolean
  - spots: Integer
  - distance: Integer (m)
  - cost: Double

### Geschäftsregeln
- Eine Tour muss mindestens 1km lang sein
- Difficulty muss korrekt zur Elevation passen (GR)
- Startpunkt muss Koordinaten haben (GPS)
- Rating wird aus Benutzer-Reviews berechnet

### Events
- `TourCreated`
- `TourUpdated`
- `TourDeleted`

### Integration
- **Nach:** PlannedTours Context (Tours werden gebucht)
- **Nach:** Matching Context (für Matching-Berechnung)

---

## 📍 Context 2: USER (Generic Subdomain)

### Purpose
Authentifizierung, Autorisierung, Benutzer-Profile

### Entities & Value Objects
- **User** (Entity)
  - id: UUID
  - username: String
  - email: Email (VO)
  - passwordHash: String
  - profile: UserProfile (VO)
  - preferences: UserPreferences (VO)
  - location: Location (VO)
  - joinDate: DateTime

- **UserProfile** (Value Object)
  - firstName: String
  - lastName: String
  - profileImage: URL
  - bio: String
  - experience: Enum (BEGINNER, INTERMEDIATE, ADVANCED)

- **UserPreferences** (Value Object)
  - fitnessLevel: Enum
  - interests: List[String]
  - languages: List[String]
  - groupSize: Integer
  - maxDistance: Double

### Geschäftsregeln
- Email muss eindeutig sein
- Username muss 3-30 Zeichen lang sein
- Password muss Min. 8 Zeichen + 1 Großbuchstabe + 1 Zahl sein
- JWT Token ist 24 Stunden gültig

### Events
- `UserRegistered`
- `UserProfileUpdated`
- `UserDeleted`

### Integration
- **Von:** Alle Contexts (für Authentifizierung)
- **Nach:** Matching Context (Profil für Matching-Berechnung)

---

## 📍 Context 3: TOUR-MATCHING (Core Domain)

### Purpose
Intelligente Gruppierung von Wanderern für Touren

### Entities & Value Objects
- **Matching** (Aggregate Root)
  - id: UUID
  - plannedTourId: UUID
  - requests: List[MatchingRequest]
  - suggestions: List[MatchingGroup]
  - finalGroup: MatchingGroup (optional)
  - status: Enum (PENDING, PROCESSING, COMPLETED)

- **MatchingRequest** (Entity)
  - id: UUID
  - userId: UUID
  - type: Enum (OFFER, SEARCH) // Angebot oder Suche
  - criteria: Criteria (VO)

- **Criteria** (Value Object)
  - maxGroupSize: Integer
  - minFitnessLevel: Enum
  - interests: List[String]
  - languages: List[String]

- **MatchingGroup** (Value Object)
  - id: UUID
  - members: List[UserId]
  - score: Double (0-1, Kompatibilität)
  - reason: String (Warum passt diese Gruppe)

### Matching-Algorithmus
```
1. Alle Requests für eine Planned Tour sammeln
2. Für jede Kombination von Requests:
   - Fitness-Level-Gap prüfen
   - Interessens-Überlap berechnen
   - Sprachen-Kompatibilität prüfen
   - Gruppensiez prüfen (2-8 Personen)
3. Top-N Vorschläge ranken nach Score
4. Benutzer akzeptieren/lehnen ab
```

### Geschäftsregeln
- Eine Gruppe muss 2-8 Personen haben
- Matching wird nicht erzwungen (opt-in)
- Ein User kann mehreren Matching-Requests haben
- Finales Matching muss von allen Mitgliedern akzeptiert sein

### Events
- `MatchingStarted`
- `GroupSuggested`
- `GroupAccepted`
- `GroupRejected`
- `MatchingCompleted`

### Integration
- **Von:** PlannedTours Context (Matching starten)
- **Von:** USER Context (Profile & Preferences)
- **Von:** TOURS Context (Tour-Metadaten)
- **Nach:** NOTIFICATIONS Context (Group-Vorschläge)

---

## 📍 Context 4: PLANNED-TOURS (Supporting)

### Purpose
Buchung von Tours mit spezifischem Datum

### Entities & Value Objects
- **PlannedTour** (Aggregate Root)
  - id: UUID
  - tourId: UUID
  - scheduledDate: Date
  - scheduledTime: Time
  - startPoint: Location
  - variants: List[TourVariant] (optional)
  - participants: List[UserId]
  - createdBy: UserId
  - status: Enum (PLANNING, ACTIVE, COMPLETED, CANCELLED)

- **TourVariant** (Value Object)
  - id: UUID
  - variantName: String
  - distance: Double
  - duration: Integer

### Geschäftsregeln
- Ein User kann mehrere Planned Tours erstellen
- Eine Planned Tour muss in der Zukunft liegen
- Änderungen sind nur im PLANNING-Status möglich
- Nach Matching ist Änderung nicht mehr möglich

### Events
- `PlannedTourCreated`
- `PlannedTourUpdated`
- `PlannedTourCancelled`
- `MatchingRequested` (→ Matching Context)

### Integration
- **Von:** USER Context (Authentifizierung)
- **Von:** TOURS Context (Tour-Details)
- **Nach:** Matching Context (Matching-Anfragen)

---

## 📍 Context 5: NOTIFICATIONS (Supporting)

### Purpose
Benachrichtigungen an Benutzer

### Entities
- **Notification** (Entity)
  - id: UUID
  - userId: UUID
  - type: Enum (GROUP_SUGGESTION, TOUR_UPDATE, etc.)
  - title: String
  - body: String
  - relatedEntityId: UUID
  - read: Boolean
  - createdAt: DateTime

### Geschäftsregeln
- Notifications sind 30 Tage sichtbar
- Users können Notification-Preferences setzen
- Push-Notifications nur mit Permission

### Events
- `NotificationCreated`
- `NotificationRead`
- `NotificationDeleted`

### Integration
- **Von:** Matching Context (Group-Vorschläge)
- **Von:** PlannedTours Context (Tour-Updates)
- **Nach:** (keine)

---

## 🔄 Integration Flows

### Flow 1: Tour buchen & Matching starten

```
1. User wählt Tour & Datum (PlannedTours Context)
2. PlannedTourCreated Event
3. MatchingRequested Event wird gesendet
4. Matching Engine startet (Matching Context)
5. GroupSuggested Event
6. Notifications werden erstellt (Notifications Context)
```

### Flow 2: Matching-Entscheidung

```
1. User akzeptiert GroupSuggestion
2. GroupAccepted Event
3. Bei 100% Akzeptanz: MatchingCompleted Event
4. Finale Gruppe wird benachrichtigt
```

---

## 🛡️ Anti-Corruption Layer

Externe Services (z.B. für Wetter, Navigation) werden über Adapter abstrahiert.

```
PlannedTours Context
    │
    └─→ WeatherAdapter (External Weather API)
    └─→ MapsAdapter (Google Maps / OSM)
    └─→ NotificationAdapter (Firebase, APNs)
```

---

## 📚 Weiterführende Docs

- [Ubiquitous Language Glossar](ubiquitous-language-glossar.md)
- [Domain Events & Integrations](domain-events-integrations.md)
- [Context Map Visualizations](context-map-visualizations.md)

---

**Last Updated:** 2026-01-28  
**Nächste Update:** Nach Context-Refinement
