# Ubiquitous Language Glossar

**Version:** 0.1 (Draft)  
**Phase:** Strategic Design  
**Status:** 🚧 In Bearbeitung  

---

## 📖 Allgemeine Begriffe (Domänenweit)

| Begriff | Definition | Englisch | Kontext |
|---------|-----------|----------|---------|
| **Tour** | Vordefinierte Wanderroute mit Metadaten | Tour | TOURS |
| **Planned Tour** | Buchung einer Tour für ein spezifisches Datum/Zeit | Planned Tour | PLANNED-TOURS |
| **Matching** | Prozess der Gruppierung von Wanderern | Matching | TOUR-MATCHING |
| **Gruppe** | 2-8 Wanderer für gemeinsame Tour | Group | TOUR-MATCHING |
| **User/Wanderer** | Plattform-Benutzer | User | USER |
| **Notification** | Benachrichtigung an User | Notification | NOTIFICATIONS |
| **Location** | Geografischer Punkt (Lat/Long) | Location | TOURS, USER |
| **Difficulty** | Schwierigkeitsgrad (EASY, MODERATE, HARD) | Difficulty | TOURS |
| **Fitness Level** | Fitness-Fähigkeit eines Users | Fitness Level | USER |

---

## 🎯 Pro Context - Detaillierte Begriffe

### **TOURS CONTEXT**

#### Nomen (Substantive)

| Term | Definition | Attribute |
|------|-----------|-----------|
| **Tour** | Vordefinierte Wanderroute | ID, Title, Distance, Duration |
| **Start Point** | Einstiegspunkt einer Tour | Lat, Long, Parking Info |
| **End Point** | Ausstiegspunkt (optional) | Lat, Long |
| **Parking** | Parkplatz-Info am Start | Available, Spots, Cost |
| **Difficulty** | Schwierigkeitsgrad | EASY, MODERATE, HARD |
| **Season** | Beste Jahreszeit | Spring, Summer, Fall, Winter |
| **Elevation** | Höhenmeter der Tour | Positive Integer (m) |
| **Path Type** | Art des Weges | Mountain, Trail, Road |
| **Rating** | Durchschnittliche Bewertung | 0-5 Stars, Count |
| **Review** | Benutzer-Bewertung | Rating, Comment, UserId |

#### Verben (Aktionen)

| Verb | Definition | Event |
|-----|-----------|-------|
| **Create** | Tour anlegen | TourCreated |
| **Update** | Tour-Metadaten ändern | TourUpdated |
| **Delete** | Tour löschen | TourDeleted |
| **Search** | Touren nach Kriterien finden | (Query, kein Event) |
| **Filter** | Touren eingrenzen | (Query) |
| **Rate** | Tour bewerten | ReviewCreated |

#### Geschäftsregeln

1. Eine Tour muss mindestens 1km lang sein
2. Elevation muss zur Difficulty passen (GR)
3. Start Point ist erforderlich
4. Rating wird aus Reviews berechnet
5. Tour kann ohne End Point sein (Rund-Tour)

---

### **USER CONTEXT**

#### Nomen (Substantive)

| Term | Definition | Attribute |
|------|-----------|-----------|
| **User** | Plattform-Benutzer | ID, Username, Email |
| **Profile** | Benutzer-Profil | FirstName, LastName, Bio |
| **Preferences** | Benutzer-Vorlieben | FitnessLevel, Interests, Languages |
| **Email** | E-Mail-Adresse | Unique, Validated |
| **Password** | Passwort-Hash | Bcrypt or Argon2 |
| **JWT Token** | Authentifizierungs-Token | ExpiresIn 24h |
| **Experience Level** | Erfahrungs-Stufe | BEGINNER, INTERMEDIATE, ADVANCED |
| **Fitness Level** | Fitness-Fähigkeit | LOW, MEDIUM, HIGH, ELITE |
| **Location** | Wohn-Standort | Lat, Long |

#### Verben (Aktionen)

| Verb | Definition | Event |
|-----|-----------|-------|
| **Register** | Neuen User anlegen | UserRegistered |
| **Login** | JWT Token erhalten | (Security Event) |
| **Logout** | Token ungültig machen | (Security Event) |
| **Update Profile** | Profil ändern | UserProfileUpdated |
| **Change Password** | Passwort ändern | PasswordChanged |
| **Delete Account** | User löschen | UserDeleted |
| **Set Preferences** | Vorlieben speichern | PreferencesUpdated |

#### Geschäftsregeln

1. Email muss eindeutig und validiert sein
2. Username muss 3-30 Zeichen lang sein
3. Password: Min. 8 Zeichen, 1 Großbuchstabe, 1 Zahl
4. JWT Token ist 24 Stunden gültig
5. User kann nur sein eigenes Profil ändern

---

### **TOUR-MATCHING CONTEXT**

#### Nomen (Substantive)

