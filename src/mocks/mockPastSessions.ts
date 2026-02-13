export interface PastSession {
  id: string;
  title: string;
  type: 'Musculation' | 'Cardio' | 'Mobilité';
  date: string;
  duration: number;
  caloriesBurned: number;
  completed: boolean;
  badge?: string;
}

const today = new Date();
const day = (daysAgo: number): string => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const mockPastSessions: PastSession[] = [
  {
    id: 'past-001',
    title: 'Push — Poitrine & Épaules',
    type: 'Musculation',
    date: day(1),
    duration: 52,
    caloriesBurned: 410,
    completed: true,
    badge: '🔥 PR',
  },
  {
    id: 'past-002',
    title: 'HIIT Brûle-graisses',
    type: 'Cardio',
    date: day(2),
    duration: 30,
    caloriesBurned: 320,
    completed: true,
  },
  {
    id: 'past-003',
    title: 'Pull — Dos & Biceps',
    type: 'Musculation',
    date: day(3),
    duration: 48,
    caloriesBurned: 385,
    completed: true,
    badge: '⚡ 3 jours',
  },
  {
    id: 'past-004',
    title: 'Étirements & Récupération',
    type: 'Mobilité',
    date: day(5),
    duration: 35,
    caloriesBurned: 120,
    completed: true,
  },
  {
    id: 'past-005',
    title: 'Legs — Quadriceps & Ischio',
    type: 'Musculation',
    date: day(6),
    duration: 58,
    caloriesBurned: 480,
    completed: true,
    badge: '🔥 PR',
  },
  {
    id: 'past-006',
    title: 'Footing tempo',
    type: 'Cardio',
    date: day(8),
    duration: 40,
    caloriesBurned: 350,
    completed: true,
  },
  {
    id: 'past-007',
    title: 'Upper Body — Force',
    type: 'Musculation',
    date: day(9),
    duration: 55,
    caloriesBurned: 430,
    completed: false,
  },
  {
    id: 'past-008',
    title: 'Yoga dynamique',
    type: 'Mobilité',
    date: day(11),
    duration: 45,
    caloriesBurned: 180,
    completed: true,
  },
  {
    id: 'past-009',
    title: 'Full Body — Endurance',
    type: 'Musculation',
    date: day(13),
    duration: 50,
    caloriesBurned: 400,
    completed: true,
  },
  {
    id: 'past-010',
    title: 'Intervalles vélo',
    type: 'Cardio',
    date: day(15),
    duration: 35,
    caloriesBurned: 290,
    completed: true,
  },
  {
    id: 'past-011',
    title: 'Push — Triceps & Poitrine',
    type: 'Musculation',
    date: day(18),
    duration: 50,
    caloriesBurned: 395,
    completed: true,
  },
  {
    id: 'past-012',
    title: 'Mobilité hanches & épaules',
    type: 'Mobilité',
    date: day(20),
    duration: 30,
    caloriesBurned: 105,
    completed: false,
  },
];
