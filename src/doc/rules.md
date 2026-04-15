# 3D Website Optimization Rules

Project type: React + Vite + Three.js / React Three Fiber
Goal: reduce initial load time, improve FPS, and keep 3D assets web-friendly.

---

## 1. Performance budget

Treat these as hard targets unless there is a strong reason not to.

- Initial JS on first page: aim for less than 250-350 KB gzip
- Individual `.glb` hero asset: aim for less than 500 KB compressed when possible
- Secondary `.glb` assets: aim for less than 100-300 KB each
- Individual texture files: aim for less than 200 KB each for most assets
- Total first-screen asset payload: keep as low as possible, ideally under 2-3 MB
- Draw calls: keep under 100-200 for normal scenes, lower for mobile
- Lights: keep minimal; avoid many real-time shadow casters

If an asset exceeds budget, optimize it before shipping.

---

## 2. Asset rules

### Models

- Use `.glb` instead of `.gltf + separate files` when practical.
- Compress geometry with Draco or Meshopt.
- Remove hidden meshes, unused nodes, empty groups, duplicate materials, and unused animations.
- Reduce vertex count in Blender or your DCC before export.
- Avoid shipping CAD-quality meshes to the web.
- Split large scenes into smaller lazy-loaded assets.
- Reuse the same model instance where possible instead of duplicating geometry.

### Textures

- Textures are usually the biggest problem. Optimize them first.
- Convert PNG/JPEG textures to WebP when possible.
- Use KTX2/Basis for production GPU-friendly texture delivery if your pipeline supports it.
- Resize textures to the real visual need:
  - Hero textures: 1024-2048 max
  - Standard props: 512-1024 max
  - Small props/UI planes: 256-512 max
- Do not use 4K textures unless they are truly visible at that detail.
- Use lower resolution for roughness, metalness, AO, and normal maps when acceptable.
- Pack grayscale maps together when your workflow allows it.
- Remove unused texture maps entirely.

### HDRI / environment maps

- Keep HDRIs small and compressed.
- Use lower-resolution environment maps for mobile.
- Prefer one environment map over many large lighting assets.

---

## 3. Loading rules

- Only load what is visible on the current route or section.
- Lazy-load heavy scenes, models, and postprocessing.
- Do not preload every 3D asset on page load.
- Show lightweight placeholders or progress indicators while assets stream in.
- Use route-level code splitting for heavy 3D pages.
- Load below-the-fold sections only when needed.

### React example

```jsx
const Scene = React.lazy(() => import('./Scene'))
```

---

## 4. React Three Fiber rules

- Do not trigger React state updates inside `useFrame` unless absolutely necessary.
- Mutate refs in `useFrame` for per-frame animation.
- Memoize expensive objects such as geometries, materials, arrays, and config objects.
- Reuse materials and geometries across meshes.
- Avoid mounting and unmounting many meshes repeatedly.
- Prefer toggling `visible` over destroying and rebuilding objects when appropriate.
- Use instancing for repeated meshes.
- Keep React component trees inside `<Canvas>` lean.

### Good

```jsx
const meshRef = useRef()

useFrame((_, delta) => {
  meshRef.current.rotation.y += delta
})
```

### Avoid

```jsx
useFrame(() => {
  setRotation((r) => r + 0.01)
})
```

---

## 5. Scene complexity rules

- Minimize real-time shadows.
- Limit shadow map resolution.
- Keep transparent materials to a minimum.
- Minimize postprocessing passes.
- Avoid expensive effects on first load.
- Reduce particle counts.
- Reduce the number of dynamic lights.
- Bake lighting where possible.
- Prefer simple materials over complex layered materials when the visual difference is small.

---

## 6. Mobile-first rules

- Assume mobile devices are the default constraint.
- Detect weaker devices and lower quality automatically.
- Reduce DPR on mobile.
- Disable or downgrade shadows, SSAO, bloom, and high-cost effects on small devices.
- Load lower-resolution textures and lighter models on mobile.
- Keep touch interactions smooth; avoid blocking the main thread.

### Example

```jsx
<Canvas dpr={[1, 1.5]} />
```

---

## 7. Vite and bundle rules

- Keep large dependencies out of the initial bundle.
- Lazy-load heavy 3D routes and utilities.
- Analyze the bundle regularly.
- Do not place versioned build assets in `public/` unless necessary.
- Import assets through the module graph when possible so Vite can optimize handling.
- Split vendor and scene code if it helps caching and startup.

### Example manual chunks

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
})
```

---

## 8. Caching and delivery rules

- Serve assets through a CDN when possible.
- Enable long cache headers for hashed assets.
- Compress text assets with gzip or Brotli.
- Use HTTP/2 or HTTP/3 where available.
- Prefetch only the next likely route or asset, not everything.
- Avoid cache-busting static assets unless content changes.

---

## 9. Animation rules

- Keep animation clips short and necessary.
- Remove unused animation tracks.
- Compress animation data with Meshopt when possible.
- Do not autoplay many animations at once.
- Pause or reduce updates for offscreen content.

---

## 10. Measurement rules

Never optimize blindly.

Measure all of the following:

- Lighthouse
- Chrome DevTools Performance
- Network tab asset sizes
- FPS on a mid-range mobile device
- JS bundle size after each major dependency change
- Scene stats: triangles, geometries, textures, draw calls

Track these before and after each optimization:

- First contentful paint
- Largest contentful paint
- Time to interactive
- Total transferred bytes
- FPS during interaction
- Memory usage

---

## 11. Asset acceptance checklist

A 3D asset can ship only if all are true:

- Geometry is compressed
- Unused meshes/materials/animations removed
- Texture sizes reviewed
- File size is within budget or justified
- Looks acceptable on mobile
- Loads only where needed
- Tested on slow network and mid-range device

---

## 12. Recommended workflow for oversized assets

When an asset is over 500 KB:

1. Check whether the size comes from geometry, textures, or animation.
2. Reduce texture resolution first.
3. Convert textures to WebP or KTX2.
4. Compress geometry with Meshopt or Draco.
5. Remove unused nodes and materials.
6. Re-export and compare visually.
7. Lazy-load the asset if it is not above the fold.

---

## 13. Team rules

- No raw exported 3D assets go straight to production.
- Every asset must go through an optimization pass.
- Every new scene must define a performance budget.
- Every release should include a quick bundle and asset size review.
- Visual quality should scale by device capability.

---

## 14. Starter commands

```bash
# bundle analysis
npm install -D rollup-plugin-visualizer

# glTF optimization tools
npm install -D @gltf-transform/cli
```

Example optimization flow:

```bash
gltf-transform optimize input.glb output.glb --texture-compress webp
```

---

## 15. Default mindset

- Fewer assets
- Smaller textures
- Fewer draw calls
- Less JavaScript on first load
- Less work per frame
- Load later, not sooner
- Reuse everything possible
- Measure every change

