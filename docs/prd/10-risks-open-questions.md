# 10. Risks & Open Questions

## **10.1 Technical Risks**

| Risk                                    | Impact | Mitigation                                                                         |
| --------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| **Browser EyeDropper API unsupported**  | Medium | Implement fallback (upload image → pick from canvas).                              |
| **OKLCH/OKLAB conversion inaccuracies** | Low    | Use well-tested libraries (`colorjs.io`, `culori`); validate with sample datasets. |
| **Export performance for PNG/SVG**      | Medium | Use offscreen canvas + async worker; limit gradient resolution.                    |
| **IndexedDB failures in Safari**        | Low    | Graceful fallback to `localStorage` with size cap.                                 |
| **APCA/WCAG computation complexity**    | Low    | Cache intermediate luminance values; async compute in web worker.                  |

---

## **10.2 UX & Product Risks**

| Risk                                         | Impact | Mitigation                                                               |
| -------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| **Feature overload in MVP**                  | Medium | Stick to 6 schemes + 2 gradient types; delay brand tools and simulators. |
| **Accessibility misinterpretation by users** | Low    | Provide tooltips explaining AA/AAA/APCA indicators.                      |
| **Visual mismatch between browsers**         | Medium | Use OKLCH as primary color space; provide CSS fallbacks.                 |
| **Copy/export UX friction**                  | Low    | Add visible feedback and keyboard shortcuts.                             |

---

## **10.3 Open Questions**

1. Should OKLCH values be shown prominently by default, or kept behind a toggle for developers only?
2. Will accessibility metrics (WCAG vs APCA) display both simultaneously or one selectable option?
3. Should we include a “contrast-safe auto-adjust” feature in MVP or defer to v1.1?
4. Do we need built-in palette naming (e.g., Primary/Secondary) or leave it manual for MVP?
5. Will PNG exports support transparent backgrounds or fixed color surfaces?

