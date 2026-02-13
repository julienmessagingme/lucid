export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  restSeconds: number;
  tips: string;
  alternatives: string[];
  thumbnail: string;
}

export interface Session {
  id: string;
  title: string;
  type: string;
  duration: number;
  level: string;
  exercises: Exercise[];
}

export const mockTodaySession: Session = {
  id: 'session-today-001',
  title: 'Full Body — Force',
  type: 'Musculation',
  duration: 55,
  level: 'Intermédiaire',
  exercises: [
    {
      id: 'ex-001',
      name: 'Développé couché avec haltères',
      sets: 4,
      reps: 10,
      weight: 30,
      restSeconds: 90,
      tips: 'Gardez les omoplates serrées contre le banc et descendez les haltères jusqu\'au niveau de la poitrine. Expirez en poussant.',
      alternatives: ['Développé couché barre', 'Pompes lestées', 'Développé incliné haltères'],
      thumbnail: '',
    },
    {
      id: 'ex-002',
      name: 'Squat barre arrière',
      sets: 4,
      reps: 8,
      weight: 70,
      restSeconds: 120,
      tips: 'Descendez jusqu\'à ce que vos cuisses soient parallèles au sol. Poussez à travers les talons en gardant le dos droit.',
      alternatives: ['Squat goblet', 'Presse à cuisses', 'Squat bulgare'],
      thumbnail: '',
    },
    {
      id: 'ex-003',
      name: 'Rowing barre pronation',
      sets: 4,
      reps: 10,
      weight: 50,
      restSeconds: 90,
      tips: 'Penchez le buste à 45° et tirez la barre vers le nombril. Serrez les omoplates en haut du mouvement.',
      alternatives: ['Rowing haltère unilatéral', 'Tirage horizontal poulie', 'Rowing T-bar'],
      thumbnail: '',
    },
    {
      id: 'ex-004',
      name: 'Développé militaire debout',
      sets: 3,
      reps: 10,
      weight: 35,
      restSeconds: 90,
      tips: 'Engagez les abdominaux pour stabiliser le tronc. Poussez la barre au-dessus de la tête sans cambrer le dos.',
      alternatives: ['Développé militaire haltères', 'Push press', 'Élévations latérales'],
      thumbnail: '',
    },
    {
      id: 'ex-005',
      name: 'Fentes marchées avec haltères',
      sets: 3,
      reps: 12,
      weight: 18,
      restSeconds: 60,
      tips: 'Faites un grand pas en avant et descendez le genou arrière près du sol. Alternez les jambes à chaque répétition.',
      alternatives: ['Fentes statiques', 'Step-ups', 'Fentes arrière'],
      thumbnail: '',
    },
    {
      id: 'ex-006',
      name: 'Planche abdominale lestée',
      sets: 3,
      reps: 1,
      weight: 10,
      restSeconds: 60,
      tips: 'Maintenez 45 secondes par série. Gardez le corps aligné de la tête aux talons sans lever les fesses.',
      alternatives: ['Planche classique', 'Ab wheel rollout', 'Crunchs câble'],
      thumbnail: '',
    },
  ],
};
