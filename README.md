# Learning App (sister app 1)

A simple, tap-first learning app built for a young child with special
educational needs who can't yet speak but can point, tap, and choose. Built
with **Expo (React Native + Web)** so one codebase runs on iOS, Android, and
in a regular web browser (including locally on Windows).

## Why Expo?

Expo + React Native Web covers all three targets (iOS, web, Windows browser)
from a single TypeScript codebase, has built-in text-to-speech
(`expo-speech`), and needs no native build tooling to try it out locally —
`npm run web` is enough for day-to-day development and for your sister to
use it in a browser.

## Folder structure

```
src/
  data/         Content: letters, numbers, colours, animals, vehicles,
                emotions, communication board words, coloured objects
                (for the bonus games), daily routines. Add a new item to
                a category by adding one line here — no other code
                changes needed.
  components/   Reusable building blocks: BigButton, RewardOverlay, and
                the four activity "levels" (Explore, Match, Choose, Sequence)
                that power every learning category. ScreenHeader gives
                every screen a consistent home button.
  context/      SettingsContext — sound on/off, button size, shared app-wide.
  utils/        speech.ts (text-to-speech), storage.ts (progress/settings
                persistence via AsyncStorage), shuffle.ts.
  screens/      One file per screen (Home, Category picker, Level picker,
                Activity, Communication Board, "I feel...", Routines,
                Bonus Games + 4 mini-games, Parent Dashboard, Settings).
  navigation/   React Navigation stack wiring screens together.
```

Adding a new learning category (e.g. "Shapes") means: create
`src/data/shapes.ts` with an `Item[]` array, then add one line to
`src/data/categories.ts`. The four difficulty levels, progress tracking, and
speech all work automatically.

## Running on Windows (browser)

```
cd "sister app 1"
npm install       # first time only
npm run web
```

This opens the app at `http://localhost:8081` (or the port shown) in your
default browser. Works with mouse or touchscreen.

## Testing on mobile (iOS/Android)

1. Install the **Expo Go** app from the App Store / Play Store on the phone.
2. On your computer, run:
   ```
   cd "sister app 1"
   npm install       # first time only
   npm start
   ```
3. Scan the QR code shown in the terminal/browser with the phone's camera
   (iOS) or the Expo Go app (Android).

No Mac is required for this — Expo Go lets you test on a real iPhone from
Windows. A Mac is only needed if you later want to build a native `.ipa` for
the App Store.

## What's finished

- Home screen with three big paths: **Learn**, **Talk** (communication
  board), **My Day** (visual routines) — plus Parent/Settings access.
  Every other screen has a consistent home button (fixed a gap where a
  few screens had no way back without it).
- 6 learning categories: Letters, Numbers, Colours, Animals, Vehicles,
  Emotions — each with 4 difficulty levels:
  1. **Look & Listen** — tap any picture to see/hear it (no wrong answers).
  2. **Match Pairs** — memory-card matching game.
  3. **Choose the Right One** — hear a word, tap the correct picture among
     3–4 options ("listen and choose").
  4. **Put in Order** — simple sequencing (e.g. 1-2-3, A-B-C).
- **Bonus Games** hub with 4 more mini-games built on the same reward/
  progress system:
  - **Odd One Out** — 3 items from one category + 1 from another; tap the
    one that doesn't belong.
  - **Tap the Colour** — "Tap all the red things!"; find every matching
    object in a mixed grid of real objects (not just one swatch each).
  - **Count It** — counts real objects (apples, balloons, stars…) rather
    than abstract dots, and asks "how many?" with number options.
  - **Match Letters** — dedicated uppercase-to-lowercase matching game
    (also reachable from the Letters level picker).
- **"I feel..."** quick communication screen for emotions, separate from
  the Emotions learning category, reachable from the Communication Board.
- Communication board with 11 core need/feeling buttons (food, water,
  toilet, help, yes, no, more, stop, happy, sad, tired) — tap to hear the
  word spoken aloud. Parents can add and remove custom words/pictures
  (emoji + label) directly in the app, stored locally.
- Visual daily routine schedules (Morning, Meal Time, School Time, Play
  Time, Bedtime) with large step-by-step cards and Home/Next buttons.
- Text-to-speech on every tap, with a repeat button on target pictures.
- Positive-only reinforcement: stars/confetti banner and "Well done!" on
  every correct action; no timers, no failure states, no scoring pressure.
- Automatic text colour contrast on buttons (dark text on light swatches
  like yellow/white, white text on dark ones) so every label stays
  readable regardless of category colour.
- Local progress tracking per category and per bonus game (attempts,
  correct answers, activities completed) shown in a Parent Dashboard,
  including a favourite-activity and needs-more-practice summary.
- Settings: sound on/off, adjustable button size (Medium/Large/Extra Large).
- No ads, no accounts, no external links reachable by the child — all data
  stays on the device (AsyncStorage).

## What to build next

- **Drag-and-drop** as an alternative to tap-to-match on the Match level
  (tap-to-match already covers the accessibility requirement; drag is a
  nice-to-have enhancement, not required for her to use the app).
- A couple of remaining bonus ideas from the brief: sorting into bins,
  shadow-to-object matching, and letter/number tracing preparation. These
  are natural additions alongside the existing bonus games.
- Difficulty auto-adjustment based on Parent Dashboard accuracy data.
- Optional cloud sync of progress (explicitly out of scope for this MVP —
  everything is local-only by design).
- Swap emoji art for real photos of family/objects if you want a more
  personal, less abstract visual set (the `Item.emoji` field can hold any
  short string or, with a small `BigButton` change, an image source).
- A proper app icon/splash screen (currently using Expo's default) before
  any app-store submission.
