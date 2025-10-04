# Styling Guidelines

## Styling Approach

We will use `styled-components` for co-located, component-level styling. Global styles will be defined in `/src/styles/GlobalStyles.ts`.

## Global Theme Variables

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
