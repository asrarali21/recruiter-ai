# Recruiter AI – Hiring Automation Platform

**Recruiter AI** is an end-to-end backend system designed to help small companies and startups streamline their hiring process by automating repetitive recruiter tasks while keeping human decision-making at critical points.

The system handles job intake, AI-assisted job description generation, candidate application intake, resume analysis, intelligent candidate–job matching, and recruiter shortlisting — all built with real-world reliability and scale in mind.

This project focuses primarily on **backend architecture, AI workflows, and system design**, rather than UI polish.

---

## Why I Built This

Hiring is time-consuming for small teams. Recruiters often spend hours:

- Rewriting job descriptions
- Screening resumes manually
- Shortlisting candidates with limited context

This project explores how **LLMs and agentic workflows** can reduce manual effort while still allowing hiring managers and recruiters to stay in control.

The goal was **not to replace recruiters**, but to:

- Automate repetitive steps
- Surface the most relevant candidates
- Provide explainable insights for faster decisions

---


Each phase is **isolated, auditable, and safe to retry**.

---

## Core Features

### Job Intake & JD Generation

- Hiring managers create jobs with structured inputs
- AI generates job descriptions from drafts
- Human approval is required before publishing

### Candidate Application & Resume Processing

- Candidates apply via public job links
- Resumes are ingested and parsed automatically
- Resume understanding extracts:
  - Skills
  - Experience
  - Education

### Intelligent Candidate Matching

- Job requirements and resumes are analyzed separately
- Candidates are matched against the job with **explainable reasoning**
- Designed to handle high application volumes safely

### Recruiter Review (Human-in-the-Loop)

- Recruiters see ranked candidates
- AI insights support decisions, not replace them
- Explicit approval/rejection actions are recorded

---

## Architecture & Design Principles

This project was built with **production-oriented design choices**:

### Service-Layer Architecture

Clear separation between:
- APIs
- Services
- AI agents
- Orchestration
- Persistence

### Agentic AI Workflows

Multiple LLM agents handle:
- Resume understanding
- Job understanding
- Candidate matching

Each agent operates independently.

### LangGraph Orchestration

Candidate processing is orchestrated using **LangGraph** to ensure:
- Deterministic execution
- Retry safety
- Failure isolation

### Idempotent & Failure-Tolerant Design

All critical steps are safe to retry without corrupting data.

### Database-Backed State

- No frontend-dependent state
- Backend remains the source of truth

---

## Tech Stack

- **Backend:** Python, FastAPI
- **AI / LLMs:** LangChain, LangGraph, Gemini
- **Database:** PostgreSQL, SQLAlchemy
- **Orchestration:** LangGraph 

Frontend is planned but **not the primary focus** of this repository.

---

## What This Project Is (and Is Not)

### This project **is**:
- A real backend system, not a toy demo
- Focused on system design and AI workflows
- Built with real hiring constraints in mind

### This project **is not**:
- A polished ATS clone
- A frontend-heavy portfolio app
- A claim of replacing human recruiters

---

## Current Status

- Backend complete and fully functional
- End-to-end flows implemented up to recruiter shortlisting
- Frontend planned as a separate phase

---

## Future Improvements

- Recruiter-facing UI
- Interview scheduling workflows
- Async / background execution
- Advanced scoring strategies
- Audit logs and analytics

---

## Author

**Built by Mohammed Asrar Ali**  
**Focus Areas:** Backend Engineering, Full-Stack Development, Applied AI Systems