| Term | Definition | Attribute |
|------|-----------|-----------|
| **Matching** | Gruppierungs-Prozess | ID, Status, Suggestions |
| **Matching Request** | Angebot oder Gesuche | Type (OFFER/SEARCH), Criteria |
| **Matching Group** | Vorgeschlagene Gruppe | Members, Score, Reason |
| **Score** | Kompatibilitäts-Wert | 0.0 - 1.0 (Double) |
| **Criteria** | Matching-Kriterien | MaxGroupSize, FitnessLevel |
| **Member** | Gruppe-Mitglied | UserId |
| **Offer** | Angebot eine Gruppe zu leiten | GroupSize, Preferences |
| **Search** | Suche nach Gruppe | MaxDistance, TimeRange |

#### Verben (Aktionen)

| Verb | Definition | Event |
|-----|-----------|-------|
| **Start** | Matching starten | MatchingStarted |
| **Suggest** | Gruppen vorschlagen | GroupSuggested |
| **Accept** | Vorschlag akzeptieren | GroupAccepted |
| **Reject** | Vorschlag ablehnen | GroupRejected |
| **Complete** | Matching abschließen | MatchingCompleted |
| **Calculate** | Score berechnen | (Internal) |
| **Rank** | Gruppen ranken | (Internal) |

#### Matching-Kriterien

| Kriterium | Gewichtung | Beschreibung |
|-----------|-----------|-------------|
| **Fitness Level Gap** | 30% | Ähnliche Fitness-Levels |
| **Interests Overlap** | 25% | Gemeinsame Interessen |
| **Language Compatibility** | 20% | Gemeinsame Sprache |
| **Group Size Fit** | 15% | Gewünschte Gruppensize |
| **Experience Match** | 10% | Ähnliche Erfahrung |

#### Geschäftsregeln

1. Gruppe muss 2-8 Personen haben
2. Matching ist opt-in (nicht erzwungen)
3. Ein User kann mehrere Matching-Requests haben
4. Finale Gruppe braucht 100% Akzeptanz aller Mitglieder
5. Score >= 0.7 ist "Good Match"
6. Matching wird nach 48h automatisch gelöscht

---

### **PLANNED-TOURS CONTEXT**

#### Nomen (Substantive)

| Term | Definition | Attribute |
|------|-----------|-----------|
| **Planned Tour** | Buchung mit Datum/Zeit | ID, TourID, Date, Time |
| **Tour Variant** | Alternative Route | Name, Distance, Duration |
| **Participant** | Tour-Teilnehmer | UserId, JoinedAt |
| **Status** | Buchungs-Status | PLANNING, ACTIVE, COMPLETED, CANCELLED |

#### Verben (Aktionen)

| Verb | Definition | Event |
|-----|-----------|-------|
| **Create** | Neue Planned Tour | PlannedTourCreated |
| **Update** | Details ändern | PlannedTourUpdated |
| **Cancel** | Stornieren | PlannedTourCancelled |
| **Request Matching** | Matching starten | MatchingRequested |
| **Add Participant** | User hinzufügen | ParticipantAdded |
| **Remove Participant** | User entfernen | ParticipantRemoved |

#### Geschäftsregeln

1. Planned Tour muss in Zukunft liegen
2. Änderungen nur im PLANNING-Status
3. Nach Matching ist Stornierung eingeschränkt
4. Cancelled Tours werden 90 Tage archiviert

---

### **NOTIFICATIONS CONTEXT**

#### Nomen (Substantive)

| Term | Definition | Attribute |
|------|-----------|-----------|
| **Notification** | Benachrichtigung | ID, UserId, Type, Title, Body |
| **Type** | Benachrichtigungs-Art | GROUP_SUGGESTION, TOUR_UPDATE, etc. |
| **Read State** | Gelesen/Ungelesen | Boolean |
| **Preference** | Benachrichtigungs-Einstellung | Email, Push, SMS |

#### Verben (Aktionen)

| Verb | Definition | Event |
|-----|-----------|-------|
| **Create** | Benachrichtigung erstellen | NotificationCreated |
| **Send** | Senden (Email, Push) | (Dispatch) |
| **Mark as Read** | Als gelesen markieren | NotificationRead |
| **Delete** | Löschen | NotificationDeleted |
| **Archive** | Nach 30 Tagen archivieren | (Auto) |

#### Geschäftsregeln

1. Notifications sind 30 Tage sichtbar
2. Alte werden archiviert, dann gelöscht
3. Push nur mit User-Permission
4. Email-Notifications können deaktiviert sein

---

## 🔗 Verben-Matrix (Welcher Context macht was?)

| Aktion | Verantwortlicher Context |
|--------|--------------------------|
| Touren durchsuchen | TOURS |
| Benutzer registrieren | USER |
| Planned Tour buchen | PLANNED-TOURS |
| Matching starten | TOUR-MATCHING |
| Gruppen-Vorschlag machen | TOUR-MATCHING |
| Benachrichtigung senden | NOTIFICATIONS |

---

## 📚 Weitere Ressourcen

- [Bounded Contexts Map](bounded-contexts-map.md) - Detaillierte Context-Definitionen
- [Domain Events](domain-events-integrations.md) - Events pro Context
- [Context Map Visualizations](context-map-visualizations.md) - Diagramme

---

**Last Updated:** 2026-01-28  
**Nächste Update:** Nach Glossar-Refinement
