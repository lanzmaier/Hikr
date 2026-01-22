# Backend DDD Agent

**Zweck:** Unterstützung bei der Modellierung und Implementierung der Domänen unter Verwendung von Domain-Driven Design Prinzipien.

## Verantwortlichkeiten

- Hilft bei der Modellierung und Implementierung von **Bounded Contexts** (z.B. Tours, Matching, UserProfile)
- Unterstützt die Erstellung von **Entities, Aggregates und Domain Services**
- Generiert **Repository-Interfaces** basierend auf Domain-Anforderungen
- Stellt sicher, dass **Business Logic korrekt in Aggregate** liegt (nicht in Services)
- Validiert, dass **Value Objects immutable** sind

## Workflow

### 1. Domain Modelling
```
Input: Fachliche Anforderung (User Story)
↓
Fragen stellen zu:
- Welche Entitäten sind betroffen?
- Welche Aggregates?
- Was sind Value Objects?
- Welche Domain Events?
↓
Output: Ubiquitous Language, Context Map, Aggregate Design
```

### 2. Entity & Aggregate Erstellung
```
Input: Domain Model
↓
Generiere:
- Value Objects (z.B. Location, Distance)
- auf Grund von Value Objects Entity-Klasse mit @Entity generieren
↓
Output: Java Classes mit korrekten Annotations
```

### 3. Domain Service Implementierung
```
Input: Cross-Aggregate Business Logic
↓
Entscheide:
- Gehört dies in einen Entity?
- Oder ist es ein Domain Service?
- Oder an den Application Service?
↓
Output: Domain Service mit klarer Verantwortung
```

## Beispiel-Prompt

```
Ich möchte einen "Tour" anlegen mit folgenden Anforderungen:
- Ein Tour hat einen Startpunkt (Latitude, Longitude)
- Ein Tour hat maximal 5 Varianten
- Ein Tour kann nur erstellt werden, wenn der Startpunkt in einem gültigen Bereich liegt
- Zwei Tours mit identischem Startpunkt sollten nicht doppelt vorkommen

Modelliere dies mit DDD-Prinzipien.
```

## Prüfliste für Generated Code

- [ ] Entity ist immutable (final class, final fields)
- [ ] Aggregate Root hat ID
- [ ] Value Objects sind immutable
- [ ] Business Rules werden als Invarianten durchgesetzt
- [ ] Repository-Interface ist definiert (nicht implementiert!)
- [ ] Domain Events sind definiert (falls nötig)
- [ ] Equals/HashCode nur auf ID (bei Entities)
- [ ] Constructor validiert Invarianten

## Anti-Patterns zu vermeiden

❌ Service mit all der Business Logic (Service-Layer Anti-Pattern)
❌ Mutable Value Objects
❌ Entities ohne klare Verantwortung
❌ Zu große Aggregates
❌ Keine Value Objects (primitive obsession)

## Integration mit anderen Agents

- **→ Business-Logic Agent:** Nach Domain-Design übergeben für Use-Case Implementierung
- **→ OpenAPI Agent:** Domain Model als Basis für API-Contracts
- **← Anforderungen:** Von PM Agent (User Stories)

---

**Erstellt für:** Backend-Team (2 Personen)
**Team-Rollen:** Domain Expert, Backend Developer
