# Project Context — Sister's Learning App

Read this first if you're a different AI model/session picking this project
up. It has everything needed to continue without re-deriving decisions.

## Who this is for

A learning app built for the developer's younger sister, who has special
educational needs. She cannot speak yet, but can walk, point, tap, and
choose between buttons. She already recognises some colours, animals, cars,
and simple objects. The app teaches letters, numbers, colours, animals,
vehicles, matching, emotions, and basic communication — entirely by
tapping/choosing, never typing or dragging (drag was deliberately skipped,
see "Deliberate scope decisions" below).

## Stack & why

**Expo (React Native + Web), TypeScript.** Chosen because it's one codebase
that runs on iOS, Android, and in a plain browser (including locally on
Windows via `npm run web`) — matching the requirement to support all three
without maintaining separate apps. `expo-speech` gives free text-to-speech
on every platform. No backend — everything is local (AsyncStorage).

Key deps: `@react-navigation/native` + `native-stack` (navigation),
`@react-native-async-storage/async-storage` (progress/settings
persistence), `expo-speech` (TTS), `react-native-gesture-handler` (required
by react-navigation, not currently used for drag gestures).

SDK version: Expo ~57, React 19.2.3, React Native 0.86. Installed via
`npx expo install <pkg>` throughout (not raw `npm install`) so versions stay
SDK-compatible — keep doing this when adding packages.

## Folder structure

```
src/
  data/         Content only. One file per category (letters.ts, numbers.ts,
                colors.ts, animals.ts, vehicles.ts, emotions.ts), plus
                communication.ts (Talk board words), coloredObjects.ts
                (bonus "tap the colour" game pool), routines.ts (visual
                schedules), categories.ts (registry — the single place that
                wires a data file into the Learn hub), types.ts.
  components/   BigButton (the one button component used everywhere —
                handles sizing, colour-contrast text, press animation),
                RewardOverlay (star/confetti "Well done!" banner),
                ScreenHeader (title + home button, used on every screen
                except Home), ActivityEngine (orchestrates the 4 generic
                difficulty levels for any category) + its 4 level
                components: ExploreLevel, MatchLevel, ChooseLevel,
                SequenceLevel.
  context/      SettingsContext — sound on/off, button size. Persisted via
                utils/storage.ts, read on app boot.
  utils/        speech.ts (wraps expo-speech, respects sound-on setting),
                storage.ts (AsyncStorage helpers: progress tracking,
                settings, custom communication-board items), shuffle.ts.
  screens/      One file per screen. See navigation/types.ts for the full
                route list — that file is the fastest way to see every
                screen that exists.
  navigation/   types.ts (RootStackParamList — route params for every
                screen) and AppNavigator.tsx (the stack).
```

## The core design pattern: one generic engine, many categories

Every learning category (Letters, Numbers, Colours, Animals, Vehicles,
Emotions) is just an `Item[]` array (`{id, label, emoji, secondaryLabel?,
color?}`) registered in `src/data/categories.ts`. `ActivityEngine` then
provides 4 difficulty levels for **any** category for free:

1. **Explore** (Level 1) — tap any picture, hear/see it. No wrong answers.
2. **Match** (Level 2) — memory-card pairs game (double each of 4 sampled
   items, flip two at a time).
3. **Choose** (Level 3) — "listen and choose": hear/see a target, tap it
   among 3-4 options.
4. **Sequence** (Level 4) — put a contiguous slice of the category's items
   in their original order (works naturally for numbers/letters; for
   colours/animals/vehicles it's just "the order in the data file", noted
   as a known simplification).

**To add a new learning category** (e.g. "Shapes"): create
`src/data/shapes.ts` exporting an `Item[]`, add one line to
`src/data/categories.ts`. All 4 levels, speech, and progress tracking work
immediately — no other code changes.

**To add a new item to an existing category**: add one object to the
relevant array in `src/data/*.ts`. Nothing else to touch.

## Screens map (see navigation/types.ts for authoritative list)

- `Home` → Learn / Talk / My Day + Parents/Settings
- `CategoryHub` → 6 categories + "Bonus Games" tile
- `LevelSelect` → the 4 levels for one category (+ "Match Letters" tile
  only when category is Letters)
- `Activity` → runs `ActivityEngine` for the chosen category+level
- `CommunicationBoard` → Talk board (11 built-in words + parent-addable
  custom words, stored locally) + "I feel..." tile
- `IFeel` → dedicated emotion-communication screen (separate from the
  Emotions *learning* category)
