# ArrayViz

ArrayViz is a lightweight, frontend-first app for learning and visualizing array data-structures and common array algorithms. It focuses on clear, interactive visual explanations to help beginners and interview prep learners master array patterns and operations.

🚀 Built with React, TypeScript, Vite, and Tailwind CSS

---

## Features
- Interactive playground for visualizing array operations (insert, delete, traverse)
- Concept pages that explain array fundamentals, time/space complexity, and memory layout
- Problem list (coming soon) grouped by difficulty and pattern
- Visual-first approach with concise examples and step-by-step illustrations

## Tech Stack
- React + TypeScript
- Vite for fast dev/build
- Tailwind CSS for styling
- ESLint + Prettier for linting

## Demo / Routes
- / — Home: Overview and mini visual demo
- /playground — Interactive array playground
- /concepts — Concept pages and fundamentals
- /problems — Practice problems list (work-in-progress)

---

## Getting Started

Prerequisites:
- Node.js >= 18 (recommended)
- npm or yarn

Install dependencies:

```bash
npm install
# or
yarn
```

Start the dev server:

```bash
npm run dev
# or
yarn dev
```

Build for production:

```bash
npm run build
# or
yarn build
```

Preview the production build (locally):

```bash
npm run preview
# or
yarn preview
```

Lint the project:

```bash
npm run lint
# or
yarn lint
```

---

## Development Notes
- Source files are in `src/`.
  - `src/pages` contains the main routes: `Home`, `Playground`, `Concepts`, `Problems`.
  - `src/components` contains shared UI pieces like `Navbar` and `Footer`.
- Tailwind is configured in `tailwind.config.js` and PostCSS configuration in `postcss.config.js`.

If you want to add a new visual or page:
1. Create a new page/component under `src/pages` or `src/components`.
2. Link the page from the `Navbar` if necessary.
3. Add visual assets to `src/assets` or `public/`.

---

## Contributing
- Contributions are welcome! Open an issue or submit a PR.
- Please follow these basic rules:
  - Keep changes focused and scoped.
  - Run linting before pushing (`npm run lint`).
  - Add tests or a demo if the change affects visual behavior.

If you'd like to help but don't know where to start, check the `pages` and `components` mentioned above — there are many filler sections labelled `Placeholder` that would make great first PRs.

---

## Roadmap
- Implement the interactive playground visualizer
- Add problem practice pages with step-by-step solutions
- Add TypeScript-backed algorithm steps and controls for speed/step-by-step debugging

---

## License
License file not included yet. If you want to open-source this project, add a `LICENSE` file (MIT is a common choice) and update the footer and README accordingly.

---

## Contact
For questions, ideas, and contributions, open an issue or reach out to the repository owner.

Thanks for checking out ArrayViz! 👋
