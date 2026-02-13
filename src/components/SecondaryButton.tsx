import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'outline' | 'ghost';
}

export function SecondaryButton({
  label,
  onPress,
  variant = 'outline',
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, variant === 'outline' && styles.outline]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: radius.cta,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: 'transparent',
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.accent,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
    color: colors.accent,
  },
});
