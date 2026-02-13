import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface MiniCalendarProps {
  activeDays: number[];
  today: number;
}

export function MiniCalendar({ activeDays, today }: MiniCalendarProps) {
  return (
    <View style={styles.container}>
      {DAY_LABELS.map((label, index) => {
        const isActive = activeDays.includes(index);
        const isToday = index === today;

        return (
          <View key={index} style={styles.dayColumn}>
            <Text style={styles.label}>{label}</Text>
            <View
              style={[
                styles.circle,
                isActive && styles.circleActive,
                isToday && styles.circleToday,
              ]}
            >
              {isActive && <View style={styles.dot} />}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayColumn: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  circleActive: {
    backgroundColor: colors.accent,
  },
  circleToday: {
    borderWidth: 1.5,
    borderColor: colors.accentSecondary,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text,
  },
});
