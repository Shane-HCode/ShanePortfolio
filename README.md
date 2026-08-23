# Portfolio

A visually immersive portfolio built with React, Vite, Tailwind CSS, Three.js
(via `@react-three/fiber`), and Framer Motion.

## Highlights

- **3D hero centerpiece** — a fibonacci-distributed network sphere with bloom
  post-processing, mouse-reactive rotation, and drifting ambient particles
  (`src/components/Hero3D.jsx`).
- **Parallax scrolling** — the hero text and 3D scene move at different speeds
  as you scroll, using Framer Motion's `useScroll`/`useTransform`.
- **Glassmorphism** throughout — navbar, cards, timeline, and contact form all
  use frosted-glass panels (`.glass` / `.glass-strong` utility classes in
  `src/index.css`).
- **Animated dark background** — drifting glow blobs, a subtle grid, and noise
  texture live behind every section (`src/components/AmbientBackground.jsx`).
- **Scroll-reveal animations** on every section using `whileInView`.
- **3D tilt interactions** on the profile photo and project cards that respond
  to mouse position.

## Add your photo

Drop a photo named `profile.jpg` into the `public/` folder. The About section
will pick it up automatically — until then it shows a placeholder.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Customize

- **Copy & content**: edit the text directly inside each file in
  `src/components/`.
- **Colors**: tweak the `cyan` / `indigo` / `void` values in
  `tailwind.config.js`.
- **3D sphere density**: change `SAMPLES` and `RADIUS` in `Hero3D.jsx`.
- **Projects**: edit the `PROJECTS` array in `Projects.jsx`.
- **Experience timeline**: edit the `TIMELINE` array in `Experience.jsx`.
- **Social links / email**: edit `Contact.jsx`.
