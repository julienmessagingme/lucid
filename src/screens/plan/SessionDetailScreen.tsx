import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { Pill } from '../../components/Pill';

import { mockPastSessions } from '../../mocks/mockPastSessions';
import { mockTodaySession } from '../../mocks/mockTodaySession';

import { colors, spacing, typography } from '../../theme';
import type { MainStackParamList } from '../../navigation/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Nav = NativeStackNavigationProp<MainStackParamList, 'SessionDetail'>;
type Route = RouteProp<MainStackParamList, 'SessionDetail'>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatFullDate(iso: string): string {
  const d = new Date(iso);
  const days = [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
    'Jeudi', 'Vendredi', 'Samedi',
  ];
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SessionDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { sessionId } = route.params;

  // Try to find in past sessions; fall back to today's session
  const pastMatch = mockPastSessions.find((s) => s.id === sessionId);

  // Build a unified view-model regardless of source
  const session = pastMatch
    ? {
        title: pastMatch.title,
        type: pastMatch.type,
        duration: pastMatch.duration,
        level: null as string | null,
        date: pastMatch.date,
        caloriesBurned: pastMatch.caloriesBurned,
        exercises: null as typeof mockTodaySession.exercises | null,
      }
    : {
        title: mockTodaySession.title,
        type: mockTodaySession.type,
        duration: mockTodaySession.duration,
        level: mockTodaySession.level,
        date: new Date().toISOString(),
        caloriesBurned: null as number | null,
        exercises: mockTodaySession.exercises,
      };

  return (
    <Screen scroll>
      <View style={styles.content}>

        {/* ── Back button ── */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>

        {/* ── Title ── */}
        <Text style={styles.title}>{session.title}</Text>

        {/* ── Pills row ── */}
        <View style={styles.pillRow}>
          <Pill label={session.type} />
          <Pill label={`${session.duration} min`} />
          {session.level && <Pill label={session.level} />}
        </View>

        {/* ── Date ── */}
        <Text style={styles.date}>{formatFullDate(session.date)}</Text>

        {/* ── Calories ── */}
        {session.caloriesBurned !== null && (
          <Card style={styles.statCard}>
            <Text style={styles.statEmoji}>{'🔥'}</Text>
            <View>
              <Text style={styles.statValue}>
                {session.caloriesBurned} kcal
              </Text>
              <Text style={styles.statLabel}>Calories brûlées</Text>
            </View>
          </Card>
        )}

        {/* ── Exercise list ── */}
        {session.exercises && session.exercises.length > 0 && (
          <View style={styles.exerciseSection}>
            <Text style={styles.sectionTitle}>Exercices</Text>

            {session.exercises.map((ex, index) => (
              <Card key={ex.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseIndex}>{index + 1}</Text>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                </View>

                <View style={styles.exerciseDetails}>
                  <Text style={styles.detailText}>
                    {ex.sets} séries x {ex.reps} reps
                  </Text>
                  {ex.weight > 0 && (
                    <Text style={styles.detailText}>{ex.weight} kg</Text>
                  )}
                </View>

                {ex.tips ? (
                  <Text style={styles.tips}>{ex.tips}</Text>
                ) : null}
              </Card>
            ))}
          </View>
        )}

        {/* ── Fallback when viewing a past session without exercises ── */}
        {!session.exercises && (
          <Card style={styles.noExercisesCard}>
            <Text style={styles.noExercisesText}>
              Le détail des exercices n'est pas disponible pour cette séance.
            </Text>
          </Card>
        )}
      </View>
    </Screen>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: spacing['3xl'],
  },

  /* Back */
  backButton: {
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingRight: spacing.md,
  },
  backArrow: {
    fontSize: 24,
    color: colors.text,
  },

  /* Header */
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  pillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  date: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },

  /* Stat card */
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statEmoji: {
    fontSize: 28,
  },
  statValue: {
    ...typography.h2,
    color: colors.text,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  /* Exercises */
  exerciseSection: {
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
  },
  exerciseCard: {
    gap: spacing.sm,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  exerciseIndex: {
    ...typography.caption,
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  exerciseName: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingLeft: 36,
  },
  detailText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  tips: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingLeft: 36,
    lineHeight: 18,
  },

  /* Empty state */
  noExercisesCard: {
    marginTop: spacing.xl,
  },
  noExercisesText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
