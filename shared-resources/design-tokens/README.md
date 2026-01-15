# Hikr - Design Token Dokumentation

Zentrale Definition von Design Tokens für Hikr-Plattform.

## Farben

### Primärfarben
- **Primary Green** (#2E7D32): Hauptfarbe für CTAs und Aktionen
- **Primary Dark** (#1B5E20): Dunkle Variante für Hover-States
- **Primary Light** (#A5D6A7): Helle Variante für Backgrounds

### Sekundärfarben
- **Secondary Orange** (#FF6F00): Accent und Highlights
- **Secondary Light** (#FFB74D): Helle Variante

### Semantische Farben
- **Success** (#4CAF50): Erfolgsmeldungen
- **Warning** (#FFC107): Warnmeldungen
- **Error** (#F44336): Fehlermeldungen
- **Info** (#1976D2): Informationen

## Typografie

**Font Family:** Roboto
**Base Size:** 16px

### Überschriften
- H1: 32px, Bold (700)
- H2: 28px, Bold (700)
- H3: 24px, Semibold (600)
- H4: 20px, Semibold (600)

### Body Text
- Regular: 16px
- Small: 14px
- Large: 18px

## Abstände (Spacing Scale)

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- XXL: 48px

## Border Radius

- SM: 4px
- MD: 8px
- LG: 12px
- XL: 16px
- Full: 9999px (vollständig rund)

## Shadows

Konsistente Tiefenstaffeln für UI-Elemente.

## Verwendung

### Web (CSS Variables)
```css
:root {
  --color-primary: #2E7D32;
  --color-secondary: #FF6F00;
  --font-family: 'Roboto', sans-serif;
  --spacing-md: 16px;
}
```

### Mobile (Flutter Theme)
```dart
class AppTheme {
  static const Color primary = Color(0xFF2E7D32);
  static const Color secondary = Color(0xFFFF6F00);
}
```

### React/React Native
```typescript
const colors = {
  primary: '#2E7D32',
  secondary: '#FF6F00',
  // ...
};
```
