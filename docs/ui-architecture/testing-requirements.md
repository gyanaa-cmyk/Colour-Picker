# Testing Requirements

## Component Test Template (Vitest + React Testing Library)

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
