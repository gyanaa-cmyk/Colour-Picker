# ColorSmith — IDE Handoff (Live Build Log)

> This document records all IDE-side steps performed during the BMAD classroom demo.

---

## Live Steps

| #  | Action / Command(s)                  | Files / Paths                                        | Notes                                                                       | Outcome                                     |
| -- | ------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| 1  | **Shard the documents**              | `*shard`                                             | Breaks monolithic PRD/Architecture docs into structured files under `/docs` | Docs organized into manageable sections.    |
| 2  | **Activate Product Manager Persona** | `*pm`                                                | Optional for small projects; prepares PM to manage backlog and scope        | Product Manager (John) active.              |
| 3  | **Create Epic**                      | `*create-epic`                                       | Initializes an epic to group related stories                                | Epic 1 (ColorSmith MVP) created.            |
| 4  | **Activate Scrum Master Persona**    | `*sm`                                                | Switches role to Scrum Master to manage stories                             | Scrum Master activated.                     |
| 5  | **Create first story**               | `*draft`                                             | Creates story 1.1 under `/docs/stories`                                     | Story 1.1 drafted and ready for validation. |
| 6  | **Validate story quality (PO)**      | `*validate-next-story`                               | Performed by Product Owner or PM                                            | Story 1.1 validated; feedback applied.      |
| 7  | **Approve story status**             | Manual                                               | Story file                                                                  | Status changed from “Draft” → “Approved.”   |
| 8  | **Switch to Developer Persona**      | `*dev`                                               | Changes role to Developer agent                                             | Developer ready to implement Story 1.1.     |
| 9  | **Implement approved story**         | `*develop-story`                                     | `/src` implementation begins                                                | Code implemented; story status = “Done.”    |
| 10 | **Switch to QA Persona**             | `*qa`                                                | Becomes QA agent                                                            | QA prepares to review 1.1.                  |
| 11 | **Test implementation**              | `*review (story)`                                    | `/docs/qa/gates/1.1-<slug>.yml`                                             | QA validation performed; results appended.  |
| 12 | **Validate Story with PO/SM**        | `*sm *story-checklist` or `*po *validate-next-story` | Confirms acceptance criteria met                                            | Story marked “Done.”                        |
| 13 | **Back to Scrum Master**             | `*sm`                                                | Returns control to Scrum Master                                             | Ready for next story.                       |
| 14 | **Create next story**                | `*draft`                                             | Creates Story 1.2 (Scheme Generation)                                       | Story 1.2 ready for PO validation.          |
| 15 | **Repeat cycle**                     | (Loop)                                               | Each new story                                                              | Repeat PM→Dev→QA until Epic complete.       |

---

## Short Practical Workflow

Once a story is set to **Done**, start the next one in sequence and run the same loop:

1. **Scrum Master:** `*sm` → `*draft` (creates next story, e.g., 1.2)
2. **Product Owner:** `*po` → `*validate-next-story`
3. **Developer:** `*dev` → `*develop-story`
4. **QA:** `*qa` → `*review 1.2`
5. **Scrum Master / PO:** mark as Done → log change in Epic file
6. **Repeat** until all stories in Epic are completed.

---

## Optional Housekeeping

* Merge code / PR → tag minor release (e.g., `v0.1.0-alpha`).
* Update Epic progress summary.
* Add retro note for technical debt or learnings.

---