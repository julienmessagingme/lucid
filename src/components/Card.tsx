import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, shadows } from '../theme';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'highlight';
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', style }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'highlight' && styles.highlight,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.base,
    ...shadows.subtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highlight: {
    backgroundColor: colors.surfaceLight,
  },
});
