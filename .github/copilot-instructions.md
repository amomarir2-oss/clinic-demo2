# Copilot Instructions for Site Pasteur Web 3

## Project Overview
This is a simple static website project consisting of three main files:
- `Scripts.js`: Contains all JavaScript logic for interactivity and dynamic behavior.
- `styles.css`: Defines the visual style and layout for the site.
- `style.html`: The main HTML file, linking to the CSS and JS files.

## Architecture & Patterns
- **Single-page structure:** All logic and styling are centralized in the above files. There are no frameworks or build tools.
- **Direct file linking:** HTML references CSS and JS directly via `<link>` and `<script>` tags.
- **No external dependencies:** All code is custom; no npm, package managers, or external libraries are used.

## Developer Workflows
- **Edit and reload:** Make changes directly to `.html`, `.css`, or `.js` files, then reload the browser to see updates.
- **Debugging:** Use browser DevTools for inspecting elements, debugging JS, and live-editing CSS.
- **No build/test scripts:** There are no automated build or test processes. All development is manual and immediate.

## Project-Specific Conventions
- **File naming:** All main files use lowercase names and standard extensions.
- **CSS organization:** Styles are defined in a single file; use comments to separate sections for maintainability.
- **JS organization:** All scripts are in one file; group related functions and use comments for clarity.
- **HTML structure:** The HTML file should include proper `<head>` and `<body>` sections, linking to `styles.css` and `Scripts.js`.

## Integration Points
- **Cross-file communication:** Ensure that CSS and JS files are correctly linked in the HTML. JS should interact with DOM elements defined in the HTML.
- **No backend or API integration:** All logic is client-side only.

## Examples
- To add a new button with custom styling and behavior:
  1. Add the button element in `style.html`.
  2. Style it in `styles.css`.
  3. Add event listeners in `Scripts.js`.

## Key Files
- `style.html`: Main entry point for the site.
- `styles.css`: All site styles.
- `Scripts.js`: All site scripts.

---

For questions about project structure or conventions, review these instructions and the three main files. If unclear, ask for clarification or examples from the user.
