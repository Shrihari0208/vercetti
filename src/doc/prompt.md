# PRD — Shrihari Deshmukh 3D Portfolio

## Overview
A single-page, scroll-based developer portfolio for **Shrihari Deshmukh** (Frontend / Full Stack / MERN Developer).  
Each of the 4 sections contains a split layout: **left = content**, **right = live interactive 3D scene** with a Mixamo-animated character.

---

## Tech Stack
| Layer | Library |
|---|---|
| Framework | React 19 + Vite |
| 3D | Three.js r160, @react-three/fiber v9, @react-three/drei v10 |
| Animation (UI) | Framer Motion |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| State | Zustand |
| Font | Lexend (Google Fonts) |

---

## Background & Visual Rules
- **Background colour**: `#06000f` (single solid dark, set on `body` — no section-level gradients)
- **Accent colours**: Pink `#ff2d7e` · Cyan `#00f5ff` · Purple `#a855f7` · Orange `#ff8c00`
- **No large blur-blob overlays** or radial CSS gradients on sections
- **Glassmorphism** used for UI panels (`glass`, `glass-pink`, etc. utility classes)
- Neon box-shadows on interactive elements

---

## 3D Rules (applies to all sections)
- Every section embeds a `<Canvas>` with `alpha: true` + `onCreated setClearColor(0,0)` → canvas is **transparent**, section background shows through sky area
- Ground plane: `opacity={0.85}` transparent so background bleeds through
- **OrbitControls** active on every canvas — user can **drag, scroll-to-zoom, right-click-pan**
- Controls are limited: `maxPolarAngle = Math.PI * 0.55`, `minDistance = 2`, `maxDistance = 10`
- Character models: Mixamo FBX, meter-scale (`scale = 1.0`)
- Bounding-box grounding: `fbx.updateMatrixWorld(true)` → `Box3` → `fbx.position.y = -box.min.y` so feet land on the ground plane
- Two refs: `groupRef` (sway + position) + `primitiveRef` (AnimationMixer root)
- Idle sway: `sin(elapsedTime * 0.4) * idleSwayAmount` on group Y rotation

---

## FBX Animation Map
| Section | Animation File | Character Mood |
|---|---|---|
| Hero | `strut-walking.fbx` | Confident entrance |
| Skills | `aerial-evade.fbx` | Energetic / dynamic |
| Projects | `stand-to-roll.fbx` | Reactive / interactive |
| About | `samba-dancing.fbx` | Fun, personal, memorable |

FBX files served from `public/animations/` (no spaces in filenames).

---

## Section Breakdown

### 1 · Hero
**Route anchor**: `#hero`  
**Left content**:
- Pulse badge: "Vice City Beach — Available for work"
- Name: SHAHZEB / SHAIKH (gradient text)
- Title: Frontend · Full Stack · MERN Developer
- Tagline
- CTA buttons: "View Projects" + "Contact Me"
- Scroll hint

**3D scene** (`HeroScene`):
- Fog `#1a0520`
- Hemisphere light (warm orange + dark purple)
- Directional light (warm)
- 3× point lights (pink, purple, cyan)
- Ground plane + 3 neon road stripes
- 4 palm trees (cylinder trunk + sphere fronds, swaying via `useFrame`)
- Animated sun sphere
- `Stars` + particle system
- Character: **Strut Walking**

---

### 2 · Skills
**Route anchor**: `#skills`  
**Left content**:
- Section label, heading "My Arsenal"
- 4 glassmorphism cards (Frontend, 3D/Creative, Backend, Tools)
- Each card: skill name + animated progress bar (% filled on scroll into view)

**3D scene** (`SkillsScene`):
- Neon scrolling grid floor (purple + cyan lines)
- 5 floating glowing orbs (animated Y oscillation)
- `Stars`
- Character: **Aerial Evade**

---

### 3 · Projects
**Route anchor**: `#projects`  
**Left content** (grid):
- 4 project cards with: title, description, tech stack tags, GitHub + Live Demo links
- Cards have per-project accent colours, hover lift animation

**3D scene** (`ProjectsScene`):
- Night setting
- Neon light bars (architectural, left/right/top frames)
- Coloured particle system
- `Stars`
- Character: **Stand To Roll**

---

### 4 · About / Contact
**Route anchor**: `#about`  
**Left content**:
- Bio paragraph
- Social links (GitHub, LinkedIn, Email)
- Journey timeline (4 milestones, dot + vertical line)

**Right content**:
- 3D scene (`AboutScene`) — calm, softer purple/cyan lights, floating lantern orbs, ocean-like back-plane
- Character: **Samba Dancing**
- Contact form: name, email, message, submit button

---

## Navigation
- Floating Navbar: logo `SS.` + 4 section links + "Hire Me" CTA
- Active link tracked via `IntersectionObserver` (`useScrollSection` hook)
- Smooth scroll on click
- Mobile hamburger with animated open/close

---

## Loading
- `LoadingScreen` component shown until `App` sets `loaded=true`
- Animated progress bar (fake timer 0→100%) + dots pulse
- Fades out with `AnimatePresence`

---

## Folder Structure
```
src/
  components/   # Navbar, LoadingScreen, Footer, SceneErrorBoundary
  sections/     # HeroSection, SkillsSection, ProjectsSection, AboutSection
  scenes/       # CharacterModel, HeroScene, SkillsScene, ProjectsScene, AboutScene
  hooks/        # useScrollSection
  data/         # projects.ts, skills.ts
  utils/        # constants.ts (ANIMATIONS paths, NAV_LINKS, COLORS)
  doc/          # prompt.md, prd.md

public/
  animations/   # aerial-evade.fbx, samba-dancing.fbx, stand-to-roll.fbx, strut-walking.fbx
```

---

## Remaining / Future Work
- [ ] Replace placeholder project images with real screenshots
- [ ] Add real GitHub/LinkedIn/email links
- [ ] Mobile responsive polish (canvas height on small screens)
- [ ] Performance: single shared Canvas with HTML overlay (if multi-canvas causes GPU pressure)
- [ ] Add section-transition camera animations (GSAP or R3F camera lerp)
- [ ] More character models / poses per section
- [ ] Deploy to Vercel / Netlify
