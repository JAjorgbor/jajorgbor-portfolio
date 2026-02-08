# Portfolio Design Plan

## 1. Site Structure & Hierarchy

### Core Navigation

- **Home (`/`)**: A fast-scrolling overview designed for scanners (recruiters/managers).
- **Projects (`/projects/[slug]`)**: Detailed case studies for deep divers (engineers/designers).
- **Global Elements**: Minimal header (logo + contact CTA), simplified footer.

### Page Breakdown

#### Home Page (Single Scroll Experience)

1.  **Hero Section**:
    - Large, impactful headline (e.g., "Engineering Product Interfaces").
    - Sub-headline defining role & expertise.
    - Subtle background interaction (e.g., a generative grid or mesh gradient).
    - CTA: "View Projects" (anchors to project section).
2.  **Projects (Feat. Projects)**:
    - Vertical list or grid of 3-4 top projects.
    - Each item: Large thumbnail, Title, 1-line description, Tags.
    - Interaction: Hover expands or reveals details.
3.  **About / Philosophy**:
    - Concise manifesto or bio.
    - Focus on "Engineering + Design" hybrid nature.
4.  **Skills / Stack**:
    - Categorized list (Frontend, Backend, Design).
    - Visual representation (e.g., marquee or clean grid).
5.  **Footer / Contact**:
    - Simple email link.
    - Social links (GitHub, LinkedIn, Twitter).

#### Project Case Study (`/projects/[slug]`)

1.  **Project Header**:
    - Title, Role, Timeline, Link to live site/repo.
    - Hero image or video loop.
2.  **Overview**:
    - "The Challenge" vs "The Solution".
3.  **Key Highlights**:
    - Technical deep dive (code snippets, architecture diagrams).
    - Design decisions (before/after).
4.  **Impact**:
    - Metrics or qualitative results.
5.  **Next Project**:
    - Simple navigation to the next case study.

## 2. Design System Direction

### Typography

- **Font Family**: `Inter` (or `Geist Sans` as provided) for UI, maybe a serif for headings if looking for "editorial" feel, or a mono for code/technical accents.
  - _Decision_: Use **Geist Sans** (headings/body) + **Geist Mono** (technical details/metadata).
- **Scale**:
  - `text-5xl` to `text-6xl`: Hero headlines.
  - `text-2xl`: Section headings.
  - `text-base` / `text-lg`: Body copy (readable, generous line-height).
  - `text-sm` / `text-xs`: Metadata, tags, captions.

### Color Palette (Dark Mode First)

- **Background**: `bg-neutral-950` (near black, slightly warm or cool).
- **Surface**: `bg-neutral-900` (cards, panels).
- **Text**:
  - Primary: `text-white` (or `text-neutral-50`).
  - Secondary: `text-neutral-400`.
  - Accents: `text-blue-500` or `text-indigo-500` (used strictly for interactive elements).
- **Borders**: `border-neutral-800` (subtle separation).

### Spacing & Layout

- **Container**: Max-width `1200px` centered.
- **Grid**: 12-column grid for larger screens, 4 for mobile.
- **Vertical Rhythm**: Multiples of `4` (e.g., `gap-4`, `py-24`).
- **Section Padding**: `py-24` or `py-32` to create breathing room.

### Visual Effects (Magic UI Influence)

- **Glows**: Subtle radial gradients behind key elements (`hero`, `cards`).
- **Borders**: "Shine" borders on hover.
- **Blur**: `backdrop-blur-md` for sticky headers/elements.
- **Motion**:
  - Elements fade in + slide up on scroll.
  - Staggered entry for lists.
  - Smooth spring-based hover states.

## 3. Component Hierarchy

### Atoms (UI)

- `Button`: Variants (Primary, Ghost, Outline).
- `Badge`: For skills/tags (pill shape, subtle border).
- `Text`: Standardized typography components (`H1`, `H2`, `P`, `Mono`).
- `Container`: constrained width wrapper.

### Molecules (Blocks)

- `ProjectCard`: Thumbnail + details composite.
- `SkillItem`: Icon + label.
- `SectionParams`: Wrapper with standard padding/heading.

### Organisms (Sections)

- `Hero`: Top fold.
- `ProjectList`: Grid/List of `ProjectCard`s.
- `Footer`: End of page.

## 4. Interaction Behavior

- **Scroll**: Smooth scrolling (native or Lenis if needed).
- **Hover**:
  - Cards lift slightly (`-translate-y-1`).
  - Text links have a subtle underline animation or color shift.
- **Transitions**:
  - Page transitions (fade out/in) between Home and Projects.

## 5. Mock Data Structure

```typescript
interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string; // placeholder URL
  role: string;
  year: string;
}
```

---

**Next Steps**:

1.  Setup `utils` and basic UI components.
2.  Implement `app/page.tsx` (Home).
3.  Implement `app/projects/[slug]/page.tsx` (Case Study).
