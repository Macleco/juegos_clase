# Dinosaur Diet Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a polished, touch-friendly dinosaur diet sorting game for classroom digital whiteboards.

**Architecture:** A React application composes small common UI components with an isolated `games/dinosaur-diet` feature. Pure game transitions and Fisher–Yates shuffle remain independent of React; a hook adapts them to the game screen and dnd-kit callbacks. CSS/Tailwind controls layout, tokens, and reduced-motion-aware feedback.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, `@dnd-kit/core`, Lucide React, Vitest, React Testing Library, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-10-02-dinosaur-diet-design.md`

## Global Constraints

- Static browser application, suitable for GitHub Pages; no backend, accounts, PWA, service worker, or offline support.
- Use stable compatible Vite, React, TypeScript and Tailwind versions; keep TypeScript strict.
- Use `@dnd-kit/core` with Pointer Events and `touch-action` rules; support mouse, touch, and whiteboard pointers.
- Optimise 16:9 at 1920×1080, fit play without vertical scrolling, and degrade sensibly to 1366×768/tablet landscape.
- Keep the visual system calm, pastel, spacious, high-contrast, rounded, and readable at a distance.
- Include exactly 12 dinosaurios: six herbivores and six carnivores; shuffle at new game and restart.
- Only the top card is interactive. Never reveal upcoming dinosaurs in the deck.
- Correct drops classify permanently; incorrect drops retain the active card and use gentle feedback only.
- Respect `prefers-reduced-motion`, semantic HTML, large touch targets, and non-colour category cues.
- Do not implement other games, image assets, audio, profiles, analytics, competition, age modes, or persistent data.

## Review Focus

- Repeated incorrect drops must leave the same active dinosaur and progress unchanged (Task 2).
- A restart must restore all twelve cards and produce a fresh permutation without mutating dataset records (Task 2).
- Empty deck must render no draggable card and still allow the completed board to be reviewed (Task 4).
- Drag targets must remain usable with Pointer Events and should not trigger page scrolling/text selection (Task 5 manual verification).
- Reduced-motion users must receive state feedback without waiting on or depending on animation (Task 6).

---

### Task 1: Application scaffold and test harness

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`
- Create: `src/main.tsx`, `src/app/App.tsx`, `src/styles/index.css`, `src/test/setup.ts`
- Create: `src/app/App.test.tsx`
- Create: `.github/workflows/deploy.yml`, `.gitignore`

**Interfaces:**
- Produces: `App` as the root React component and `npm run dev`, `test`, `lint`, and `build` scripts.
- Consumes: none.

- [ ] **Step 1: Write a failing smoke test**

```tsx
it('renders the game title', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /qué comía cada dinosaurio/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run src/app/App.test.tsx`
Expected: FAIL because the app and test configuration do not yet exist.

- [ ] **Step 3: Create the Vite/React/Tailwind/Vitest scaffold**

Configure strict TypeScript, jsdom Testing Library setup, ESLint, and scripts. Add GitHub Pages workflow using Vite's CI-derived base path, upload-pages-artifact and deploy-pages actions. Implement the minimal semantic `App` heading and global Nunito fallback typography/tokens.

- [ ] **Step 4: Run the smoke test**

Run: `npm test -- --run src/app/App.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tailwind.config.ts postcss.config.js index.html src .github .gitignore
git commit -m "chore: scaffold classroom game application"
```

### Task 2: Dinosaur data and pure game rules

**Files:**
- Create: `src/data/dinosaurs.ts`
- Create: `src/games/dinosaur-diet/game-state.ts`
- Create: `src/games/dinosaur-diet/game-state.test.ts`

**Interfaces:**
- Produces: `type Diet = 'herbivore' | 'carnivore'`, `interface Dinosaur`, `DINOSAURS`, `shuffle<T>(items: readonly T[]): T[]`, `createGameState(deck?: Dinosaur[]): GameState`, and `classifyCurrentCard(state: GameState, target: Diet): ClassificationResult`.
- Consumes: none.

- [ ] **Step 1: Write failing rule tests**

