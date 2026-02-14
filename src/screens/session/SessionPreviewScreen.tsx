import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { Pill } from '../../components/Pill';
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

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'SessionPreview'>;

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

export const SessionPreviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const session = mockTodaySession;

  const handleStart = () => {
    haptic.medium();
    navigation.navigate('SessionExercise', { exerciseIndex: 0 });
  };

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{session.title}</Text>

        <View style={styles.pillRow}>
          <Pill label={session.type} />
          <Pill label={`${session.duration} min`} />
          <Pill label={session.level} />
        </View>

        <Text style={styles.sectionTitle}>Aperçu des exercices</Text>

        {session.exercises.map((exercise, index) => (
          <Card key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseRow}>
              <View style={styles.indexCircle}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetail}>
                  {exercise.sets}x{exercise.reps}  ·  {exercise.weight} kg
                </Text>
              </View>
            </View>
          </Card>
        ))}

        <View style={styles.bottomSection}>
          <PrimaryCTA label="C'est parti 💪" onPress={handleStart} />
          <Text style={styles.subText}>
            ~{session.duration} min · {session.exercises.length} exercices
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  backText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.accentSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.base,
  },
  pillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing['2xl'],
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.base,
  },
  exerciseCard: {
    marginBottom: spacing.md,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  indexText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.accent,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  exerciseDetail: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  bottomSection: {
    marginTop: spacing['2xl'],
    alignItems: 'center',
  },
  subText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
