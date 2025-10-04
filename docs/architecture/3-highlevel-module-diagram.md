# 3) High‑Level Module Diagram

```
┌──────────────────────────┐
│           App            │  Routing + Layout + Global Providers
└─────────────┬────────────┘
              │
  ┌───────────┴───────────┐
  │       UI Views        │  (Home/Input, Palettes, Gradients, Export, A11y)
  └───────┬───────┬───────┘
          │       │
   ┌──────┴───┐ ┌──┴────────┐
   │  Engine  │ │  Storage  │  (IndexedDB history, settings)
   └──────┬───┘ └─────┬─────┘
          │           │
      ┌───┴────┐  ┌───┴────┐
      │Exports │  │A11y Calc│  (WCAG/APCA)
      └────────┘  └────────┘
```

---
