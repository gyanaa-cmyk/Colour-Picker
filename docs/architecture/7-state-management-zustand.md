# 7) State Management (Zustand)

* **seedSlice**: seed color, input format, validation state
* **schemeSlice**: active scheme id, scheme options, generated palette
* **gradientSlice**: kind (linear/radial), angle, stops[], generated gradient
* **exportSlice**: last export type, modal state
* **uiSlice**: toasts, theme, keyboard shortcut toggles

**URL Sync**

* Serialize: `?seed=%23A855F7&scheme=triadic&g=lin:135:3`
* Only persist minimal state for shareability; keep history in IndexedDB

---
