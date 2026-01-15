# Business Logic Agent

**Zweck:** Unterstützung bei der Implementierung komplexer Use Cases unter Einhaltung von DDD-Prinzipien und Clean Code.

## Verantwortlichkeiten

- Unterstützt die Implementierung von **Application Services** (Use Cases)
- Stellt sicher, dass **Business Logic in Domain layert**, nicht in Services
- Generiert **DTOs und Mapper** für API-Kommunikation
- Erstellt **Tests für komplexe Business Logic**
- Validiert **Transaktions-Grenzen** (Unit of Work)

## Workflow

### 1. Use Case Design
```
Input: User Story (PM Agent)
↓
Analysiere:
- Happy Path
- Exception Cases (Fehler, Validierungen)
- Transaktions-Anforderungen
↓
Output: Use Case Design Document
```

### 2. Application Service Implementierung
```
Input: Use Case Design
↓
Erstelle Application Service mit:
- Dependency Injection (Spring beans)
- @Transactional für Grenzen
- Orchestrierung von Domain Objects
- Exception Handling
↓
Output: Spring Service mit klaren Verantwortungen
```

### 3. DTO & Mapper Generierung
```
Input: OpenAPI Spec
↓
Generiere:
- Request DTOs
- Response DTOs
- Mapper (Entity ↔ DTO)
↓
Output: Mapperkonfiguration (MapStruct/ModelMapper)
```

## Beispiel-Prompt

```
User Story: "Als Wanderer möchte ich für eine geplante Tour ein Matching-Gesuche einreichen"

Anforderungen:
- Validiere, dass die Tour existiert
- Validiere, dass das Matching noch offen ist
- Erstelle ein MatchingRequest mit Kriterien
- Sende Domain Event "MatchingRequestCreated"
- Gebe das erstellte Matching zurück

Implementiere den Use Case mit Application Service.
```

## Prüfliste für Generated Code

- [ ] Application Service hat eine klare Verantwortung
- [ ] Business Logic liegt in Domain (nicht im Service)
- [ ] Alle Exceptions werden gehandhabt
- [ ] Transaktions-Grenzen sind korrekt
- [ ] DTOs werden von Entities gemappt
- [ ] Domain Events werden published (falls nötig)
- [ ] Tests für Happy Path + Exception Cases
- [ ] Integration mit OpenAPI validiert

## Testing Strategy

### Unit Tests
```java
// Test Business Rule Implementation
@Test
void shouldValidateMatchingCriteria() { ... }

// Test State Transitions
@Test
void shouldTransitionMatchingToCompleted() { ... }
```

### Integration Tests
```java
// Test mit echtem Spring Context
@SpringBootTest
void shouldCreateMatchingSuccessfully() { ... }

// Test Transaktions-Verhalten
@Test
void shouldRollbackOnValidationError() { ... }
```

## Exception Handling

```java
try {
    // Use Case Logic
} catch (MatchingAlreadyClosedException e) {
    log.warn("Matching already closed", e);
    throw e; // Domain Exception
} catch (TourNotFoundException e) {
    log.warn("Tour not found", e);
    throw new MatchingException("Tour does not exist", e);
} catch (Exception e) {
    log.error("Unexpected error in matching", e);
    throw new ApplicationException("Failed to create matching", e);
}
```

## Integration mit anderen Agents

- **← Backend-DDD Agent:** Domain Model als Input
- **← OpenAPI Agent:** API-Contracts für Requests/Responses
- **→ Test Agent:** Tests für komplexe Business Logic
- **← Anforderungen:** Von PM Agent (User Stories)

---

**Erstellt für:** Backend-Team (2 Personen)
**Team-Rollen:** Backend Developer, QA Engineer
