# My Portfolio

My developer portfolio, built with React, Vite, Tailwind CSS, and shadcn/ui.

- **Version 1:** a profile page with my name, my goal for this course, and a `StatusBadge` component that shows either "Open to work" (green) or "Busy learning" (gray) depending on a prop.
- **Version 2:** restyled with Tailwind CSS and made responsive (one column on phones, main content + sidebar from the `md` breakpoint up). The page is built from reusable components: `Section` (wraps its `children`), `ContactLink`, and a `ProjectCard` composed from shadcn/ui's `Card`, `Badge`, and `Button`.
- **Version 3:** a product catalog driven by React state, and the whole project converted to TypeScript.
  - Product grid rendered with `.map()` and stable `id` keys, a live "X products" count, and an "In stock" / "Sold out" badge per product
  - "In stock only" filter and a red sale counter that only appears after the first sale
  - Controlled "Add product" form (name + price) with inline validation errors
  - `Product` and form data described with interfaces in `src/types.ts`

## Built with

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (components live in `src/components/ui`)

## Setup

You need [Node.js](https://nodejs.org/) 20.19+ or 22.12+ and npm.

```bash
git clone https://github.com/Teddy011808/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Then open the local URL that Vite prints in the terminal (usually http://localhost:5173).

## Scripts

- `npm run dev` starts the dev server with hot module replacement
- `npm run typecheck` runs `tsc --noEmit` to check types without building
- `npm run build` type-checks, then creates a production build in `dist/`
- `npm run preview` serves the production build locally
