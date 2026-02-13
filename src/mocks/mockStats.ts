export interface DayData {
  day: 'L' | 'M' | 'Me' | 'J' | 'V' | 'S' | 'D';
  minutes: number;
  calories: number;
}

export interface WeekData {
  week: string;
  minutes: number;
  calories: number;
}

export interface BodyPart {
  name: string;
  percentage: number;
}

export interface WeightEntry {
  date: string;
  value: number;
}

export interface Streak {
  current: number;
  best: number;
  thisWeek: number;
}

export const weeklyData: DayData[] = [
  { day: 'L', minutes: 52, calories: 410 },
  { day: 'M', minutes: 30, calories: 320 },
  { day: 'Me', minutes: 48, calories: 385 },
  { day: 'J', minutes: 0, calories: 0 },
  { day: 'V', minutes: 35, calories: 120 },
  { day: 'S', minutes: 58, calories: 480 },
  { day: 'D', minutes: 0, calories: 0 },
];

export const monthlyData: WeekData[] = [
  { week: 'Sem. 1', minutes: 195, calories: 1540 },
  { week: 'Sem. 2', minutes: 223, calories: 1715 },
  { week: 'Sem. 3', minutes: 180, calories: 1430 },
  { week: 'Sem. 4', minutes: 210, calories: 1650 },
];

export const bodyParts: BodyPart[] = [
  { name: 'Poitrine', percentage: 22 },
  { name: 'Dos', percentage: 20 },
  { name: 'Jambes', percentage: 25 },
  { name: 'Épaules', percentage: 13 },
  { name: 'Bras', percentage: 12 },
  { name: 'Abdos', percentage: 8 },
];

export const weightHistory: WeightEntry[] = [
  { date: '2026-01-06', value: 74.2 },
  { date: '2026-01-13', value: 74.5 },
  { date: '2026-01-20', value: 74.8 },
  { date: '2026-01-27', value: 75.1 },
  { date: '2026-02-03', value: 74.9 },
  { date: '2026-02-06', value: 75.3 },
  { date: '2026-02-10', value: 75.6 },
  { date: '2026-02-13', value: 75.4 },
];

export const streak: Streak = {
  current: 5,
  best: 12,
  thisWeek: 4,
};
