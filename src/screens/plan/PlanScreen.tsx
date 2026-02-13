import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { Pill } from '../../components/Pill';
import { ProgressBar } from '../../components/ProgressBar';

import { mockUser } from '../../mocks/mockUser';
import { mockPastSessions } from '../../mocks/mockPastSessions';

import { colors, spacing, radius, typography } from '../../theme';
import type { MainStackParamList } from '../../navigation/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type Nav = NativeStackNavigationProp<MainStackParamList>;

const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

const SESSION_TYPES_ROTATION = [
  'Musculation',
  'Cardio',
  null, // rest
  'Musculation',
  'Mobilité',
  'Musculation',
  null, // rest
  'Cardio',
  'Musculation',
  null, // rest
  'Musculation',
  'Mobilité',
  'Cardio',
  null, // rest
] as const;

function buildUpcomingDays(count: number) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay(); // 0 = Sun
    const labelIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return {
      key: `day-${i}`,
      label: DAY_LABELS[labelIndex],
      dateNum: d.getDate(),
      session: SESSION_TYPES_ROTATION[i % SESSION_TYPES_ROTATION.length],
      locked: i > 2,
    };
  });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate();
  const months = [
    'jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin',
    'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
  ];
  return `${day} ${months[d.getMonth()]}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PlanScreen() {
  const navigation = useNavigation<Nav>();
  const upcomingDays = buildUpcomingDays(14);

  return (
    <Screen scroll>
      <View style={styles.content}>

        {/* ── Header ── */}
        <Text style={styles.title}>Plan</Text>

        <View style={styles.progressSection}>
          <ProgressBar
            progress={mockUser.planProgress}
            label={`Semaine ${mockUser.currentWeek}/${mockUser.totalWeeks}`}
          />
          <Text style={styles.progressCaption}>42% complété</Text>
        </View>

        {/* ── Upcoming days ── */}
        <Text style={styles.sectionTitle}>À venir</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayStrip}
          style={styles.dayStripContainer}
        >
          {upcomingDays.map((day) => {
            const isRest = day.session === null;
            const inner = (
              <View
                key={day.key}
                style={[
                  styles.dayCard,
                  day.locked && styles.dayCardLocked,
                ]}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    day.locked && styles.dayLabelLocked,
                  ]}
                >
                  {day.label}
                </Text>
                <Text
                  style={[
                    styles.dayDate,
                    day.locked && styles.dayDateLocked,
                  ]}
                >
                  {day.dateNum}
                </Text>
                <Text
                  style={[
                    styles.dayType,
                    day.locked && styles.dayTypeLocked,
                    isRest && styles.dayTypeRest,
                  ]}
                >
                  {isRest ? 'Repos' : day.session}
                </Text>
                {day.locked && <Text style={styles.lockIcon}>{'🔒'}</Text>}
              </View>
            );

            if (day.locked) {
              return (
                <View key={day.key} style={{ opacity: 0.4 }}>
                  {inner}
                </View>
              );
            }

            return (
              <TouchableOpacity
                key={day.key}
                activeOpacity={0.7}
                onPress={() => {
                  /* unlocked days could navigate to a preview in future */
                }}
              >
                {inner}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Past sessions ── */}
        <Text style={[styles.sectionTitle, styles.sectionSpacing]}>
          Séances passées
        </Text>

        {mockPastSessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('SessionDetail', { sessionId: session.id })
            }
          >
            <Card style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <Text style={styles.sessionTitle} numberOfLines={1}>
                  {session.title}
                </Text>
                {session.badge && (
                  <Text style={styles.badge}>{session.badge}</Text>
                )}
              </View>

              <View style={styles.sessionMeta}>
                <Pill label={session.type} />
                <Text style={styles.sessionDate}>
                  {formatDate(session.date)}
                </Text>
                <Text style={styles.sessionDuration}>
                  {session.duration} min
                </Text>
              </View>

              <View style={styles.sessionFooter}>
                <Text
                  style={[
                    styles.completedIndicator,
                    {
                      color: session.completed
                        ? colors.success
                        : colors.danger,
                    },
                  ]}
                >
                  {session.completed ? '✓ Terminée' : '✗ Incomplète'}
                </Text>
                <Text style={styles.chevron}>{'›'}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* ── Bottom Cards ── */}
        <View style={styles.bottomCards}>
          <Card style={styles.insightCard}>
            <Text style={styles.insightEmoji}>{'🧠'}</Text>
            <Text style={styles.insightTitle}>Ce que Lucid retient</Text>
            <Text style={styles.insightBody}>
              Lucid analyse tes performances, ta fatigue et tes préférences
              pour adapter chaque semaine de ton plan. Plus tu t'entraînes,
              plus le programme te ressemble.
            </Text>
          </Card>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Preferences')}
          >
            <Card style={styles.prefCard}>
              <View style={styles.prefRow}>
                <Text style={styles.prefTitle}>Mes préférences</Text>
                <Text style={styles.chevron}>{'›'}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
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
    paddingTop: spacing.base,
    paddingBottom: spacing['3xl'],
  },

  /* Header */
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.base,
  },
  progressSection: {
    marginBottom: spacing.xl,
  },
  progressCaption: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  /* Section titles */
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionSpacing: {
    marginTop: spacing.xl,
  },

  /* Day strip */
  dayStripContainer: {
    marginBottom: spacing.sm,
    marginHorizontal: -spacing.base,
  },
  dayStrip: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  dayCard: {
    width: 80,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  dayCardLocked: {
    backgroundColor: colors.surface,
  },
  dayLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  dayLabelLocked: {
    color: colors.textMuted,
  },
  dayDate: {
    ...typography.h2,
    color: colors.text,
  },
  dayDateLocked: {
    color: colors.textMuted,
  },
  dayType: {
    ...typography.caption,
    color: colors.accent,
    fontSize: 11,
    textAlign: 'center',
  },
  dayTypeLocked: {
    color: colors.textMuted,
  },
  dayTypeRest: {
    color: colors.textSecondary,
  },
  lockIcon: {
    fontSize: 12,
    marginTop: 2,
  },

  /* Past sessions */
  sessionCard: {
    marginBottom: spacing.md,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sessionTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  badge: {
    ...typography.caption,
    fontSize: 12,
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sessionDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  sessionDuration: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  sessionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedIndicator: {
    ...typography.caption,
  },
  chevron: {
    fontSize: 24,
    color: colors.textMuted,
  },

  /* Bottom cards */
  bottomCards: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  insightCard: {
    gap: spacing.sm,
  },
  insightEmoji: {
    fontSize: 28,
  },
  insightTitle: {
    ...typography.h2,
    color: colors.text,
  },
  insightBody: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  prefCard: {},
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prefTitle: {
    ...typography.h2,
    color: colors.text,
  },
});
