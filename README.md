# InkEcho 🌑

> *"Where ink becomes voice, and voice becomes echo."*

**InkEcho** is a cinematic, mood-adaptive poetry anthology built as a single-page web application. It treats reading as an immersive, atmospheric experience rather than a static page: the environment, lighting, particles, and motion all shift to match the emotional resonance of the poems on screen.

This repository contains two things:

1. **The React application** (`src/`, `index.html`) - the main, production InkEcho experience.
2. **The original HTML prototype** (`Poems/`) - the earlier static single-file version that inspired the React build. It is preserved here as a historical reference and is linked from the app's nav as "archive".

---

## ✨ Features

- **Mood-adaptive atmosphere** - Selecting a mood (Ether, Pulse, Shadow, Astral, Bloom, Tide) re-themes the entire page: background gradient, accent color, WebGL ink shader hue, and decorative particles all respond.
- **Procedural WebGL ink shader** - A custom GLSL fragment shader (`InkShader.tsx`) renders flowing, domain-warped "ink in water" aurora bands that drift behind the content and lerp smoothly between mood colors.
- **Cinematic loading screen** - A word-by-word reveal of the tagline ("ink becomes voice becomes echo") with a glowing radial bloom and an animated progress bar.
- **3D tilt poem cards** - Each card reacts to the cursor with a perspective tilt and a moving glare, plus tactile "tape" strips and a gradient underline on the title (inspired by the original `Poems/` wall).
- **WhisperReader** - Opens a poem in a full-screen modal where the text reveals character-by-character with a staggered animation (powered by anime.js), dims the world around it, and tracks reading progress with a top progress bar.
- **Lenis smooth scrolling** - Buttery, inertia-based smooth scrolling on the page, with native scrolling preserved inside the modal via `data-lenis-prevent`.
- **Animated mesh + noise overlays** - A subtle moving grid (`mesh-overlay`) and a film-grain noise layer give the whole site a tactile, filmic texture.
- **Custom cursor** - A difference-blend cursor that grows on interactive elements (desktop only; auto-disabled on touch devices).
- **Floating meteors** - Ambient drifting accent particles in the background.
- **Liquid-glass nav** - The `InkEcho` wordmark sits in a frosted, animated-shine glass chip; the "archive" link opens the original HTML prototype.
- **Responsive & accessible** - Mobile-aware touch handling, `prefers-reduced-motion` support, and semantic structure.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Animation | Framer Motion, GSAP (+ ScrollTrigger), anime.js |
| 3D / Shader | React Three Fiber, Three.js, custom GLSL |
| Smooth scroll | Lenis |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| Icons | Lucide React |
| Fonts | Playfair Display (display), Cormorant Garamond (body), Inter (UI), Allura (script) |

---

## 📂 Project Structure

