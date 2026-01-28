# Context Map Visualizations

**Version:** 0.1 (Draft)  
**Phase:** Strategic Design  
**Status:** 🚧 In Bearbeitung  

---

## 📊 Diagram 1: Bounded Contexts Overview

```mermaid
graph TB
    USER["🔐 USER<br/>Generic"]
    TOURS["🏔️ TOURS<br/>Core"]
    PLANNED["📅 PLANNED-TOURS<br/>Supporting"]
    MATCHING["🤝 TOUR-MATCHING<br/>Core"]
    NOTIF["📧 NOTIFICATIONS<br/>Supporting"]
    
    TOURS -->|Tour Data| PLANNED
    PLANNED -->|Start Matching| MATCHING
    USER -->|Preferences| MATCHING
    MATCHING -->|GroupSuggested| NOTIF
    TOURS -->|Tour Updates| NOTIF
    USER -->|Register| NOTIF
    
    style USER fill:#e1f5ff
    style TOURS fill:#fff3e0
    style PLANNED fill:#f3e5f5
    style MATCHING fill:#fff3e0
    style NOTIF fill:#e8f5e9
```

---

## 📊 Diagram 2: Integration Flows

```mermaid
sequenceDiagram
    participant U as User Frontend
    participant PT as PlannedTours
    participant EB as Event Bus
    participant M as Matching
    participant N as Notifications
    
    U->>PT: Create PlannedTour
    PT->>EB: PlannedTourCreated
    EB->>M: MatchingStarted
    M->>M: Calculate Groups
    M->>EB: GroupSuggested
    EB->>N: GroupSuggested
    N->>U: Push Notification
```

---

## 📊 Diagram 3: Domain Events Chain

```mermaid
graph LR
    A["UserRegistered"] -->|subscribes| B["UserProfileUpdated"]
    C["TourCreated"] -->|triggers| D["PlannedTourCreated"]
    D -->|triggers| E["MatchingStarted"]
    E -->|results in| F["GroupSuggested"]
    F -->|can lead to| G["GroupAccepted"]
    G -->|results in| H["MatchingCompleted"]
    H -->|notifies| I["UserNotified"]
    
    style A fill:#c8e6c9
    style C fill:#ffe0b2
    style E fill:#f8bbd0
    style H fill:#b3e5fc
```

---

## 📊 Diagram 4: Matching State Machine

```mermaid
stateDiagram-v2
    [*] --> PENDING: MatchingStarted
    PENDING --> PROCESSING: Calculate Groups
    PROCESSING --> PENDING: GroupSuggested
    PENDING --> ACCEPTED: User Accepts
    ACCEPTED --> COMPLETED: All Accept
    ACCEPTED --> REJECTED: User Rejects
    REJECTED --> PENDING: New Suggestion
    COMPLETED --> [*]
    
    note right of PENDING
        Waiting for user
        decision
    end note
    
    note right of COMPLETED
        Final group
        confirmed
    end note
```

---

## 📊 Diagram 5: Context Dependency Matrix

| → von / zu ↓ | USER | TOURS | PLANNED-TOURS | MATCHING | NOTIFICATIONS |
|-------------|------|-------|--------------|----------|----------------|
| **USER** | - | - | - | Reads Prefs | - |
| **TOURS** | - | - | Reads Data | Reads Data | - |
| **PLANNED-TOURS** | Reads Auth | Reads Data | - | Triggers | - |
| **MATCHING** | Reads Prefs | Reads Data | Updates Status | - | Triggers |
| **NOTIFICATIONS** | - | - | - | - | - |

**Legende:**
- `-` = Keine Abhängigkeit
- `Reads` = Lesezugriff via Query
- `Triggers` = Event Publishing
- `Updates` = Direktes Update via API

---

## 📊 Diagram 6: MVP vs. Future

```mermaid
graph TB
    subgraph MVP["🎯 MVP (Phase 1)"]
        U1["User Context"]
        T1["Tours Context"]
        P1["Planned Tours"]
        M1["Basic Matching<br/>(Rule-based)"]
        N1["Simple Notifications"]
    end
    
    subgraph Future["🚀 Future (Phase 2+)"]
        M2["Advanced Matching<br/>(ML-based)"]
        A2["Analytics"]
        R2["Recommendations"]
        C2["Caching Layer"]
    end
    
    MVP -->|Scale & ML| Future
    
    style MVP fill:#c8e6c9
    style Future fill:#ffe0b2
```

---

## 📊 Diagram 7: Data Flow

```mermaid
graph LR
    FE["Frontend<br/>(Web/Mobile)"]
    API["API Gateway"]
    AUTH["Auth Service"]
    TOURS["Tours Service"]
    MATCH["Matching Service"]
    DB["PostgreSQL"]
    CACHE["Redis Cache"]
    EB["Event Bus"]
    
    FE -->|HTTPS| API
    API -->|Verify JWT| AUTH
    API -->|Get Tours| TOURS
    API -->|Start Matching| MATCH
    
    TOURS -->|Query| DB
    TOURS -->|Cache Hit?| CACHE
    
    MATCH -->|User Profiles| DB
    MATCH -->|Tour Data| DB
    
    TOURS -->|Emit| EB
    MATCH -->|Emit| EB
    EB -->|Invalidate| CACHE
    
    style FE fill:#e1f5ff
    style API fill:#fff3e0
    style DB fill:#f3e5f5
    style EB fill:#e8f5e9
```

---

## 📊 Diagram 8: Anti-Corruption Layer

```mermaid
graph LR
    HIKR["Hikr<br/>(Internal)"]
    ACL["Anti-Corruption<br/>Layer"]
    EXT["External<br/>Services"]
    
    HIKR -->|Requests| ACL
    ACL -->|Transform| EXT
    EXT -->|Response| ACL
    ACL -->|Internal DTOs| HIKR
    
    EXT1["🗺️ Maps API"]
    EXT2["🌤️ Weather API"]
    EXT3["🔔 Push Service"]
    
    ACL -.->|Google Maps| EXT1
    ACL -.->|OpenWeather| EXT2
    ACL -.->|Firebase/APNs| EXT3
    
    style HIKR fill:#c8e6c9
    style ACL fill:#ffe0b2
    style EXT fill:#f8bbd0
```

---

## 🎨 Color Legend

| Farbe | Bedeutung | Beispiele |
|-------|-----------|----------|
| 🟢 Grün | Core Domain | TOURS, MATCHING |
| 🟠 Orange | Supporting | PLANNED-TOURS, CACHE |
| 🔵 Blau | Generic | USER, AUTH |
| 🔴 Rot | External | 3rd Party Services |
| ⚪ Weiß | Infrastructure | Database, Event Bus |

---

## 📐 Architecture Principles

1. **Bounded Contexts sind voneinander unabhängig**
   - Jeder Context hat eigene DB
   - Kommunikation via Events

2. **Events sind für asynchrone Integration**
   - Loose Coupling zwischen Contexts
   - Bessere Skalierbarkeit

3. **Anti-Corruption Layers schützen vor Externe**
   - External APIs werden abgegrenzt
   - Hikr-interne Domain bleibt sauber

4. **User Context ist central**
   - Alle anderen Contexts lesen User-Daten
   - Authentifizierung bei jedem Request

---

## 🔍 Mermaid Live Editor

Diese Diagramme können in den Mermaid Live Editor kopiert werden:
👉 [https://mermaid.live](https://mermaid.live)

---

**Last Updated:** 2026-01-28  
**Nächste Update:** Nach Diagramm-Refinement mit Team