```ts
expect(DINOSAURS).toHaveLength(12)
expect(DINOSAURS.filter(({ diet }) => diet === 'herbivore')).toHaveLength(6)
expect(DINOSAURS.filter(({ diet }) => diet === 'carnivore')).toHaveLength(6)
expect(new Set(shuffle(DINOSAURS).map(({ id }) => id))).toEqual(new Set(DINOSAURS.map(({ id }) => id)))
expect(classifyCurrentCard(state, correctDiet).accepted).toBe(true)
expect(classifyCurrentCard(state, wrongDiet).state.deck).toEqual(state.deck)
expect(completeState.completed).toBe(true)
```

- [ ] **Step 2: Run the rules test to verify it fails**

Run: `npm test -- --run src/games/dinosaur-diet/game-state.test.ts`
Expected: FAIL because data and rule modules do not exist.

- [ ] **Step 3: Implement immutable data and game transitions**

Use the twelve specified dinosaur names and Fisher–Yates shuffle. `GameState` holds `deck`, `classifiedHerbivores`, `classifiedCarnivores`, and `completed`; the transition returns `{ accepted, state }` without removing an incorrect card.

- [ ] **Step 4: Run rule tests**

Run: `npm test -- --run src/games/dinosaur-diet/game-state.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/dinosaurs.ts src/games/dinosaur-diet/game-state.ts src/games/dinosaur-diet/game-state.test.ts
git commit -m "feat: add dinosaur game rules"
```

### Task 3: Shared classroom UI primitives

**Files:**
- Create: `src/components/GameHeader.tsx`, `src/components/ProgressIndicator.tsx`, `src/components/Modal.tsx`
- Create: `src/components/components.test.tsx`

**Interfaces:**
- Produces: `GameHeader({ onHome, onRestart, onSettings })`, `ProgressIndicator({ current, total })`, and `Modal({ title, children, onClose })`.
- Consumes: Lucide React.

- [ ] **Step 1: Write failing component tests**

```tsx
expect(screen.getByRole('button', { name: /reiniciar/i })).toBeEnabled()
expect(screen.getByText('4 / 12')).toBeInTheDocument()
expect(screen.getByRole('dialog', { name: /muy bien/i })).toBeInTheDocument()
```

- [ ] **Step 2: Run component tests to verify they fail**

Run: `npm test -- --run src/components/components.test.tsx`
Expected: FAIL because shared components do not exist.

- [ ] **Step 3: Implement accessible header, progress, and modal primitives**

Use labelled large icon controls, a centre title, dialog semantics, focus-safe close button, and the pastel token classes. The home button resets via the supplied callback in this single-game MVP.

- [ ] **Step 4: Run component tests**

Run: `npm test -- --run src/components/components.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components
git commit -m "feat: add shared classroom controls"
```

### Task 4: Game screen, deck, and classified collections

**Files:**
- Create: `src/games/dinosaur-diet/useDinosaurDietGame.ts`
- Create: `src/games/dinosaur-diet/DinosaurCard.tsx`, `Deck.tsx`, `DietZone.tsx`, `DinosaurDietGame.tsx`
- Create: `src/games/dinosaur-diet/DinosaurDietGame.test.tsx`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `GameState`, `classifyCurrentCard`, `Dinosaur`, and shared primitives.
- Produces: `DinosaurDietGame` and a hook exposing `state`, `currentCard`, `classify(target)`, and `restart()`.

- [ ] **Step 1: Write failing game UI tests**

```tsx
expect(screen.getByText(current.name)).toBeInTheDocument()
expect(screen.getAllByTestId('active-dinosaur-card')).toHaveLength(1)
expect(screen.getByText('0 / 12')).toBeInTheDocument()
// after twelve successful classify calls
expect(screen.getByRole('dialog', { name: /muy bien/i })).toBeInTheDocument()
```

- [ ] **Step 2: Run game UI tests to verify they fail**

Run: `npm test -- --run src/games/dinosaur-diet/DinosaurDietGame.test.tsx`
Expected: FAIL because the game screen does not exist.

- [ ] **Step 3: Implement the visual game composition without drag wiring**

Build the symmetrical labelled zones, 3×2 classified-card grids, fixed lower deck with neutral stacked back cards, placeholder image area, current-card name and progress. Integrate the hook and completion/review modal; render no active card if the deck is empty.

- [ ] **Step 4: Run game UI tests**

Run: `npm test -- --run src/games/dinosaur-diet/DinosaurDietGame.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/App.tsx src/games/dinosaur-diet
git commit -m "feat: build dinosaur sorting board"
```

