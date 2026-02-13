# Lucid

Application mobile de fitness — prototype front cliquable avec données mock statiques.

## Stack technique

- React Native + Expo (TypeScript)
- React Navigation (Native Stack + Bottom Tabs)
- expo-linear-gradient, react-native-svg
- AsyncStorage pour la persistance locale
- Expo Haptics pour le retour haptique

## Installation

```bash
npm install
npx expo start
```

## Lancer l'app

- `npm run ios` — Simulateur iOS
- `npm run android` — Émulateur Android
- `npm run web` — Navigateur web

## Structure du projet

```
src/
├── theme/          # Tokens design (couleurs, spacing, radius, typo)
├── components/     # ~18 composants UI réutilisables
├── navigation/     # Tab navigator + stack + bottom notch bar
├── screens/
│   ├── home/       # Écran d'accueil + modal quote
│   ├── plan/       # Plan d'entraînement + détail + préférences
│   ├── stats/      # Statistiques + graphiques + body map
│   ├── profile/    # Profil utilisateur + réglages
│   └── session/    # Flow séance (preview → exercise → rest → survey → summary)
├── mocks/          # Données mock statiques
├── utils/          # Haptics, formatDate, AsyncStorage wrapper
└── hooks/          # useStorage hook
```

## Navigation

- **Bottom Tab Bar** avec notch central SVG et bouton "+"
- 4 onglets : Accueil, Plan, Stats, Profil
- Flow séance : Preview → Exercise (x6) → Rest → Survey → Summary

## Fonctionnalités prototype

- [x] Navigation complète entre tous les écrans
- [x] Flow séance complet avec timer de repos
- [x] Graphiques (barres, lignes) et body map SVG
- [x] Persistance locale (poids, quotes, préférences)
- [x] Retour haptique sur les CTAs et tabs
- [x] Skeleton loaders au premier rendu
- [x] Dark theme cohérent

## Screenshots

_À venir_
