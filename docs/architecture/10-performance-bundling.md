# 10) Performance & Bundling

* Target bundle < **2 MB** gzipped; code‑split heavy modules (`culori`, APCA) via dynamic import
* Memoize engine outputs with `(seed, scheme, opts)` keys
* Use **web workers** for APCA/WCAG matrix on large palettes to keep UI responsive
* Cache PNG exports and recent palettes in IndexedDB

---
