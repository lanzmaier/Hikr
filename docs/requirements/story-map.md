# Hikr - User Story Map

**Version:** 0.1 (Draft)  
**Status:** 🚧 In Vorbereitung  

---

## 📋 Story Map Übersicht

Die User Story Map strukturiert die Anforderungen nach:
- **Backbone:** Hauptziele/Features in Reihenfolge
- **Rows:** Priorisierung (Must-Have → Nice-to-Have)
- **Columns:** User Stories pro Feature

---

## 🎯 Hauptflows (Backbone)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HIKR USER JOURNEYS                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. EXPLORE      2. PLAN        3. MATCH       4. SHARE           │
│  ──────────      ────────       ───────       ────────            │
│  - Search       - Book Tour    - Get Recs    - Invite            │
│  - Filter       - Schedule     - Accept      - Feedback          │
│  - Details      - Confirm      - Finalize    - Rate              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Story Map Matrix

### Phase 1: EXPLORE TOURS (MVP)

| Priorität | Story | Sprint | Status |
|-----------|-------|--------|--------|
| **MUST** | US-TRS-01: Search tours by location | S1 | 🚧 |
| **MUST** | US-TRS-02: Filter by difficulty | S1 | 🚧 |
| **MUST** | US-TRS-03: View tour details | S1 | 🚧 |
| **SHOULD** | US-TRS-04: View tour on map | S2 | ⏱️ |
| **COULD** | US-TRS-05: Save favorite tours | S3 | ⏱️ |

### Phase 2: PLAN TOURS (MVP)

| Priorität | Story | Sprint | Status |
|-----------|-------|--------|--------|
| **MUST** | US-PLN-01: Book a tour | S2 | 🚧 |
| **MUST** | US-PLN-02: Schedule date/time | S2 | 🚧 |
| **SHOULD** | US-PLN-03: Create tour variants | S3 | ⏱️ |
| **COULD** | US-PLN-04: Invite friends | S4 | ⏱️ |

### Phase 3: MATCHING (MVP)

| Priorität | Story | Sprint | Status |
|-----------|-------|--------|--------|
| **MUST** | US-MCH-01: View matching suggestions | S3 | 🚧 |
| **MUST** | US-MCH-02: Accept/reject group | S3 | 🚧 |
| **SHOULD** | US-MCH-03: See group profiles | S4 | ⏱️ |
| **COULD** | US-MCH-04: Message group members | S5 | ⏱️ |

### Phase 4: USER MANAGEMENT

| Priorität | Story | Sprint | Status |
|-----------|-------|--------|--------|
| **MUST** | US-USR-01: Register | S1 | 🚧 |
| **MUST** | US-USR-02: Login | S1 | 🚧 |
| **MUST** | US-USR-03: Create profile | S2 | 🚧 |
| **SHOULD** | US-USR-04: Set preferences | S2 | ⏱️ |
| **COULD** | US-USR-05: Upload profile picture | S4 | ⏱️ |

---

## 🎖️ Priorisierung

**MUST (MVP essentiell):**
- ✅ User Registration & Login
- ✅ Tour Search & Filter
- ✅ Book Tour
- ✅ Simple Matching
- ✅ Accept/Reject Groups

**SHOULD (Sprint 2-3):**
- Tour Details + Map
- Profile & Preferences
- Group Profiles
- Tour Variants

**COULD (Future Phases):**
- Favorites
- Friend Invite
- Messaging
- Analytics

---

## 📌 MVP Definition

**MVP = Minimal Viable Product**

Für Hikr MVP sind folgende User Stories erforderlich:

1. **User Management**
   - Register & Login
   - Basic Profile

2. **Tour Discovery**
   - Search by location
   - Filter by difficulty
   - View details

3. **Tour Booking**
   - Create Planned Tour
   - Select date/time

4. **Matching**
   - View suggestions (rule-based)
   - Accept/reject groups
   - Finalize group

---

## 🚀 Sprint Planning

| Sprint | Focus | Stories | Duration |
|--------|-------|---------|----------|
| **S1** | Setup + Auth | USR-01, USR-02, TRS-01 | 2 weeks |
| **S2** | Core Booking | TRS-02, TRS-03, PLN-01 | 2 weeks |
| **S3** | Matching | MCH-01, MCH-02, USR-03 | 2 weeks |
| **S4** | Polish | USR-04, TRS-04, MCH-03 | 2 weeks |

---

## 📖 Related Files

- [User Stories Directory](user-stories/) - Detaillierte Stories
- [Transcripts](transcripts/) - Interview & Workshop Notes
- [Architecture](../architecture/) - Technical Design

---

**Last Updated:** 2026-01-28  
**Nächste Update:** Nach Requirements Gathering
