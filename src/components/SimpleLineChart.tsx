import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';
import { colors, typography } from '../theme';

interface LineDataPoint {
  label: string;
  value: number;
}

interface SimpleLineChartProps {
  data: LineDataPoint[];
  color?: string;
  height?: number;
  width?: number;
}

export function SimpleLineChart({
  data,
  color = colors.accent,
  height = 120,
  width = 300,
}: SimpleLineChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const paddingTop = 16;
  const paddingBottom = 24;
  const chartHeight = height - paddingTop - paddingBottom;
  const paddingLeft = 8;
  const paddingRight = 8;
  const chartWidth = width - paddingLeft - paddingRight;

  const points = data.map((item, index) => {
    const x =
      data.length > 1
        ? paddingLeft + (index / (data.length - 1)) * chartWidth
        : paddingLeft + chartWidth / 2;
    const y = paddingTop + chartHeight - (item.value / maxValue) * chartHeight;
    return { x, y };
  });

  const pathData = points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command}${point.x},${point.y}`;
    })
    .join(' ');

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Path
          d={pathData}
          stroke={color}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, index) => (
          <Circle
            key={`dot-${index}`}
            cx={point.x}
            cy={point.y}
            r={3.5}
            fill={color}
            stroke={colors.surface}
            strokeWidth={1.5}
          />
        ))}
        {data.map((item, index) => (
          <SvgText
            key={`label-${index}`}
            x={points[index].x}
            y={height - 4}
            fontSize={typography.caption.fontSize}
            fontWeight={typography.caption.fontWeight}
            fill={colors.textMuted}
            textAnchor="middle"
          >
            {item.label}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
