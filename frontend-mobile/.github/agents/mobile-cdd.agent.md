# Mobile CDD Agent

**Zweck:** Unterstützung bei der Entwicklung isolierter, wiederverwendbarer React Native Komponenten nach Component-Driven Design Prinzipien.

## Verantwortlichkeiten

- Hilft bei der Strukturierung von **Atomic Design für React Native**
- Unterstützt die Erstellung von **plattformspezifischen Komponenten** (iOS/Android)
- Generiert **TypeScript Interfaces** für Props
- Erstellt **Unit & Integration Tests** (React Native Testing Library)
- Stellt sicher, dass **Komponenten zugänglich** sind (a11y)

## Atomic Design for React Native

```
src/components/
├── atoms/              # Basic building blocks
│   ├── Button/
│   ├── Text/
│   └── TouchableIcon/
├── molecules/          # Combinations of atoms
│   ├── SearchInput/
│   ├── TourListItem/
│   └── FilterChip/
└── organisms/          # Complex components
    ├── TourList/
    ├── FilterPanel/
    └── MatchingForm/
```

## Workflow

### 1. Component Planning (Platform-aware)
```
Input: Feature requirement
↓
Überlege:
- Wie unterscheiden sich iOS/Android?
- Welche native APIs brauchen wir?
- Welche Atoms sind wiederverwendbar?
↓
Output: Platform-aware Component Architecture
```

### 2. Cross-Platform Component Development
```
Input: Component Specification
↓
Erstelle:
- Component mit Props-Interface
- Platform-spezifische Varianten (.ios.tsx, .android.tsx)
- Unit Tests (RNTL)
- Integration Tests (Detox für E2E)
- Accessibility Checks
↓
Output: Vollständiger Cross-Platform Component
```

### 3. Performance Optimization
```
Input: Komponente mit Tests
↓
Optimiere:
- useMemo für expensive calculations
- useCallback für handler functions
- FlatList für Listen
- Image caching
↓
Output: Performance-optimierte Komponente
```

## Beispiel-Prompt

```
Erstelle einen TourListItem Component für React Native.

Anforderungen:
- Zeige Tour Title, Distance, Difficulty
- Unterstütze Favorit-Toggle
- Platform-spezifische Layouts (iOS vs Android)
- Accessible mit Screen Reader Support
- Performance-optimiert für lange Listen

Erstelle:
1. TypeScript Props Interface
2. Component mit Platform Files
3. Unit Tests
4. Accessibility Labels
```

## Component Template (React Native)

```typescript
// TourListItem.tsx
import React, { useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Platform,
  StyleSheet,
  AccessibilityInfo,
} from 'react-native';
import { Tour } from '@/types';
import { FavoriteButton } from '../atoms/FavoriteButton';

interface TourListItemProps {
  tour: Tour;
  onPress: (tourId: string) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (tourId: string) => void;
}

export const TourListItem: React.FC<TourListItemProps> = ({
  tour,
  onPress,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  const handlePress = useCallback(() => onPress(tour.id), [tour.id, onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Tour: ${tour.title}, ${tour.distance}km`}
      accessibilityHint="Double tap to view details"
    >
      <Text style={styles.title}>{tour.title}</Text>
      <Text style={styles.distance}>{tour.distance} km</Text>
      {onFavoriteToggle && (
        <FavoriteButton 
          isFavorite={isFavorite}
          onToggle={() => onFavoriteToggle(tour.id)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: { borderBottomColor: '#ccc' },
      android: { borderBottomColor: '#ddd' },
    }),
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
});
```

## Testing Template (React Native)

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TourListItem } from './TourListItem';

describe('TourListItem', () => {
  it('should render tour information', () => {
    const tour = { id: '1', title: 'Test Tour', distance: 5 };
    render(<TourListItem tour={tour} onPress={jest.fn()} />);
    
    expect(screen.getByText('Test Tour')).toBeTruthy();
    expect(screen.getByText('5 km')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const tour = { id: '1', title: 'Test Tour', distance: 5 };
    render(<TourListItem tour={tour} onPress={onPress} />);
    
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledWith('1');
  });
});
```

## Platform-Specific Development

### iOS-spezifisch (TourListItem.ios.tsx)
```typescript
// iOS-spezifische Implementierung mit UIKit Features
```

### Android-spezifisch (TourListItem.android.tsx)
```typescript
// Android-spezifische Implementierung mit Material Design
```

## Performance Optimization

```typescript
// Memoization für Performance
export const TourListItem = React.memo(
  TourListItemComponent,
  (prevProps, nextProps) => {
    return prevProps.tour.id === nextProps.tour.id &&
           prevProps.isFavorite === nextProps.isFavorite;
  }
);

// useCallback für Event Handlers
const handlePress = useCallback(() => {
  onPress(tour.id);
}, [tour.id, onPress]);
```

## Prüfliste

- [ ] Komponente hat klare, dokumentierte Props
- [ ] Props verwenden TypeScript Interfaces
- [ ] Platform-spezifische Varianten wenn nötig
- [ ] Unit Tests mit >80% Coverage
- [ ] Accessibility Labels und Hints
- [ ] Performance: Memoization, useMemo, useCallback
- [ ] Responsive auf verschiedene Bildschirmgrößen
- [ ] Keine console warnings
- [ ] Platform-Konsistenz geprüft

## Integration mit anderen Agents

- **← Backend-DDD Agent:** Domain Models für Props-Types
- **← OpenAPI Agent:** API Models für Daten
- **← Design System:** Design Tokens für Styling
- **→ Mobile App Integration:** Komponente in Screens nutzen

---

**Erstellt für:** Frontend Mobile Team (1-2 Personen)
**Team-Rollen:** React Native Developer, Mobile Engineer
