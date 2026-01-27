# Spezielle Domain-Prompts

Spezialisierte Prompts für Domain-Drive Design und Component Development.

## 5.1 Backend DDD Entity Prompt

```
Du implementierst eine neue Domain-Entity für das Hikr-Backend. 
Domäne: [Tours/Matching/UserProfile/...]

**Geschäftsanforderung:**
[Beschreibe die Geschäftsregel oder das Entity]

Generiere:
1. **Value Objects:** Welche unveränderlichen Werte gehören zur Entity?
2. **Aggregates:** Welche Related Entities gehören zusammen?
3. **Repository Interface:** Wie wird die Entity persistiert?
4. **Domain Service:** Welche Geschäftslogik ist erforderlich?
5. **Tests:** Unit Tests für Geschäftsregeln

Validierung gegen DDD:
✓ Entity hat klare Identity
✓ Value Objects sind unveränderlich
✓ Geschäftsregeln sind in der Domain, nicht in der Datenbank
✓ Repository abstrahiert Persistierung
```

## 5.2 React Component Decomposition Prompt

```
Du zerlegst eine UI-Komponente in Atomic Design:

**Feature:** [Zu implementierende UI-Komponente]
**Wireframe/Anforderung:**
[Beschreibe das UI-Layout]

Generiere:
1. **Atoms:** Kleinste, wiederverwendbare Komponenten
2. **Molecules:** Kombinationen von Atoms
3. **Organisms:** Komplexe, selbständige UI-Teile
4. **Templates:** Layout-Templates
5. **Pages:** Komplette Seiten

Für jede Komponente:
- Props-Interface (TypeScript)
- Unit Test (Vitest)
- Story (Storybook)
- Accessibility-Überlegungen

Validierung:
✓ Komponenten sind Single Responsibility
✓ Props sind typsicher
✓ Jede Komponente hat Tests
✓ a11y-Labels vorhanden
```

## 5.3 React Native Cross-Platform Prompt

```
Du entwickelst eine React Native Komponente für iOS/Android:

**Feature:** [Zu implementierende Mobile-UI]
**Plattformen:** iOS / Android / Both

Generiere:
1. **Gemeinsame Logik:** Shared Component Logic
2. **iOS-spezifisch:** .ios.tsx Datei
3. **Android-spezifisch:** .android.tsx Datei
4. **Platform-neutral:** Shared Utils
5. **Tests:** Platform-spezifische Tests

Überlegungen:
- Platform-spezifische APIs (Native Modules wenn nötig)
- Performance (FlatList statt ScrollView für große Listen)
- Accessibility (VoiceOver für iOS, TalkBack für Android)
- Navigation (Stack vs. Tab vs. Drawer)

Validierung:
✓ Code lädt auf iOS und Android
✓ Performance-Metriken ok
✓ Accessibility geprüft
```

---

**Verwandte Dokumentation:**
- [Workflow Prompts Index](workflow-prompts.md)
- [Backend-DDD Agent](.github/agents/backend-ddd.agent.md)
- [Web-CDD Agent](.github/agents/web-cdd.agent.md)
- [Mobile-CDD Agent](.github/agents/mobile-cdd.agent.md)
