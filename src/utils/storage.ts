import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'alphabet-settings-v1';
const ALPHABET_PROGRESS_KEY = 'alphabet-progress-v1';

export interface Settings {
  soundOn: boolean;
  musicOn: boolean;
  buttonSize: 'medium' | 'large' | 'extraLarge';
  difficulty: 2 | 3 | 4;
}

export const defaultSettings: Settings = {
  soundOn: true,
  musicOn: true,
  buttonSize: 'large',
  difficulty: 2,
};

export interface AlphabetProgress {
  practisedLetters: string[];
  findCorrect: number;
  matchCorrect: number;
  stars: number;
}

export const defaultAlphabetProgress: AlphabetProgress = {
  practisedLetters: [],
  findCorrect: 0,
  matchCorrect: 0,
  stars: 0,
};

export async function getSettings(): Promise<Settings> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
}

export async function saveSettings(settings: Settings) {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function getAlphabetProgress(): Promise<AlphabetProgress> {
  const raw = await AsyncStorage.getItem(ALPHABET_PROGRESS_KEY);
  return raw ? { ...defaultAlphabetProgress, ...JSON.parse(raw) } : defaultAlphabetProgress;
}

async function saveAlphabetProgress(progress: AlphabetProgress) {
  await AsyncStorage.setItem(ALPHABET_PROGRESS_KEY, JSON.stringify(progress));
}

export async function recordLetterPractised(letter: string) {
  const progress = await getAlphabetProgress();
  const practisedLetters = progress.practisedLetters.includes(letter)
    ? progress.practisedLetters
    : [...progress.practisedLetters, letter];
  const next = { ...progress, practisedLetters, stars: Math.max(progress.stars, practisedLetters.length) };
  await saveAlphabetProgress(next);
  return next;
}

export async function recordFindCorrect() {
  const progress = await getAlphabetProgress();
  const next = { ...progress, findCorrect: progress.findCorrect + 1, stars: progress.stars + 1 };
  await saveAlphabetProgress(next);
  return next;
}

export async function recordMatchCorrect() {
  const progress = await getAlphabetProgress();
  const next = { ...progress, matchCorrect: progress.matchCorrect + 1, stars: progress.stars + 1 };
  await saveAlphabetProgress(next);
  return next;
}

// Legacy helpers kept so hidden pre-MVP screens continue to typecheck while navigation focuses on alphabet only.
export interface CategoryProgress { attempts: number; correct: number; sessionsCompleted: number; }
export type ProgressStore = Record<string, CategoryProgress>;
export async function getProgress(): Promise<ProgressStore> { return {}; }
export async function recordAnswer(_categoryId: string, _correct: boolean) {}
export async function recordSessionComplete(_categoryId: string) {}
export async function getCustomCommunicationItems(): Promise<any[]> { return []; }
export async function addCustomCommunicationItem(item: any) { return [item]; }
export async function removeCustomCommunicationItem(_id: string) { return []; }