### Task 5: Pointer-friendly drag and drop and feedback

**Files:**
- Modify: `src/games/dinosaur-diet/DinosaurCard.tsx`, `Deck.tsx`, `DietZone.tsx`, `DinosaurDietGame.tsx`
- Modify: `src/games/dinosaur-diet/DinosaurDietGame.test.tsx`, `src/styles/index.css`

**Interfaces:**
- Consumes: dnd-kit `DndContext`, draggable and droppable hooks, plus hook `classify(target)`.
- Produces: card drag callbacks that classify only the active top card and set `feedback` to `'correct' | 'incorrect' | null`.

- [ ] **Step 1: Write failing drag-result tests**

```tsx
fireEvent.dragEnd(screen.getByTestId('active-dinosaur-card'), { /* matching droppable id */ })
expect(screen.getByText('1 / 12')).toBeInTheDocument()
// wrong target
expect(screen.getByText(initialCard.name)).toBeInTheDocument()
expect(screen.getByText('0 / 12')).toBeInTheDocument()
```

- [ ] **Step 2: Run the focused UI test to verify it fails**

Run: `npm test -- --run src/games/dinosaur-diet/DinosaurDietGame.test.tsx`
Expected: FAIL because drag callbacks are not connected.

- [ ] **Step 3: Wire dnd-kit Pointer/Mouse/Touch sensors and overlays**

Use an activation distance to prevent accidental drags, an accessible `DragOverlay`, stable droppable ids matching `Diet`, and a short feedback timeout. Apply `touch-action: none`, non-selectable card content, scale/elevation while dragging, and category highlights. Correct drops advance immediately after brief visual acknowledgement; incorrect drops retain the card and apply a gentle shake.

- [ ] **Step 4: Run the focused UI tests and manually inspect pointer interaction**

Run: `npm test -- --run src/games/dinosaur-diet/DinosaurDietGame.test.tsx`
Expected: PASS.

Manual: run `npm run dev`, test a correct/incorrect mouse drag at 1920×1080 and 1366×768, then use browser device emulation to confirm no scroll/text-selection on touch drag.

- [ ] **Step 5: Commit**

```bash
git add src/games/dinosaur-diet src/styles/index.css
git commit -m "feat: add touch drag sorting feedback"
```

### Task 6: Settings, responsive polish, documentation and release verification

**Files:**
- Modify: `src/games/dinosaur-diet/DinosaurDietGame.tsx`, `src/styles/index.css`
- Create: `README.md`, `docs/architecture.md`
- Modify: `src/app/App.test.tsx`, `src/games/dinosaur-diet/DinosaurDietGame.test.tsx`

**Interfaces:**
- Consumes: shared `Modal`, game `restart()`.
- Produces: a growable settings modal with restart, a completion modal with replay/close, responsive visual tokens, and project documentation.

- [ ] **Step 1: Write failing tests for replay, empty deck and modal controls**

```tsx
expect(screen.getByRole('button', { name: /jugar otra vez/i })).toBeEnabled()
expect(screen.queryByTestId('active-dinosaur-card')).not.toBeInTheDocument()
expect(screen.getByRole('button', { name: /configuración/i })).toBeEnabled()
```

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `npm test -- --run src/games/dinosaur-diet/DinosaurDietGame.test.tsx`
Expected: FAIL until completion/settings UI is complete.

- [ ] **Step 3: Complete teacher controls, responsive behaviour and documentation**

Add a modest configuration dialog with restart, completion replay and close-for-review actions. Finalise CSS breakpoints, no-scroll play layout, `prefers-reduced-motion` fallbacks, and visual feedback. Write the README covering objective, stack, install, development, tests, build, Pages deployment and structure; write the brief architecture guide describing current boundaries/state and how to add a second game.

- [ ] **Step 4: Run all automated checks and manual visual review**

Run: `npm test && npm run lint && npm run build`
Expected: all commands exit 0.

Manual: inspect browser console, correct and incorrect pointer drags, touch emulation, 1920×1080 and 1366×768 layouts, and reduced-motion media emulation.

- [ ] **Step 5: Commit**

```bash
git add README.md docs src
git commit -m "docs: complete dinosaur game delivery"
```
