import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { SecondaryButton } from '../../components/SecondaryButton';
import { mockTodaySession } from '../../mocks/mockTodaySession';
import { haptic } from '../../utils/haptics';

type MainStackParamList = {
  SessionPreview: undefined;
  SessionExercise: { exerciseIndex: number };
  Rest: { nextExerciseIndex: number };
  SessionEndSurvey: undefined;
  SessionSummary: undefined;
  Tabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Rest'>;
type ScreenRouteProp = RouteProp<MainStackParamList, 'Rest'>;

const colors = {
  background: '#0B1120',
  surface: '#151E2F',
  surfaceLight: '#1C2840',
  accent: '#3B82F6',
  accentSecondary: '#60A5FA',
  text: '#F1F5F9',
  textSecondary: '#B8BCC5',
  textMuted: '#6B7280',
  border: 'rgba(255,255,255,0.06)',
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

const radius = { card: 20, cta: 30, pill: 14 };

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const RestScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { nextExerciseIndex } = route.params;

  const [timeLeft, setTimeLeft] = useState(90);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasNavigated = useRef(false);

  const nextExercise = mockTodaySession.exercises[nextExerciseIndex];

  const goToNextExercise = useCallback(() => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    navigation.navigate('SessionExercise', {
      exerciseIndex: nextExerciseIndex,
    });
  }, [navigation, nextExerciseIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          haptic.success();
          setTimeout(() => goToNextExercise(), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goToNextExercise]);

  const addTime = () => {
    setTimeLeft((prev) => prev + 15);
  };

  const handleSkip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToNextExercise();
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        {/* Centered timer area */}
        <View style={styles.centerSection}>
          <Text style={styles.restLabel}>Repos</Text>

          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>

          {/* Controls row */}
          <View style={styles.controlsRow}>
            <SecondaryButton label="+15s" onPress={addTime} />
            <View style={{ width: spacing.md }} />
            <PrimaryCTA label="Passer" onPress={handleSkip} />
            <View style={{ width: spacing.md }} />
            <SecondaryButton label="Reprendre" onPress={handleSkip} />
          </View>
        </View>

        {/* Next exercise preview */}
        {nextExercise && (
          <Card style={styles.previewCard}>
            <Text style={styles.previewLabel}>Prochain exercice</Text>
            <Text style={styles.previewName}>{nextExercise.name}</Text>
            <Text style={styles.previewDetail}>
              {nextExercise.sets}x{nextExercise.reps} · {nextExercise.weight} kg
            </Text>
          </Card>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.base,
    justifyContent: 'space-between',
    paddingBottom: spacing['2xl'],
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing['2xl'],
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  timerText: {
    fontSize: 48,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  previewName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  previewDetail: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
});
