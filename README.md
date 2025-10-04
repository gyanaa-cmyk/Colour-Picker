# BMAD Classroom Demo — Step‑by‑Step Guide (ColorSmith)

> A concise walkthrough students can follow to recreate our session: from loading the **Team Fullstack** bundle to producing a PRD and an Architecture doc using BMAD’s elicitation workflow.

---

## 1) Load the Team

* Open your web AI tool (e.g., ChatGPT Custom GPT / Gemini).
* Upload the **`team-fullstack.txt`** bundle.
* Start with the orchestrator by simply talking, e.g., “*help”.

**Outcome:** Orchestrator is active with access to PM, Architect, UX Expert, Analyst, and PO agents.

---

## 2) Discover Commands & Agents

* Type `*help` to see core commands and available agents/workflows.
* Tip: All BMAD commands start with an asterisk `*`.

**Outcome:** You can now switch roles and run tasks.

---

## 3) Kick Off Planning (PM)

* Switch to Product Manager: `*pm`
* Create an MVP PRD: reply with **audience**, **stage = MVP**, **format = detailed** when asked; then proceed section‑by‑section.

**Outcome:** Section 1 of PRD is drafted.

---

## 4) Use the Elicitation Loop (Mandatory)

After each section, the PM presents options 0–9. Do one of the following:

* Type a number (e.g., `5` → Identify Risks) to refine the section.
* Or type `9` to proceed to the next section.

**Outcome:** Iterative, high‑quality PRD with your decisions captured.

---

## 5) Finish the PRD

* Continue the loop until all PRD sections are completed (Goals, Personas, Functional/Non‑functional, UX, Exports, Accessibility, Metrics, Risks).
* Optional: Ask for an executive summary.

**Outcome:** A complete MVP PRD in the canvas.

---

## 6) Move to Architecture 

* Switch to Architect: `*architect`
* Run front‑end architecture: `*create-front-end-architecture` **OR**
* Run backend‑end architecture: `*create-backend‑end-architecture`**OR**
* Run full-stack architecture: `*create-full-stack-architecture`
* The architect produces modules, state slices, engine APIs, perf, PWA, and a stepwise build plan.

**Outcome:** Front‑end Architecture document appears in canvas.

---

## 7) (Optional) Next Steps

* Ask for **TypeScript engine stubs**, a **React + Tailwind scaffold**, or a **QA checklist**.
* You can also request **roadmap**, **stories**, or **PO validation**.

**Outcome:** Dev‑ready assets aligned to PRD/Architecture.

---

## 8) Classroom Pointers

* Keep answers short while teaching. Highlight *why* a choice was made (e.g., OKLCH for perceptual accuracy).
* Demonstrate a couple of elicitation options (e.g., #2 Critique & Refine, #5 Risks), then continue with `9`.
* Emphasize **agent specialization**: PM for PRD, Architect for architecture; switch roles cleanly.

---

## 9) Web → IDE Handoff (When Building Code)

* Export/copy your PRD and Architecture into a repo at `docs/prd.md` and `docs/architecture.md`.
* In IDE, shard docs (`*shard-doc`) and run the SM → Dev → QA loop story‑by‑story.
* Continue to [IDE Doc](./IDE_Doc.md) for more information on IDE Handoff

---

## 10) Cheat Sheet (Commands)

* `*help` — show commands
* `*agent pm` or `*pm` — become Product Manager
* `*agent architect` or `*architect` — become Architect
* `*workflow-guidance` — get workflow suggestions
* `#yolo` — toggle batch mode (not recommended for teaching)

---

## 11) What “Good” Looks Like (Acceptance Signals)

* Deterministic outputs via shareable URLs (PRD assumptions explicit; architecture reproducible)
* All MVP features enumerated in PRD’s **Functional Requirements**
* Architecture doc with **file structure**, **state slices**, **engine API**, **PWA**, **tests**, **performance targets**
* Lighthouse ≥ 90, axe checks pass, core flows covered in e2e

---

## 12) Q&A Prompts You Can Use in Class

* “Show me the numbered elicitation menu again.”
* “Critique and refine the Functional Requirements.”
* “What are 3 risks and their mitigations for the gradient engine?”
* “Generate a Tailwind export example for this palette.”
* “Create a 2‑week milestone plan from the Implementation Plan.”
