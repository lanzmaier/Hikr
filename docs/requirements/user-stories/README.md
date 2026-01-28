# User Stories

**Version:** 0.1 (Draft)  
**Status:** 🚧 In Vorbereitung  

---

## 📖 User Stories Directory

Dieses Verzeichnis enthält detaillierte User Stories für alle Hikr-Features.

### Structure

```
user-stories/
├── README.md (diese Datei)
├── US-USR-01-Register.md
├── US-USR-02-Login.md
├── US-TRS-01-Search-Tours.md
├── US-TRS-02-Filter-Tours.md
├── US-TRS-03-View-Details.md
├── US-PLN-01-Book-Tour.md
├── US-PLN-02-Schedule-DateTime.md
├── US-MCH-01-View-Suggestions.md
└── US-MCH-02-Accept-Reject.md
```

---

## 📝 User Story Format

Jede Story folgt diesem Template:

```markdown
# US-XXX-TITLE

**Epic:** [E1/E2/E3/E4/E5/E6]
**Priority:** [MUST/SHOULD/COULD]
**Sprint:** [S1/S2/S3/etc]

## 📖 User Story

As a [User Role]
I want to [Feature]
So that [Benefit]

## ✅ Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## 🎯 Tasks

1. [Backend Task]
2. [Frontend Task]
3. [Testing Task]

## 🛠️ Technical Details

- API Endpoint: POST /api/v1/...
- Database Changes: [Schema changes]
- Dependencies: [Other Stories]

## 📋 Definition of Done

- [ ] Code Review passed
- [ ] Unit Tests (>80%)
- [ ] Integration Tests passed
- [ ] Documentation updated
```

---

## 🚧 Geplante User Stories

### Phase 1: MVP (S1-S4)

| ID | Title | Epic | Priority | Status |
|----|-------|------|----------|--------|
| US-USR-01 | Register | E1 | MUST | 📝 Planned |
| US-USR-02 | Login | E1 | MUST | 📝 Planned |
| US-TRS-01 | Search Tours | E2 | MUST | 📝 Planned |
| US-TRS-02 | Filter by Difficulty | E2 | MUST | 📝 Planned |
| US-TRS-03 | View Tour Details | E2 | MUST | 📝 Planned |
| US-PLN-01 | Book Tour | E3 | MUST | 📝 Planned |
| US-PLN-02 | Schedule Date/Time | E3 | MUST | 📝 Planned |
| US-MCH-01 | View Suggestions | E4 | MUST | 📝 Planned |
| US-MCH-02 | Accept/Reject Group | E4 | MUST | 📝 Planned |

### Phase 2: S2-S3

| ID | Title | Epic | Priority | Status |
|----|-------|------|----------|--------|
| US-USR-03 | Create Profile | E5 | SHOULD | ⏱️ Future |
| US-USR-04 | Set Preferences | E5 | SHOULD | ⏱️ Future |
| US-TRS-04 | View Tour on Map | E2 | SHOULD | ⏱️ Future |

### Phase 3: Future

| ID | Title | Epic | Priority | Status |
|----|-------|------|----------|--------|
| US-MCH-03 | ML-based Matching | E6 | COULD | ⏱️ Future |
| US-MCH-04 | Recommendations | E6 | COULD | ⏱️ Future |
| US-TRS-05 | Save Favorites | E2 | COULD | ⏱️ Future |

---

## 🔗 Related Documents

- [Story Map](../story-map.md) - Prioritization & Overview
- [Epics](../epics.md) - Epic Definitions
- [MVP Summary](../mvp-summary.md) - MVP Scope

---

**Last Updated:** 2026-01-28  
**Nächste Update:** Nach Story-Schreibung
