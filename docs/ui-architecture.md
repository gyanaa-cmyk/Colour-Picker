# Colour Picker Frontend Architecture Document

## Template and Framework Selection

Based on the PRD (Story 1.1) and modern web standards, this project will be initialized using **Vite with the React + TypeScript template**. This provides a fast development server, optimized builds, and out-of-the-box TypeScript support, which is superior to the older `create-react-app`.

### Change Log

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-10-04 | 1.0 | Initial Front-End Architecture draft created. | Winston, Architect |

## Frontend Tech Stack

### Technology Stack Table

| Category | Technology | Purpose | Rationale |
| :--- | :--- | :--- | :--- |
| Framework | React | Building the user interface | Chosen for its component-based model and vast ecosystem. |
| State Management | Zustand | Global state management | A lightweight, simple, and unopinionated solution perfect for the MVP's minimal global state needs (e.g., color history). |
| Build Tool | Vite | Development server and production bundling | Offers significantly faster performance than older tools like Webpack. |
| Styling | Styled-components | Component-level styling | Allows for co-located, dynamic, and scoped CSS, which fits well with a component-based architecture. |
| Testing | Vitest, React Testing Library, Playwright | Unit, Integration, and E2E testing | Vitest is a fast and modern test runner. Playwright is robust for E2E testing core visual functionality. |

## Project Structure

```plaintext
/src
|-- /assets
|   |-- /fonts
|-- /components
|   |-- /common
|   |   |-- Button.tsx
|   |   |-- Input.tsx
|   |-- /layout
|   |   |-- MainView.tsx
|-- /features
|   |-- /color-picker
|   |   |-- ColorPreview.tsx
|   |   |-- ColorInputs.tsx
|   |   |-- Eyedropper.tsx
|   |-- /color-history
|   |   |-- HistoryPanel.tsx
|   |   |-- HistoryItem.tsx
|-- /hooks
|   |-- useCopyToClipboard.ts
|-- /store
|   |-- useColorStore.ts
|-- /styles
|   |-- GlobalStyles.ts
|   |-- theme.ts
|-- App.tsx
|-- main.tsx
```

## Component Standards

### Component Template

```typescript
import React from 'react';
import styled from 'styled-components';

const ComponentWrapper = styled.div`
  /* Component-specific styles go here */
`;

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <ComponentWrapper>
      <h1>{title}</h1>
    </ComponentWrapper>
  );
};

export default MyComponent;
```

### Naming Conventions

*   **Components:** `PascalCase` (e.g., `ColorPreview.tsx`)
*   **Hooks:** `camelCase` with `use` prefix (e.g., `useCopyToClipboard.ts`)
*   **State Stores:** `camelCase` with `use` prefix and `Store` suffix (e.g., `useColorStore.ts`)

## State Management

### Store Structure

```plaintext
/src
|-- /store
|   |-- useColorStore.ts
```

### State Management Template (Zustand)

```typescript
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ColorState {
  activeColor: string;
  history: string[];
  setActiveColor: (color: string) => void;
  addToHistory: (color: string) => void;
}

export const useColorStore = create<ColorState>()(
  persist(
    (set) => ({
      activeColor: '#FFFFFF',
      history: [],
      setActiveColor: (color) => set({ activeColor: color }),
      addToHistory: (color) =>
        set((state) => ({
          history: [color, ...state.history.filter((c) => c !== color)].slice(0, 20),
        })),
    }),
    {
      name: 'color-picker-storage', // unique name for local storage
    }
  )
);
```

## API Integration

Not applicable for the MVP, as it is a fully client-side application.

## Routing

Not applicable for the MVP, as it is a single-page application with no distinct routes.

## Styling Guidelines

### Styling Approach

We will use `styled-components` for co-located, component-level styling. Global styles will be defined in `/src/styles/GlobalStyles.ts`.

### Global Theme Variables

```css
/* /src/styles/theme.ts */

export const theme = {
  colors: {
    primary: '#007AFF',
    success: '#34C759',
    error: '#FF3B30',
    background: '#1C1C1E',
    surface: '#2C2C2E',
    text: '#F2F2F7',
    textSecondary: '#8A8A8E',
  },
  fonts: {
    primary: 'Inter, sans-serif',
    monospace: 'Roboto Mono, monospace',
  },
  spacing: {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
  },
};
```

## Testing Requirements

### Component Test Template (Vitest + React Testing Library)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render the title', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByRole('heading', { name: /Test Title/i })).toBeInTheDocument();
  });
});
```

## Environment Configuration

No custom environment variables (`.env` files) are required for the MVP.

## Frontend Developer Standards

### Critical Coding Rules

1.  All components must be functional components using React Hooks.
2.  Stateful logic should be encapsulated in custom hooks where reusable.
3.  Props must be typed using TypeScript interfaces.
4.  No business logic should reside directly in JSX; extract it to handlers or hooks.

### Quick Reference

*   **Start Dev Server:** `npm run dev`
*   **Run Tests:** `npm run test`
*   **Build for Production:** `npm run build`
