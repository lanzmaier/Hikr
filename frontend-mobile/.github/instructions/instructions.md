---
description: 'Guidelines for building React Native/TypeScript mobile applications'
applyTo: '**/*.{ts,tsx}'
---

# React Native/TypeScript Mobile Development

## General Instructions

- First, prompt the user if they want to integrate static analysis tools (ESLint, Prettier, TypeScript strict mode) into their project setup.
  - If yes, document a recommended static-analysis setup.
    - Prefer ESLint with React Native and TypeScript plugins, plus Prettier for code formatting.
    - Configure TypeScript with strict mode enabled.
    - Set up Husky for pre-commit hooks to run linting and formatting.
    - If the team declines, note this in the project README and continue.
  - If static analysis is bound to the project:
    - Use ESLint and TypeScript as primary sources of actionable issues.
    - Reference ESLint rule names in remediation guidance.
  - If tools are unavailable:
    - Perform up to 3 troubleshooting checks:
      1. Verify ESLint and TypeScript configurations for React Native.
      2. Ensure Prettier handles JSX and TypeScript correctly.
      3. Confirm Metro bundler and IDE extensions are configured.
    - If still failing after 3 attempts:
      - Enable basic TypeScript checks as CI fallbacks.
      - Open a short tracker issue documenting the blocker and next steps.
- If the user declines static analysis tools or wants to proceed without them, continue with implementing the Best practices, bug patterns and code smell prevention guidelines outlined below.
- Address code smells proactively during development rather than accumulating technical debt.
- Focus on readability, maintainability, and performance when refactoring identified issues.
- Use IDE / Code editor reported warnings and suggestions to catch common patterns early in development.

## Best practices

- **Platform-Specific Code**: Use Platform module for platform-specific logic. Avoid conditional imports; use Platform.select().
- **Navigation**: Use React Navigation for screen navigation. Follow navigation best practices for deep linking and state persistence.
- **State Management**: Use React's built-in state for local state. For global state, consider Zustand or Redux Toolkit with persistence.
- **Performance**: Optimize list rendering with FlatList and memoization. Use Hermes engine for better performance.
- **Native Modules**: Minimize bridge communication. Use native modules only when necessary.
- **Accessibility**: Implement accessibility features using AccessibilityInfo and accessible props.
- **Error Handling**: Use error boundaries and handle async errors properly with try-catch in async functions.

### Naming Conventions

- Follow React Native and TypeScript conventions:
  - `PascalCase` for component and screen names.
  - `camelCase` for variables, functions, and properties.
  - `UPPER_SNAKE_CASE` for constants.
- Use descriptive names: screens with `Screen` suffix (e.g., `HomeScreen`), hooks with `use` prefix.
- Avoid abbreviations; prefer clarity over brevity.

### Common Bug Patterns

Below are concise, human-readable rules you can apply regardless of which static analysis tool you use. If you run ESLint, the IDE will show the matching rule and location — direct ESLint connections are preferred and should override this ruleset.

- Bridge blocking — Avoid synchronous bridge calls; use asynchronous communication.
- Memory leaks — Properly clean up subscriptions and timers in useEffect cleanup.
- Navigation state — Handle navigation state changes carefully to avoid crashes.
- Type errors — Fix TypeScript errors promptly; they indicate potential runtime bugs in mobile apps.

For contributors who *do* use ESLint: the IDE/scan will show the specific rule name (for example, react-hooks/exhaustive-deps) and the affected file/line. Use that information to navigate to the exact location, then apply the recommended remediation.

### Common Code Smells

These patterns are phrased for humans; they map cleanly to checks in ESLint or TypeScript but do not require those tools to be useful.

- Large screens — Break down large screens into smaller components.
- Inline styles — Use StyleSheet.create for styles to enable optimization.
- Unused components — Remove unused components and imports.
- Hardcoded values — Extract platform-specific values into constants.
- Complex state logic — Use custom hooks to manage complex state.
- Missing error handling — Add try-catch blocks for async operations.

If you run a static analyzer like ESLint — direct ESLint connections are preferred and should override this ruleset. ESLint rule names are useful for automation and suppression, but they are not required in day-to-day developer guidance.

## Build and Verification

- After adding or modifying code, verify the project continues to build successfully.
- Run `npm run build` or `npx react-native bundle` to check for build errors.
- Run `npm run lint` to check for ESLint issues.
- Run `npm test` to ensure all tests pass.
- Use `npm run android` or `npm run ios` for platform-specific builds and testing.