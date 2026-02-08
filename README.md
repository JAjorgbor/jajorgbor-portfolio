# Jajorgbor Developer Portfolio (v2)

A world-class engineering portfolio designed with Next.js 15+, Tailwind CSS v4, and Framer Motion.

## Features

- **Hybrid Navigation**: Single-scroll homepage for quick scanning + dedicated case study pages for deep dives.
- **Modern Tech Stack**:
  - Next.js (App Router)
  - Tailwind CSS v4 (Alpha/Beta support via PostCSS)
  - Framer Motion (for "Magic UI" feel)
  - TypeScript
- **Design System**: clear typography, dark mode first, subtle animations.

## Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    # Ensure you have installed: lucide-react, framer-motion, clsx, tailwind-merge
    ```

2.  **Run the development server**:

    ```bash
    npm run dev
    ```

3.  **Open [http://localhost:3000](http://localhost:3000)** with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`:
  - `ui/`: Reusable atomic components (Button, Badge, etc.).
  - `sections/`: Page sections (Hero, Projects, About, Contact).
  - `nav/`: Navigation components (Header).
- `lib/`: Utilities (`cn`) and mock data (`data.ts`).
- `public/`: Static assets.

## Customization

- Update `lib/data.ts` with your real projects and experience.
- modify `components/sections/*.tsx` to adjust layout or text.
- Check `globals.css` for global theme variables (though Tailwind v4 uses CSS variables natively).
