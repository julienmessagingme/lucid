import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  quoteIndex: 'lucid.quoteIndex',
  quoteDate: 'lucid.quoteDate',
  weightEntries: 'lucid.weightEntries',
  preferences: 'lucid.preferences',
  completedSessions: 'lucid.completedSessions',
} as const;

export type StorageKey = keyof typeof KEYS;

export async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS[key]);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS[key], JSON.stringify(value));
  } catch {
    // silent fail for prototype
  }
}

export { KEYS };