```
ink-echo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: builds and deploys to GitHub Pages (gh-pages)
├── Poems/                      # Original static HTML prototype (reference + "archive" link)
│   ├── index.html              # The earlier single-file version
│   ├── digital_cage.html       # Standalone poem page from the prototype
│   ├── inkechov2.html          # Alternate prototype iteration
│   ├── script.js               # JS for the prototype (theme toggle, floating particles)
│   └── styles.css              # CSS for the prototype
├── src/
│   ├── main.tsx                # React entry point (mounts <App/> in StrictMode)
│   ├── App.tsx                 # Root composition: layout, loading, modal, mood, Lenis init
│   ├── index.css               # Global styles, Tailwind layers, glass utils, decor keyframes
│   ├── types.ts                # TypeScript interfaces: Poem, ThemeConfig, MoodOption, Emotion
│   ├── components/
│   │   ├── Nav.tsx             # Fixed top nav: liquid-glass InkEcho logo + archive link
│   │   ├── Hero.tsx            # Full-screen hero: GSAP char animation, parallax, shimmer divider
│   │   ├── LoadingScreen.tsx   # Cinematic intro with word reveal + progress bar
│   │   ├── InkShader.tsx       # WebGL ink-in-water background (React Three Fiber + GLSL)
│   │   ├── Meteors.tsx         # Ambient drifting meteor particles
│   │   ├── CustomCursor.tsx    # Difference-blend custom cursor (desktop only)
│   │   ├── MoodSelector.tsx    # Mood filter buttons (Ether/Pulse/Shadow/Astral/Bloom/Tide)
│   │   ├── PoemCard.tsx        # 3D tilt card with tape strips + gradient title underline
│   │   ├── PoemDecor.tsx       # Per-emotion decorative SVG/motifs + floating motes
│   │   ├── PoemModal.tsx       # Immersive reading modal (progress bar, copy, WhisperReader)
│   │   └── WhisperReader.tsx   # Character-by-character text reveal engine (anime.js)
│   ├── data/
│   │   └── poems.ts            # All poem content + MOODS + THEMES config + getTheme()
│   └── lib/
│       └── smoothScroll.ts     # Lenis singleton wrapper (init/get/destroy)
├── index.html                  # Vite HTML entry, fonts, meta/OG tags
├── vite.config.ts              # Vite config (base: './' for GitHub Pages)
├── tailwind.config.js          # Tailwind theme: fonts, colors, keyframes
├── postcss.config.js           # PostCSS + Tailwind + Autoprefixer
├── tsconfig.json               # TypeScript config
├── package.json                # Scripts and dependencies
└── README.md                   # This file
```

---

## 📄 File-by-File Reference

### Entry & Configuration

- **`index.html`** - The Vite HTML shell. Loads Google Fonts (Playfair Display, Cormorant Garamond, Inter, Allura), sets the page title, meta description, theme color, and Open Graph tags for social sharing. Mounts `#root` where React renders.
- **`src/main.tsx`** - React entry point. Calls `createRoot(document.getElementById('root'))` and renders `<App />` wrapped in `<React.StrictMode>`. Imports the global `index.css`.
- **`vite.config.ts`** - Vite configuration. Uses `@vitejs/plugin-react`. Sets `base: './'` so built asset paths are relative (required for GitHub Pages subpath hosting). Output goes to `dist/`.
- **`tailwind.config.js`** - Extends Tailwind with the project's font families (`serif`, `sans`, `display`, `script`), custom colors (`ink`, `gold`), the `noise` background image, and keyframes/animations (`shimmer`, `flow`, `aurora`, `floaty`, `expandWidth`).
- **`postcss.config.js`** - Wires Tailwind and Autoprefixer into the build pipeline.
- **`tsconfig.json`** - Strict TypeScript config (target ES2020, bundler resolution, React JSX transform). `noUnusedLocals`/`noUnusedParameters` are relaxed to avoid build breaks on intentional placeholders.

### Application Core

- **`src/App.tsx`** - The root component. Responsibilities:
  - Manages `loading`, `activeMood`, `selected` (poem for modal), and `showTop` (back-to-top button) state.
  - Renders the layered background stack: `InkShader` (WebGL), `Meteors`, `mesh-overlay`, `noise-overlay`, `CustomCursor`, `Nav`.
  - Shows `LoadingScreen` via `AnimatePresence` until the timed intro completes.
  - Renders `Hero`, the featured poem block, the `#wall` anthology section (with `MoodSelector` + grid of `PoemCard`s), and the footer.
  - Initializes Lenis smooth scroll on mount (with StrictMode-safe cleanup that nulls the singleton so the second dev mount re-inits cleanly).
  - Provides `scrollToWall()` (smooth-scrolls to the anthology) and `scrollTop()` (back to top) using the Lenis instance.
  - Renders `PoemModal` and the floating back-to-top button via `AnimatePresence`.

- **`src/types.ts`** - Type definitions:
  - `Emotion` - union of all mood/emotion tags.
  - `Poem` - a poem's `id`, `title`, `preview`, `body`, `category`, `date`, `emotion`, optional `featured` and `author`.
  - `ThemeConfig` - per-mood visual config (`base`, `accent`, `background`, `text`, `secondary`, `gradient`, `particleColor`, `rgb`).
  - `MoodOption` - `{ id, label, description }` for the mood selector.

