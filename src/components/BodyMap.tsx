import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Ellipse,
  Rect,
  Path,
  Text as SvgText,
  G,
} from 'react-native-svg';
import { colors, typography } from '../theme';

interface BodyPart {
  name: string;
  percentage: number;
}

interface BodyMapProps {
  parts: BodyPart[];
}

const ZONE_MAP: Record<string, string> = {
  head: 'head',
  shoulders: 'shoulders',
  chest: 'chest',
  back: 'chest',
  abs: 'abs',
  arms: 'arms',
  legs: 'legs',
};

function getZonePercentage(parts: BodyPart[], zone: string): number {
  const matching = parts.filter(
    (p) => ZONE_MAP[p.name.toLowerCase()] === zone || p.name.toLowerCase() === zone
  );
  if (matching.length === 0) return 0;
  return Math.max(...matching.map((p) => p.percentage));
}

function getOpacity(percentage: number): number {
  if (percentage <= 0) return 0.08;
  return 0.15 + (percentage / 100) * 0.7;
}

export function BodyMap({ parts }: BodyMapProps) {
  const headPct = getZonePercentage(parts, 'head');
  const shouldersPct = getZonePercentage(parts, 'shoulders');
  const chestPct = getZonePercentage(parts, 'chest');
  const absPct = getZonePercentage(parts, 'abs');
  const armsPct = getZonePercentage(parts, 'arms');
  const legsPct = getZonePercentage(parts, 'legs');

  const svgWidth = 280;
  const svgHeight = 340;
  const bodyX = 120;

  return (
    <View style={styles.container}>
      <Svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Head */}
        <Ellipse
          cx={bodyX}
          cy={30}
          rx={18}
          ry={22}
          fill={colors.accent}
          opacity={getOpacity(headPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Neck */}
        <Rect
          x={bodyX - 6}
          y={50}
          width={12}
          height={14}
          fill={colors.accent}
          opacity={getOpacity(shouldersPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Shoulders */}
        <Path
          d={`M${bodyX - 6} 60 L${bodyX - 42} 74 L${bodyX - 42} 82 L${bodyX - 6} 68 Z`}
          fill={colors.accent}
          opacity={getOpacity(shouldersPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />
        <Path
          d={`M${bodyX + 6} 60 L${bodyX + 42} 74 L${bodyX + 42} 82 L${bodyX + 6} 68 Z`}
          fill={colors.accent}
          opacity={getOpacity(shouldersPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Chest / Torso upper */}
        <Rect
          x={bodyX - 34}
          y={80}
          width={68}
          height={54}
          rx={6}
          fill={colors.accent}
          opacity={getOpacity(chestPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Abs / Torso lower */}
        <Rect
          x={bodyX - 30}
          y={134}
          width={60}
          height={44}
          rx={4}
          fill={colors.accent}
          opacity={getOpacity(absPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Left Arm */}
        <Rect
          x={bodyX - 52}
          y={82}
          width={16}
          height={72}
          rx={8}
          fill={colors.accent}
          opacity={getOpacity(armsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />
        {/* Left Forearm */}
        <Rect
          x={bodyX - 50}
          y={154}
          width={14}
          height={50}
          rx={7}
          fill={colors.accent}
          opacity={getOpacity(armsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Right Arm */}
        <Rect
          x={bodyX + 36}
          y={82}
          width={16}
          height={72}
          rx={8}
          fill={colors.accent}
          opacity={getOpacity(armsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />
        {/* Right Forearm */}
        <Rect
          x={bodyX + 36}
          y={154}
          width={14}
          height={50}
          rx={7}
          fill={colors.accent}
          opacity={getOpacity(armsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Left Leg */}
        <Rect
          x={bodyX - 26}
          y={180}
          width={22}
          height={80}
          rx={8}
          fill={colors.accent}
          opacity={getOpacity(legsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />
        {/* Left Calf */}
        <Rect
          x={bodyX - 24}
          y={260}
          width={20}
          height={58}
          rx={8}
          fill={colors.accent}
          opacity={getOpacity(legsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Right Leg */}
        <Rect
          x={bodyX + 4}
          y={180}
          width={22}
          height={80}
          rx={8}
          fill={colors.accent}
          opacity={getOpacity(legsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />
        {/* Right Calf */}
        <Rect
          x={bodyX + 4}
          y={260}
          width={20}
          height={58}
          rx={8}
          fill={colors.accent}
          opacity={getOpacity(legsPct)}
          stroke={colors.textMuted}
          strokeWidth={0.8}
        />

        {/* Labels */}
        <G>
          <SvgText
            x={bodyX + 72}
            y={76}
            fontSize={typography.caption.fontSize}
            fontWeight={typography.caption.fontWeight}
            fill={colors.textSecondary}
          >
            Shoulders {shouldersPct}%
          </SvgText>
          <SvgText
            x={bodyX + 72}
            y={108}
            fontSize={typography.caption.fontSize}
            fontWeight={typography.caption.fontWeight}
            fill={colors.textSecondary}
          >
            Chest {chestPct}%
          </SvgText>
          <SvgText
            x={bodyX + 72}
            y={156}
            fontSize={typography.caption.fontSize}
            fontWeight={typography.caption.fontWeight}
            fill={colors.textSecondary}
          >
            Abs {absPct}%
          </SvgText>
          <SvgText
            x={12}
            y={130}
            fontSize={typography.caption.fontSize}
            fontWeight={typography.caption.fontWeight}
            fill={colors.textSecondary}
            textAnchor="start"
          >
            Arms {armsPct}%
          </SvgText>
          <SvgText
            x={bodyX + 72}
            y={230}
            fontSize={typography.caption.fontSize}
            fontWeight={typography.caption.fontWeight}
            fill={colors.textSecondary}
          >
            Legs {legsPct}%
          </SvgText>
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
