import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export interface ScheduleSession {
  id: string;
  title: string;
  type: string;
  duration: number;
  dayLabel: string;
  dateNumber: string;
  status: 'completed' | 'today' | 'upcoming';
  badge?: string;
}

interface SessionScheduleProps {
  sessions: ScheduleSession[];
  onPress: (session: ScheduleSession) => void;
}

export function SessionSchedule({ sessions, onPress }: SessionScheduleProps) {
  return (
    <View style={styles.container}>
      {/* ── Week strip row ── */}
      <View style={styles.strip}>
        {sessions.map((session) => {
          const isToday = session.status === 'today';
          const isCompleted = session.status === 'completed';

          return (
            <TouchableOpacity
              key={session.id}
              style={[
                styles.dayCard,
                isToday && styles.dayCardToday,
              ]}
              activeOpacity={0.7}
              onPress={() => onPress(session)}
              accessibilityRole="button"
              accessibilityLabel={`${session.title}, ${session.dayLabel} ${session.dateNumber}`}
            >
              {/* Day label */}
              <Text style={[styles.dayLabel, isToday && styles.dayLabelActive]}>
                {session.dayLabel}
              </Text>

              {/* Date circle */}
              <View
                style={[
                  styles.dateCircle,
                  isToday && styles.dateCircleToday,
                  isCompleted && styles.dateCircleCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.dateNumber,
                    (isToday || isCompleted) && styles.dateNumberActive,
                  ]}
                >
                  {session.dateNumber}
                </Text>
              </View>

              {/* Session type */}
              <Text
                style={[styles.typeLabel, isToday && styles.typeLabelActive]}
                numberOfLines={1}
              >
                {session.type}
              </Text>

              {/* Duration */}
              <Text style={styles.durationLabel}>{session.duration}′</Text>

              {/* Status indicator */}
              {isCompleted && <Text style={styles.statusIcon}>✓</Text>}
              {isToday && (
                <View style={styles.todayDot} />
              )}
              {session.status === 'upcoming' && (
                <View style={styles.upcomingDot} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  strip: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  dayCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  dayCardToday: {
    backgroundColor: 'rgba(59,130,246,0.1)',
    borderColor: colors.accent,
  },

  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dayLabelActive: {
    color: colors.accent,
  },

  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dateCircleToday: {
    backgroundColor: colors.accent,
  },
  dateCircleCompleted: {
    backgroundColor: colors.success,
  },

  dateNumber: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  dateNumberActive: {
    color: '#fff',
  },

  typeLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
  },
  typeLabelActive: {
    color: colors.accent,
  },

  durationLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '500',
  },

  statusIcon: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '700',
  },

  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },

  upcomingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
    backgroundColor: 'transparent',
  },
});
