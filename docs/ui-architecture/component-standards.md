# Component Standards

## Component Template

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

## Naming Conventions

*   **Components:** `PascalCase` (e.g., `ColorPreview.tsx`)
*   **Hooks:** `camelCase` with `use` prefix (e.g., `useCopyToClipboard.ts`)
*   **State Stores:** `camelCase` with `use` prefix and `Store` suffix (e.g., `useColorStore.ts`)
