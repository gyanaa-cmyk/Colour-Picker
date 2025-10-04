# BMAD Classroom Demo — Step-by-Step Guide (ColorSmith)

A practical, classroom-friendly walkthrough showing how to use the **BMAD Framework** inside an AI chat environment (like ChatGPT, Custom GPT, or Google Gemini) to create a project — from brainstorming to PRD and technical architecture. This guide follows the ColorSmith demo example.

> [Chat Example Preview](https://chatgpt.com/share/68e165fb-c1d8-8003-a926-a043e0d03893) Follow this along to get more clarity on the below steps

---

## 1) What is BMAD?

BMAD is a **multi-agent workflow framework** that simulates a real product team inside an AI chat. Each agent has a specific responsibility and can be activated with simple commands.

**Core Agents:**

* 🧠 **Analyst (Mary)** – brainstorms and explores ideas.
* 📋 **Product Manager (John)** – creates the Product Requirements Document (PRD).
* 🏗️ **Architect (Winston)** – designs technical architecture (front-end, back-end, or full-stack).
* 🎨 **Designer (Ava)** – supports UI/UX layout and design.
* 🔍 **QA / PO** – validates, tests, and aligns the build to goals.

All BMAD commands begin with an asterisk `*` and are typed directly into the AI chat interface (not a CLI). Outputs appear as readable, well-formatted documents in the chat.

---

## 2) Step 1 — Load the Team

1. Upload the file `team-fullstack.txt` into your AI chat (ChatGPT, Gemini, or equivalent).
2. Wait for confirmation that the BMAD team has loaded.

**Result:** Your AI session now has the full BMAD team active — ready to collaborate and generate structured outputs.

---

## 3) Step 2 — Start Brainstorming

Type:

```
*brainstorm
```

Then choose **1 (Concept Brainstorm)** and describe your project idea.

Example:

> “I want a web app for designers where they input one color and get complementary and gradient palettes.”

BMAD will generate a structured **brainstorm document** — including purpose, features, users, and roadmap — directly in the chat.

**Result:** A formatted brainstorming plan appears in the chat, not as code or logs.

---

## 4) Step 3 — Create the PRD (Product Manager)

Type:

```
*pm
```

Then answer these questions:

1. Audience → “Dev team”
2. Stage → “MVP”
3. Format → “Detailed”

BMAD’s **Product Manager** will guide you through the **PRD** creation process, one section at a time.
After each section, you’ll see an **elicitation menu (0–9)** allowing you to refine, critique, or continue.

Type **9** to proceed to the next section or another number for in-depth refinement.

**Result:** A detailed PRD (10 sections) with goals, personas, requirements, UX, exports, accessibility, metrics, and risks — all readable directly in chat.

---

## 5) Step 4 — Build the Architecture

Type:

```
*architect
```

Then run one of these commands based on your focus:

* `*create-front-end-architecture` → for client/UI architecture
* `*create-back-end-architecture` → for API/server structure
* `*create-full-stack-architecture` → for complete systems

BMAD’s **Architect** (Winston) will produce a detailed technical blueprint — covering components, state management, data flow, performance, and implementation plans.

**Result:** A clean, structured architecture document displayed directly in chat — easy to read, share, or export.

---

## 6) Step 5 — Extend or Iterate

Once the core PRD and architecture are done, you can continue with:

* `*qa` → generate QA test plan and checklist
* `*designer` → create UI layout and component wireframes
* `*workflow-guidance` → get next best steps or automation help

You can also ask:

> “Generate a 2-week sprint roadmap.”
> “Make a JSON export format spec.”
> “Create TypeScript stubs for the gradient engine.”

---

## 7) Step 6 — Export or Implement

After your PRD and Architecture are generated:

* Copy them from chat into your project repo (`/docs/prd.md` and `/docs/architecture.md`).
* Follow Winston’s structure in your IDE.
* Start coding or designing directly from these guides.

**Result:** You now have production-ready documentation — created, reviewed, and iterated entirely in an AI chat interface.

---

## 8) Workflow Recap

1. Upload `team-fullstack.txt` → loads the BMAD team.
2. Type `*brainstorm` → generate idea.
3. Type `*pm` → create PRD.
4. Type `*architect` → generate architecture (front-end, back-end, or full-stack).
5. (Optional) Add QA or Designer workflows.
6. Export → Build → Review.

---

## 9) IDE Handoff — Next Steps

Once all planning and architecture work in the AI chat is complete, the next phase happens inside your **development environment (IDE or CLI tool).**

Open the file IDE_Doc.md to continue. That document explains:
* How to set up your local environment
* How to shard or import the BMAD docs into your repo
* How to run the Developer and QA loops (Dev → QA → PO)

Command examples for CLI-based interactions

Action: Switch to your IDE or CLI tool and follow [```IDE_Doc.md```](./IDE_Doc.md) for implementation and testing guidance.