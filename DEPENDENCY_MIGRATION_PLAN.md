# Dependency Migration Plan

This review is based on the current dependency manifest in [package.json](package.json). A live `npm outdated` check could not be run in this environment because `npm` is not currently available, so the assessment combines the existing versions with current ecosystem guidance.

## High-level findings

### Outdated or aging packages

- `@material-ui/*` packages are from the older Material UI v4 line.
- `react-router-dom` is pinned to an older 6.3 release.
- `react-scripts` is still the older Create React App-based toolchain.
- `react-stripe-checkout` is an older integration approach.
- `@reduxjs/toolkit` and `react-redux` are functional but should be updated.
- `firebase`, `axios`, and the testing libraries are older and should be refreshed.

### Security concerns

- Older dependency versions increase exposure to known issues and unpatched transitive vulnerabilities.
- `react-stripe-checkout` is a less maintained integration path and should be replaced.
- `react-scripts` is older and has a more limited modern maintenance story than Vite-based setups.
- The manifest does not show an installed lockfile in the workspace, which can make builds less reproducible.

### Deprecated libraries

- `@material-ui/*` is effectively legacy compared with the modern MUI stack.
- `react-stripe-checkout` is deprecated in practice for newer Stripe integrations.

### Packages that should be replaced

- `@material-ui/core`, `@material-ui/data-grid`, `@material-ui/icons` -> `@mui/material`, `@mui/x-data-grid`, `@mui/icons-material`
- `react-stripe-checkout` -> `@stripe/react-stripe-js` + `@stripe/stripe-js`
- `react-scripts` -> `vite` + `@vitejs/plugin-react`

### Packages that should remain for now

- `react`, `react-dom`
- `react-redux`, `@reduxjs/toolkit`
- `axios`
- `firebase`
- `react-toastify`
- `react-icons`
- `redux-persist`
- `tailwindcss`, `autoprefixer`, `postcss`
- `web-vitals`

## Migration table

| Current Package               | Recommended Package                             | Reason                                                                                                      | Risk Level |
| ----------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------- |
| `@material-ui/core`           | `@mui/material`                                 | Modern MUI is the current maintained UI stack and aligns better with modern React patterns.                 | High       |
| `@material-ui/data-grid`      | `@mui/x-data-grid`                              | The old data-grid package is outdated and less aligned with current MUI ecosystem.                          | High       |
| `@material-ui/icons`          | `@mui/icons-material`                           | Modern replacement with the same role and better long-term support.                                         | Medium     |
| `react-stripe-checkout`       | `@stripe/react-stripe-js` + `@stripe/stripe-js` | The older checkout package is outdated and should be replaced with the current Stripe integration approach. | High       |
| `react-scripts`               | `vite` + `@vitejs/plugin-react`                 | CRA is older and Vite offers a faster, more modern build experience.                                        | High       |
| `react-router-dom`            | `react-router-dom` (latest 6.x/7.x)             | Keep the library, but update to the latest maintained version for bug fixes and better support.             | Medium     |
| `@reduxjs/toolkit`            | `@reduxjs/toolkit` (latest)                     | Keep, but update to the latest version to benefit from fixes and newer patterns.                            | Medium     |
| `react-redux`                 | `react-redux` (latest)                          | Keep, but update to the latest supported version.                                                           | Medium     |
| `axios`                       | `axios` (latest)                                | Keep for now; it is still widely used, but should be updated for security and compatibility.                | Low        |
| `firebase`                    | `firebase` (latest)                             | Keep, but update to the latest SDK for better compatibility and maintenance.                                | Medium     |
| `react-toastify`              | `react-toastify` (latest)                       | Keep, but update to a newer release for bug fixes and compatibility.                                        | Low        |
| `react-icons`                 | `react-icons` (latest)                          | Keep, but update to the latest version.                                                                     | Low        |
| `redux-persist`               | `redux-persist` (latest)                        | Keep, but refresh to latest supported versions.                                                             | Medium     |
| `tailwindcss`                 | `tailwindcss` (latest)                          | Keep, but update to current Tailwind versions for better stability and tooling.                             | Medium     |
| `autoprefixer`                | `autoprefixer` (latest)                         | Keep, but update to current versions.                                                                       | Low        |
| `postcss`                     | `postcss` (latest)                              | Keep, but update to current versions.                                                                       | Low        |
| `@testing-library/react`      | `@testing-library/react` (latest)               | Keep, but update for compatibility with the latest React ecosystem.                                         | Medium     |
| `@testing-library/jest-dom`   | `@testing-library/jest-dom` (latest)            | Keep, but update to the current release.                                                                    | Medium     |
| `@testing-library/user-event` | `@testing-library/user-event` (latest)          | Keep, but update to the current release.                                                                    | Medium     |
| `web-vitals`                  | `web-vitals` (latest)                           | Keep, but update to the latest version.                                                                     | Low        |

## Suggested migration order

1. Replace the UI stack (`@material-ui/*` -> MUI).
2. Replace checkout integration (`react-stripe-checkout` -> Stripe React SDK).
3. Modernize the build toolchain (`react-scripts` -> Vite).
4. Update the core state and routing libraries.
5. Refresh auth, networking, and testing dependencies.

No packages were changed in this step.