- **`src/index.css`** - Global stylesheet. Contains:
  - Tailwind base/components/utilities layers.
  - `html`/`body` reset with `overflow-x: clip` (deliberately NOT `hidden`, which would break Lenis window scrolling).
  - Lenis baseline classes (`.lenis`, `.lenis-smooth`, `.lenis-stopped`, etc.).
  - `.mesh-overlay` (animated grid) + `@keyframes meshMove`.
  - `.noise-overlay` (film grain).
  - Glass utilities `.glass-panel` / `.glass-card`.
  - `.liquid-logo` + `.liquid-logo-shine` (nav wordmark glass chip).
  - `.poem-card-title` (gradient underline), `.text-glow`, `.perspective-1000`, `.hide-scrollbar`.
  - `.custom-cursor` styles.
  - Decor keyframes: `decor-float`, `decor-twinkle`, `decor-pulse`, `decor-drift`, `decor-wave`, `shimmer`, `gradient-shift`, `meteor-fall`, `liquid-shine`.
  - `prefers-reduced-motion` block that disables animations for accessibility.

### Components

- **`src/components/Nav.tsx`** - Fixed top navigation. Left: a `motion.a` liquid-glass chip containing the `InkEcho` script wordmark (links to `/Poems/index.html`). Right: an "archive" pill link (also to `/Poems/index.html`, opens in a new tab) with a small status dot.

- **`src/components/Hero.tsx`** - Full-viewport hero. Uses GSAP to animate each title character up into place (`gsap.from('.hero-title .char', ...)`) and to stagger in the subtitle/button lines. Mouse movement drives a parallax tilt on the title via Framer Motion motion values + springs. Includes the shimmer divider under the title and the "Enter the anthology" CTA that calls `onExplore` (scrolls to the wall).

- **`src/components/LoadingScreen.tsx`** - Full-screen intro shown on first load. Reveals the tagline words one at a time, animates the `InkEcho` wordmark in, shows a radial bloom, and fills a gradient progress bar (0 to 100%) as words appear. Calls `onDone` after the sequence to dismiss.

- **`src/components/InkShader.tsx`** - React Three Fiber `<Canvas>` rendering a full-screen quad with a custom GLSL fragment shader. The shader produces flowing, domain-warped fbm "ink" with aurora bands, a vignette, and film grain. The `uColor` uniform lerps toward the active mood's RGB each frame, so the background color transitions smoothly when the mood changes.

- **`src/components/Meteors.tsx`** - Renders a set of absolutely-positioned `.meteor` spans that fall diagonally on a loop. Count is reduced on mobile (touch devices). Purely decorative, `pointer-events: none`.

- **`src/components/CustomCursor.tsx`** - A fixed div that follows the mouse with easing and toggles an `is-hover` class when over links/buttons/`[data-cursor="hover"]`. Uses `mix-blend-mode: difference`. Disabled on coarse-pointer (touch) devices.

- **`src/components/MoodSelector.tsx`** - Row of mood buttons built from `MOODS`. The active mood gets a highlighted border, accent-colored label, and a colored glow. Clicking calls `onChange(id)` to re-filter the wall.

- **`src/components/PoemCard.tsx`** - A `motion.button` representing one poem. On hover (non-touch) it tilts in 3D (`rotateX`/`rotateY` springs) and shows a moving glare. Contains "tape" strips and a `PoemDecor` layer. Uses `layoutId={`poem-${poem.id}`}` so it can smoothly expand into the modal (shared-layout transition). Title uses the `.poem-card-title` gradient underline.

- **`src/components/PoemDecor.tsx`** - Per-emotion decorative SVG/motifs rendered behind the text inside both cards and the modal. Every emotion also gets a set of floating "motes" (small glowing dots) for a living feel. The `Longing` case uses a seamless tiling wave.

- **`src/components/PoemModal.tsx`** - Full-screen immersive reader. Renders a dark scrim, a top reading-progress bar (`scaleX` driven by scroll), the poem header (category, date, reading time, title, copy + close buttons), a divider, and a scrollable body (`data-lenis-prevent` so native scroll works while Lenis is paused). Body contains `PoemDecor` + a readability scrim + `WhisperReader`. On open it pauses Lenis and locks `body` overflow; on close it restores them. Supports Escape to close.

