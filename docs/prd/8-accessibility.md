# 8. Accessibility

## **8.1 Application Accessibility**

* The app itself must conform to **WCAG 2.2 AA** standards.
* Support full keyboard navigation:

  * `Tab` → cycle through interactive elements
  * `Enter`/`Space` → activate actions
  * `Esc` → close modals
* Provide ARIA labels and live region announcements for dynamic elements (copy success, export confirmation).
* Maintain **contrast ratio ≥ 4.5:1** for all UI text on backgrounds.
* Ensure all color-coded indicators (e.g., pass/fail) have non-color cues (icons or labels).

---

## **8.2 Color Output Accessibility**

* **Contrast Calculation:**

  * Compute both **WCAG 2.2 contrast ratios** and **APCA (Advanced Perceptual Contrast Algorithm)**.
  * Show pass/fail badges for AA (normal), AAA (enhanced), and APCA thresholds.
* **Contrast Matrix:**

  * Display n×n table comparing all palette colors as foreground vs background.
  * Highlight failing pairs and suggest closest compliant adjustments.
* **Auto-suggestive Fixes:**

  * Recommend luminance adjustments: e.g., “Increase L by +6 to reach AA.”
* **Safe Pairing Highlight:**

  * Show top 3 foreground/background pairs that achieve AAA contrast.
* **Exported Metadata:**

  * Include contrast results and compliance levels in JSON export for automated QA tools.

---

## **8.3 Testing & Validation**

* Accessibility testing using **axe-core** and **Lighthouse** automated audits.
* Manual keyboard testing and screen reader review (NVDA / VoiceOver).
* Periodic revalidation with WCAG and APCA library updates.


---
