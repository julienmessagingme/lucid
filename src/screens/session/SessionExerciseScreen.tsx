import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { Screen } from '../../components/Screen';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { SecondaryButton } from '../../components/SecondaryButton';
import { Pill } from '../../components/Pill';
import { ProgressBar } from '../../components/ProgressBar';
import { mockTodaySession } from '../../mocks/mockTodaySession';
import { haptic } from '../../utils/haptics';
import { colors } from '../../theme';

type MainStackParamList = {
  SessionPreview: undefined;
  SessionExercise: { exerciseIndex: number };
  Rest: { nextExerciseIndex: number };
  SessionEndSurvey: undefined;
  SessionSummary: undefined;
  Tabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'SessionExercise'>;
type ScreenRouteProp = RouteProp<MainStackParamList, 'SessionExercise'>;

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

const radius = { card: 20, cta: 30, pill: 14 };

type TabKey = 'comment' | 'tips' | 'options';

export const SessionExerciseScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { exerciseIndex } = route.params;

  const exercises = mockTodaySession.exercises;
  const total = exercises.length;
  const exercise = exercises[exerciseIndex];
  const isLast = exerciseIndex === total - 1;

  const [activeTab, setActiveTab] = useState<TabKey>('comment');
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(exercise.sets).fill(false)
  );

  const allSetsCompleted = completedSets.every(Boolean);

  const toggleSet = (index: number) => {
    setCompletedSets((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
    haptic.medium();
  };

  const handleNext = () => {
    haptic.medium();
    if (isLast) {
      navigation.navigate('SessionEndSurvey');
    } else {
      navigation.navigate('Rest', { nextExerciseIndex: exerciseIndex + 1 });
    }
  };

  const handleSkip = () => {
    if (isLast) {
      navigation.navigate('SessionEndSurvey');
    } else {
      navigation.navigate('Rest', { nextExerciseIndex: exerciseIndex + 1 });
    }
  };

  const handleExit = () => {
    Alert.alert(
      'Quitter la séance',
      'Es-tu sûr de vouloir quitter ? Ta progression ne sera pas sauvegardée.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Quitter',
          style: 'destructive',
          onPress: () =>
            navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] }),
        },
      ]
    );
  };

  const progress = (exerciseIndex + 1) / total;

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'comment', label: 'Comment' },
    { key: 'tips', label: 'Tips' },
    { key: 'options', label: 'Options' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'comment':
        return (
          <Text style={styles.tabBody}>
            {exercise.sets} séries de {exercise.reps} répétitions à{' '}
            {exercise.weight} kg{'\n\n'}Repos : {exercise.restSeconds}s entre les
            séries
          </Text>
        );
      case 'tips':
        return (
          <Text style={[styles.tabBody, { color: colors.textSecondary }]}>
            {exercise.tips || 'Aucun conseil pour cet exercice.'}
          </Text>
        );
      case 'options':
        return (
          <View style={styles.alternativesWrap}>
            {exercise.alternatives && exercise.alternatives.length > 0 ? (
              exercise.alternatives.map((alt, i) => (
                <Pill key={i} label={alt} />
              ))
            ) : (
              <Text style={[styles.tabBody, { color: colors.textMuted }]}>
                Aucune alternative disponible.
              </Text>
            )}
          </View>
        );
    }
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.exerciseCounter}>
            Exercice {exerciseIndex + 1}/{total}
          </Text>
          <TouchableOpacity
            onPress={handleExit}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.exitText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
        </View>

        {/* Scrollable content area */}
        <View style={styles.contentArea}>
          {/* Video placeholder */}
          <View style={styles.videoPlaceholder}>
            <Text style={styles.playIcon}>▶</Text>
            <Text style={styles.videoText}>Vidéo bientôt disponible</Text>
          </View>

          {/* Exercise name */}
          <Text style={styles.exerciseName}>{exercise.name}</Text>

          {/* Tabs */}
          <View style={styles.tabRow}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tab,
                  activeTab === tab.key && styles.tabActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabLabel,
                    activeTab === tab.key && styles.tabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab content */}
          <View style={styles.tabContent}>{renderTabContent()}</View>

          {/* Series checkboxes */}
          <View style={styles.seriesSection}>
            {Array.from({ length: exercise.sets }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={styles.seriesRow}
                onPress={() => toggleSet(i)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    completedSets[i] && styles.checkboxChecked,
                  ]}
                >
                  {completedSets[i] && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.seriesLabel}>Série {i + 1}</Text>
                <Text style={styles.seriesDetail}>
                  {exercise.reps} reps · {exercise.weight} kg
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom buttons */}
        <View style={styles.bottomButtons}>
          <PrimaryCTA label={isLast ? 'Terminer la séance' : 'Série suivante →'} onPress={handleNext} />
          <View style={{ height: spacing.sm }} />
          <SecondaryButton label="Passer cet exercice" onPress={handleSkip} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.base,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backText: {
    fontSize: 22,
    color: colors.accentSecondary,
  },
  exerciseCounter: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  exitText: {
    fontSize: 20,
    color: colors.textMuted,
  },
  progressContainer: {
    marginBottom: spacing.base,
  },
  contentArea: {
    flex: 1,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  playIcon: {
    fontSize: 36,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  videoText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  tabRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
  },
  tab: {
    paddingBottom: spacing.xs,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textMuted,
  },
  tabLabelActive: {
    color: colors.text,
    fontWeight: '600',
  },
  tabContent: {
    marginBottom: spacing.lg,
  },
  tabBody: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 22,
  },
  alternativesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  seriesSection: {
    gap: spacing.sm,
  },
  seriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seriesLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.text,
    flex: 1,
  },
  seriesDetail: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  bottomButtons: {
    paddingTop: spacing.base,
    paddingBottom: spacing.xl,
  },
});
