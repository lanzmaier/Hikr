---
description: 'Guidelines for building React/TypeScript web applications'
applyTo: '**/*.{ts,tsx}'
---

# React/TypeScript Web Development

## General Instructions

- First, prompt the user if they want to integrate static analysis tools (ESLint, Prettier, TypeScript strict mode) into their project setup.
  - If yes, document a recommended static-analysis setup.
    - Prefer ESLint with TypeScript plugin and Prettier for code formatting.
    - Configure TypeScript with strict mode enabled.
    - Set up Husky for pre-commit hooks to run linting and formatting.
    - If the team declines, note this in the project README and continue.
  - If static analysis is bound to the project:
    - Use ESLint and TypeScript as primary sources of actionable issues.
    - Reference ESLint rule names in remediation guidance.
  - If tools are unavailable:
    - Perform up to 3 troubleshooting checks:
      1. Verify ESLint and TypeScript configurations.
      2. Ensure Prettier is integrated in the build process.
      3. Confirm IDE extensions are installed and configured.
    - If still failing after 3 attempts:
      - Enable basic TypeScript checks as CI fallbacks.
      - Open a short tracker issue documenting the blocker and next steps.
- If the user declines static analysis tools or wants to proceed without them, continue with implementing the Best practices, bug patterns and code smell prevention guidelines outlined below.
- Address code smells proactively during development rather than accumulating technical debt.
- Focus on readability, maintainability, and performance when refactoring identified issues.
- Use IDE / Code editor reported warnings and suggestions to catch common patterns early in development.

## Best practices

- **TypeScript Types**: Use strong typing with interfaces and types. Avoid `any` type; prefer union types or generics.
- **React Hooks**: Use functional components with hooks. Follow the Rules of Hooks strictly.
- **Component Composition**: Favor composition over inheritance. Use render props or higher-order components where appropriate.
- **State Management**: Use React's built-in state for local state. For global state, consider Zustand or Redux Toolkit.
- **Immutability**: Treat state as immutable. Use spread operator or libraries like Immer for state updates.
- **Error Boundaries**: Implement error boundaries to catch JavaScript errors in the component tree.
- **Performance**: Use React.memo, useMemo, and useCallback to optimize re-renders. Avoid unnecessary effects.

### Naming Conventions

- Follow React and TypeScript conventions:
  - `PascalCase` for component names and types/interfaces.
  - `camelCase` for variables, functions, and properties.
  - `UPPER_SNAKE_CASE` for constants.
- Use descriptive names: components as nouns (e.g., `UserProfile`), hooks with `use` prefix (e.g., `useUserData`).
- Avoid abbreviations; prefer clarity over brevity.

### Common Bug Patterns

Below are concise, human-readable rules you can apply regardless of which static analysis tool you use. If you run ESLint, the IDE will show the matching rule and location — direct ESLint connections are preferred and should override this ruleset.

- State mutations — Never mutate state directly; always use setState or state updater functions.
- Missing dependencies — Include all dependencies in useEffect, useMemo, and useCallback arrays.
- Unnecessary re-renders — Avoid creating new objects/functions in render; use useCallback and useMemo.
- Type errors — Fix TypeScript errors promptly; they indicate potential runtime bugs.

For contributors who *do* use ESLint: the IDE/scan will show the specific rule name (for example, react-hooks/exhaustive-deps) and the affected file/line. Use that information to navigate to the exact location, then apply the recommended remediation.

### Common Code Smells

These patterns are phrased for humans; they map cleanly to checks in ESLint or TypeScript but do not require those tools to be useful.

- Large components — Break down large components into smaller, reusable ones.
- Prop drilling — Use context or state management libraries to avoid passing props through many levels.
- Inline styles — Extract styles to CSS modules or styled-components for better maintainability.
- Unused imports — Remove unused imports to keep code clean.
- Magic strings — Extract repeated strings into constants.
- Complex conditionals — Simplify with early returns or ternary operators.

If you run a static analyzer like ESLint — direct ESLint connections are preferred and should override this ruleset. ESLint rule names are useful for automation and suppression, but they are not required in day-to-day developer guidance.

## Build and Verification

- After adding or modifying code, verify the project continues to build successfully.
- Run `npm run build` to check for TypeScript and build errors.
- Run `npm run lint` to check for ESLint issues.
- Run `npm test` to ensure all tests pass.
- Use `npm run dev` for development with hot reloading.