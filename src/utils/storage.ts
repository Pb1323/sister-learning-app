import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommItem } from '../data/types';

const PROGRESS_KEY = 'progress-v1';
const SETTINGS_KEY = 'settings-v1';
const CUSTOM_COMM_KEY = 'custom-comm-v1';

export interface CategoryProgress {
  attempts: number;
  correct: number;
  sessionsCompleted: number;
}

export type ProgressStore = Record<string, CategoryProgress>;

const emptyRecord = (): CategoryProgress => ({ attempts: 0, correct: 0, sessionsCompleted: 0 });

export async function getProgress(): Promise<ProgressStore> {
  const raw = await AsyncStorage.getItem(PROGRESS_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveProgress(store: ProgressStore) {
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
}

export async function recordAnswer(categoryId: string, correct: boolean) {
  const store = await getProgress();
  const rec = store[categoryId] ?? emptyRecord();
  rec.attempts += 1;
  if (correct) rec.correct += 1;
  store[categoryId] = rec;
  await saveProgress(store);
}

export async function recordSessionComplete(categoryId: string) {
  const store = await getProgress();
  const rec = store[categoryId] ?? emptyRecord();
  rec.sessionsCompleted += 1;
  store[categoryId] = rec;
  await saveProgress(store);
}

export interface Settings {
  soundOn: boolean;
  buttonSize: 'medium' | 'large' | 'extraLarge';
}

export const defaultSettings: Settings = {
  soundOn: true,
  buttonSize: 'large',
};

export async function getSettings(): Promise<Settings> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
}

export async function saveSettings(settings: Settings) {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function getCustomCommunicationItems(): Promise<CommItem[]> {
  const raw = await AsyncStorage.getItem(CUSTOM_COMM_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addCustomCommunicationItem(item: CommItem) {
  const items = await getCustomCommunicationItems();
  items.push(item);
  await AsyncStorage.setItem(CUSTOM_COMM_KEY, JSON.stringify(items));
  return items;
}

export async function removeCustomCommunicationItem(id: string) {
  const items = await getCustomCommunicationItems();
  const next = items.filter((i) => i.id !== id);
  await AsyncStorage.setItem(CUSTOM_COMM_KEY, JSON.stringify(next));
  return next;
}
