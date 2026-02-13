import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

interface SegmentControlProps {
  segments: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export function SegmentControl({
  segments,
  activeIndex,
  onChange,
}: SegmentControlProps) {
  return (
    <View style={styles.container}>
      {segments.map((segment, index) => {
        const isActive = index === activeIndex;

        return (
          <Pressable
            key={index}
            style={[styles.segment, isActive && styles.segmentActive]}
            onPress={() => onChange(index)}
          >
            <Text
              style={[styles.label, isActive && styles.labelActive]}
            >
              {segment}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: spacing.xs,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.accent,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.text,
  },
});