- **`src/components/WhisperReader.tsx`** - Splits the poem body into lines and characters, wrapping each character in a `.whisper-char` span. On mount, anime.js staggers their opacity/translateY into view. Accent color is applied per character.

### Data & Libraries

- **`src/data/poems.ts`** - The content layer. Exports:
  - `POEMS` - the array of all poem objects (including the `featured` Digital Cage piece by "Div").
  - `MOODS` - the mood filter options (Ether/All, Pulse/Love, Shadow/Melancholy, Astral/Dreams, Bloom/Nature, Tide/Longing).
  - `THEMES` - the `Record<string, ThemeConfig>` mapping each mood to its visual palette.
  - `getTheme(emotion)` - helper that returns the matching `ThemeConfig` (falls back to the `All` theme).

- **`src/lib/smoothScroll.ts`** - Lenis wrapper. `initSmoothScroll()` creates a single Lenis instance (duration 1.1, custom easing, smooth wheel) driven by a `requestAnimationFrame` loop, and returns it (idempotent). `getLenis()` returns the current instance. `destroySmoothScroll()` destroys it and nulls the singleton (StrictMode-safe).

### Original HTML Prototype (`Poems/`)

- **`Poems/index.html`** - The earlier static, single-file InkEcho (light/dark theme toggle, poem wall rendered by `script.js`, modal reader). Linked from the app as "archive".
- **`Poems/styles.css`** - Styles for the prototype (mesh background, shimmer header rule, tape strips, gradient underlines, floating particles) - the visual language that inspired several React ported elements.
- **`Poems/script.js`** - Prototype logic: theme toggle, dynamic poem rendering, modal open/close, advanced floating elements.
- **`Poems/digital_cage.html`** - A standalone poem page from the prototype.
- **`Poems/inkechov2.html`** - An alternate prototype iteration.

---

## 🚀 Running Locally

Prerequisites: **Node.js 18+** (Node 20 recommended).

1. **Clone the repository**
   ```bash
   git clone https://github.com/divicoded/InkEcho.git
   cd InkEcho
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Vite will print a local URL (default `http://localhost:5173`).

4. **Open your browser** at the printed URL.

### Other scripts

- `npm run build` - Type-check (`tsc -b`) and produce a production build in `dist/`.
- `npm run preview` - Serve the production `dist/` build locally for testing.

---

## 🚢 Deployment (GitHub Pages)

This repo is configured for automatic deployment to **GitHub Pages** via the workflow in `.github/workflows/deploy.yml`:

1. The workflow triggers on every push to the **`main`** branch.
2. It checks out the code, sets up Node 20, runs `npm install`, then `npm run build`.
3. It deploys the `dist/` folder to the **`gh-pages`** branch using `JamesIves/github-pages-deploy-action`.
4. In the repository **Settings > Pages**, set the source to the `gh-pages` branch (root). The site will then be available at `https://divicoded.github.io/InkEcho/`.

> Note: `vite.config.ts` uses `base: './'` so the built assets use relative paths and work correctly under the GitHub Pages subpath.

---

## ♿ Accessibility & Performance Notes

- **Reduced motion**: users with `prefers-reduced-motion: reduce` get animations disabled and instant scroll behavior.
- **Touch devices**: the custom cursor and 3D tilt are disabled; meteor count is reduced.
- **Scroll**: Lenis provides smooth scrolling on the page; inside the poem modal, `data-lenis-prevent` restores native scrolling so long poems are readable.
- **Performance**: the WebGL shader uses a single full-screen quad with `antialias: false` and capped DPR; meteors and decor are CSS-driven and `pointer-events: none`.

---

## 🖋️ Author

Designed & developed by **Divi Coded** (Div).
*A digital sanctuary for words left unspoken.*

---

## 📜 License

This project is provided as-is for personal and educational use. The poems and artwork are the property of their respective authors.

