# State Management

## Store Structure

```plaintext
/src
|-- /store
|   |-- useColorStore.ts
```

## State Management Template (Zustand)

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
