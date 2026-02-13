import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

interface DailyQuoteBarProps {
  quote: string;
  onPress: () => void;
}

export function DailyQuoteBar({ quote, onPress }: DailyQuoteBarProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>✦</Text>
      <Text style={styles.quote} numberOfLines={1}>
        {quote}
      </Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.card,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
  },
  icon: {
    fontSize: 16,
    color: colors.accent,
    marginRight: spacing.md,
  },
  quote: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  chevron: {
    fontSize: 20,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
});