- `Routines` / `RoutineDetail` → 5 visual daily schedules, step-by-step
- `BonusGames` → hub for 4 extra mini-games:
  - `OddOneOut` — 3 items from one category + 1 from another, tap the odd
    one out
  - `FindColour` — "tap all the red things" — find-all game using
    `coloredObjects.ts` (richer than the 1-object-per-colour `colors.ts`)
  - `Counting` — counts real objects (not abstract dots), asks "how many?"
  - `LetterCaseMatch` — dedicated uppercase↔lowercase matching (uses
    `letterCasePairs` exported from `data/letters.ts`)
- `ParentDashboard` → per-category AND per-bonus-game stats (attempts,
  correct, sessions completed, accuracy), favourite + needs-practice
  callouts
- `Settings` → sound on/off, button size (Medium/Large/Extra Large)

## Progress tracking

`utils/storage.ts` — `recordAnswer(id, correct)` and
`recordSessionComplete(id)`, keyed by category id (`'letters'`, `'animals'`,
etc.) or bonus-game id (`'bonus-odd-one-out'`, `'bonus-find-colour'`,
`'bonus-counting'`). `LetterCaseMatch` deliberately records under
`'letters'` so it merges into the Letters category stats rather than
appearing as a separate row. `ParentDashboardScreen` has a hardcoded
`bonusGames` list mapping those ids to titles/emoji for display — if you add
another bonus game, add it there too.

## Deliberate scope decisions (don't "fix" these without discussion)

- **No drag-and-drop.** The brief allowed tap-only as the accessible
  fallback; since she taps/points rather than needing drag, tap-only covers
  the requirement. Not a missing feature so much as a chosen simplification.
- **Emoji as "pictures"**, not photos. Zero asset licensing/loading, scales
  to any size, high contrast, colourful. `Item.emoji` is just a string —
  swappable for an image source later with a small `BigButton` change if
  real family photos are wanted.
- **Sequence level (Level 4) uses data-file order**, not true semantic
  ordering, for non-numeric categories. Fine for numbers/letters
  (alphabetical/numeric is the point); for animals/vehicles/colours it's
  arbitrary-but-consistent. Documented as a known limitation, not a bug.
- **No sound-effect chimes**, only speech — kept scope tight; would be a
  reasonable addition (`expo-av`) later.
- Text-to-speech via `expo-speech` works on web via the browser's Web
  Speech API — voice quality varies by browser/OS, that's expected and not
  a bug to chase.

## Known real bugs already fixed (context for why code looks the way it does)

- Several screens originally had `headerShown: false` and no back button —
  a child could get stuck. Fixed by adding `ScreenHeader` (home button) to
  every screen except Home.
- Numbers 11-20 originally rendered as one unbroken line of up to 20 dot
  emoji, overflowing the fixed-size button. Fixed by wrapping 5-per-row in
  `data/numbers.ts` (`dot()` helper) and by making `BigButton` shrink emoji
  font size for long emoji strings.
- Light colour swatches (yellow `#fdd835`, white `#f5f5f5`) had hardcoded
  white label text — unreadable. Fixed with a luminance-based
  `textColorFor()` helper in `BigButton.tsx` that picks dark or light text
  based on the background colour.
- `FindColourScreen` originally used a light grey (`#eceff1`) tile
  background with (then-hardcoded) white text — same contrast bug, fixed
  alongside the above; tile colour changed to `#78909c`.

## Verification done so far

- `npx tsc --noEmit` passes clean.
- `npx expo export --platform web` succeeds (bundles ~640 modules).
- Manually started `npx expo start --web`, curled `localhost`, got HTTP 200
  and a valid bundle response, then shut the dev server down — confirms the
  app boots without a runtime crash. Have NOT done a full manual click-
  through of every screen in an actual browser/device — that's the natural
  next verification step if bugs are suspected.
- The `Animated: useNativeDriver is not supported` warning on web is
  expected/harmless (RN Web doesn't implement the native driver; falls back
  to JS animation). Not a bug.

## How to run

```
cd "sister app 1"
npm install        # first time only
npm run web        # Windows browser, http://localhost:8081
npm start          # then scan QR with Expo Go app for iOS/Android
```

## What's next (not yet built)

- Sorting-into-bins game, shadow-to-object matching, letter/number tracing
  prep — natural additions alongside the existing 4 bonus games.
- Difficulty auto-adjustment driven by Parent Dashboard accuracy data.
- Cloud sync (explicitly out of scope for now — local-only by design).
- Real app icon/splash screen before any app-store submission (currently
  Expo defaults).
- Optional: swap emoji for real photos (see "Deliberate scope decisions").
