# AGENTS.md

# ePasaBuyMo Modern - AI Development Guidelines

## Project Overview

ePasaBuyMo Modern is a modernization and refactoring project based on the original ePasaBuyMo capstone application.

The goal is to transform the existing codebase into a cleaner, scalable, maintainable, and production-ready application while preserving existing business functionality.

The application should follow modern software engineering practices with emphasis on:

- Clean architecture
- Maintainable code
- Reusable components
- Good user experience
- Scalability
- Security
- Performance

---

# Core Development Principles

## 1. Do Not Rewrite Everything Immediately

Before modifying code:

1. Understand the existing implementation.
2. Identify problems and technical debt.
3. Refactor incrementally.
4. Preserve working functionality.

Avoid unnecessary rewrites unless there is a strong architectural reason.

---

# Code Quality Standards

## General Rules

- Write clean, readable, self-documenting code.
- Prefer simplicity over clever solutions.
- Avoid duplicate logic.
- Use meaningful naming conventions.
- Keep functions small and focused.
- Remove unused code.
- Avoid unnecessary dependencies.

## Comments

Do not add comments explaining obvious code.

Only add comments when explaining:

- Complex business logic
- Important decisions
- Workarounds
- Architectural choices

---

# Frontend Guidelines

## React / React Native

Follow these principles:

- Use functional components.
- Use hooks properly.
- Keep components reusable.
- Avoid large monolithic components.
- Separate UI from business logic.

Preferred structure:

- Small presentational components
- Page containers for route views
- Hooks or utility modules for async/state logic
- Shared layout components for headers, navigation, and footers

---

# AI Refactor Context

## Purpose

This section gives AI a project-specific refactoring context for `ePasaBuyMo-Modern` before changing code.

## Application Summary

- Single-page React frontend for a marketplace app.
- Supports user login, product browsing, cart management, order requests, and admin product management.
- Uses Redux Toolkit for state.
- Uses Firebase for auth and local persistence with `redux-persist`.
- Uses Tailwind CSS and Material UI Data Grid for UI.

## Refactor Strategy

Refactor incrementally, one component or small module at a time.

When making changes, follow these rules:

1. Preserve existing behavior unless the user explicitly approves a behavior change.
2. Keep changes isolated to the component or feature being refactored.
3. Extract repeated logic into shared components, hooks, or utility functions.
4. Use descriptive names and small, focused components.
5. Avoid large rewrites in a single commit.
6. Do not change backend API expectations.

## Recommended Refactor Sequence

1. Shared UI components in `src/components/`
2. Page components in `src/pages/`
3. Admin screens in `src/admin/`
4. Redux logic in `src/redux/`
5. Firebase and utility helpers in `src/firebase/` and `src/utils/`

## Guidelines for AI Code Changes

- Read the target file and related imports first.
- Understand how the component is used by routes, other components, or Redux.
- Refactor to make the component easier to test and maintain.
- Keep styling consistent with existing Tailwind classes and CSS.
- Do not create unrelated new files unless they clearly improve reuse.
- Keep the app's route structure intact.

## Notes

- The repository already contains `AGENT.md` with high-level guidelines.
- This updated file should serve as the actionable AI refactor guide.
- On Windows, `AGENT.md` and `agent.md` refer to the same root file.

---

# Project Files to Keep in Mind

- `src/App.js`
- `src/index.js`
- `src/redux/store.js`
- `src/firebase/Firebase.js`
- `src/components/`
- `src/pages/`
- `src/admin/`
- `src/utils/`

Use this file as the first reference for AI-driven frontend refactoring in this repo.
