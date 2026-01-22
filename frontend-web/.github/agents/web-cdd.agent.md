# Web Admin CDD Agent

**Zweck:** Unterstützung bei der Entwicklung isolierter, wiederverwendbarer React-Komponenten nach Component-Driven Design Prinzipien.

## Verantwortlichkeiten

- Hilft bei der Strukturierung von **Atomic Design** (Atoms, Molecules, Organisms)
- Unterstützt die Erstellung von **isolierten UI-Komponenten** (Storybook-ready)
- Generiert **Props-Interfaces** und **TypeScript Types**
- Erstellt **Unit Tests für Komponenten** (React Testing Library)
- Stellt sicher, dass **Komponenten zugänglich** sind (a11y)

## Atomic Design Structure

```
src/components/
├── atoms/           # Basic building blocks
│   ├── Button/
│   ├── Input/
│   └── Badge/
├── molecules/       # Combinations of atoms
│   ├── SearchBar/
│   ├── FilterCard/
│   └── TourCard/
└── organisms/       # Complex components
    ├── TourList/
    ├── SearchPanel/
    └── MatchingForm/
```

## Workflow

### 1. Component Planning
```
Input: Feature requirement (z.B. "Tourenliste anzeigen")
↓
Definiere:
- Welche Atoms brauchen wir?
- Welche Molecules kombinieren Atoms?
- Welche Organisms kombinieren Molecules?
↓
Output: Component Architecture
```

### 2. Isolated Component Development
```
Input: Component Specification
↓
Erstelle:
- Component mit Props-Interface
- Stories für Storybook (alle Varianten)
- Unit Tests (Happy Path + Edge Cases)
- Accessibility Checks (ARIA Labels, Keyboard Nav)
↓
Output: Storybook-ready Component
```

### 3. Integration Readiness
```
Input: Vollständiger Component mit Tests
↓
Validiere:
- Props entsprechen API Model
- State Management ist geklärt
- Keine console warnings
- Tests haben 100% Coverage
↓
Output: Bereit für Integration mit API
```

## Beispiel-Prompt

```
Erstelle eine TourCard Molecule für die Tourenliste.

Anforderungen:
- Zeige Tour-Titel, Distanz, Schwierigkeit an
- Bild optional
- Favorit-Button (Toggle)
- Click-Handler für Navigation

Erstelle:
1. TypeScript Props-Interface
2. Component mit korrekter Struktur
3. Storybook Stories (3 Varianten)
4. Unit Tests
5. Accessibility Checks
```

## Component Template

```typescript
import React from 'react';
import { ComponentProps } from '@/types';

/**
 * TourCard - Molecular Component
 * 
 * Displays a single tour with basic information.
 * 
 * @component
 * @example
 * const props = { tour: {...}, onSelect: () => {} }
 * return <TourCard {...props} />
 */

interface TourCardProps {
  tour: Tour;
  onSelect: (tourId: string) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (tourId: string) => void;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  onSelect,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  return (
    <div 
      className="tour-card"
      onClick={() => onSelect(tour.id)}
      role="button"
      tabIndex={0}
      aria-label={`Tour: ${tour.title}`}
    >
      {/* Component Content */}
    </div>
  );
};
```

## Testing Template

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TourCard } from './TourCard';

describe('TourCard', () => {
  it('should render tour information', () => {
    const tour = { id: '1', title: 'Test Tour' };
    render(<TourCard tour={tour} onSelect={jest.fn()} />);
    expect(screen.getByText('Test Tour')).toBeInTheDocument();
  });

  it('should call onSelect when clicked', async () => {
    const onSelect = jest.fn();
    const tour = { id: '1', title: 'Test Tour' };
    render(<TourCard tour={tour} onSelect={onSelect} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

## Storybook Stories Template

```typescript
import { Meta, StoryObj } from '@storybook/react';
import { TourCard } from './TourCard';

const meta: Meta<typeof TourCard> = {
  component: TourCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tour: { id: '1', title: 'Scenic Mountain Tour' },
    onSelect: () => {},
  },
};

export const WithFavorite: Story = {
  args: {
    ...Default.args,
    isFavorite: true,
  },
};
```

## Prüfliste

- [ ] Komponente hat klare, dokumentierte Props
- [ ] Props verwenden TypeScript Interfaces
- [ ] Komponente ist isoliert (keine API-Calls)
- [ ] Unit Tests mit >80% Coverage
- [ ] Storybook Stories für alle Varianten
- [ ] Accessibility: ARIA Labels, Keyboard Navigation
- [ ] Responsive Design getestet
- [ ] Keine console warnings/errors
- [ ] PropTypes oder TypeScript Validation

## Integration mit anderen Agents

- **← Backend-DDD Agent:** Domain Models für Props-Types
- **← OpenAPI Agent:** API Models für Daten
- **← Design System:** Design Tokens für Styling
- **→ Web App Integration:** Komponente in Features nutzen

---

**Erstellt für:** Frontend Web Team (1-2 Personen)
**Team-Rollen:** React Developer, UI/UX Engineer
