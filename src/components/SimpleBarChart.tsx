import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface BarDataPoint {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarDataPoint[];
  color?: string;
  height?: number;
}

export function SimpleBarChart({
  data,
  color = colors.accent,
  height = 120,
}: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <View style={[styles.container, { height: height + 40 }]}>
      <View style={[styles.barsRow, { height }]}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;

          return (
            <View key={index} style={styles.barColumn}>
              <View style={[styles.barWrapper, { height }]}>
                {item.value > 0 && (
                  <Text style={styles.value}>{item.value}</Text>
                )}
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 20,
    borderRadius: 4,
    minHeight: 2,
  },
  value: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
