import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { SecondaryButton } from '../../components/SecondaryButton';
import { haptic } from '../../utils/haptics';
import { colors } from '../../theme';

type MainStackParamList = {
  SessionPreview: undefined;
  SessionExercise: { exerciseIndex: number };
  Rest: { nextExerciseIndex: number };
  SessionEndSurvey: undefined;
  SessionSummary: undefined;
  Tabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'SessionEndSurvey'>;

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

export const SessionEndSurveyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = () => {
    haptic.success();
    navigation.navigate('SessionSummary');
  };

  const handleSkip = () => {
    navigation.navigate('SessionSummary');
  };

  const renderCircleSelector = (
    value: number | null,
    onSelect: (v: number) => void,
    leftLabel: string,
    rightLabel: string
  ) => (
    <View>
      <View style={styles.circleRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity
            key={n}
            onPress={() => {
              onSelect(n);
              haptic.medium();
            }}
            style={[
              styles.circle,
              value === n && styles.circleSelected,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.circleText,
                value === n && styles.circleTextSelected,
              ]}
            >
              {n}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.labelRow}>
        <Text style={styles.scaleLabel}>{leftLabel}</Text>
        <Text style={styles.scaleLabel}>{rightLabel}</Text>
      </View>
    </View>
  );

  const renderStarSelector = (
    value: number | null,
    onSelect: (v: number) => void
  ) => (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map((n) => (
        <TouchableOpacity
          key={n}
          onPress={() => {
            onSelect(n);
            haptic.medium();
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <Text
            style={[
              styles.star,
              value !== null && n <= value
                ? styles.starFilled
                : styles.starEmpty,
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Comment c'était ?</Text>

        {/* Q1: Difficulty */}
        <Card style={styles.questionCard}>
          <Text style={styles.questionTitle}>Difficulté perçue</Text>
          {renderCircleSelector(
            difficulty,
            setDifficulty,
            'Facile',
            'Difficile'
          )}
        </Card>

        {/* Q2: Energy */}
        <Card style={styles.questionCard}>
          <Text style={styles.questionTitle}>Niveau d'énergie</Text>
          {renderCircleSelector(
            energy,
            setEnergy,
            'Épuisé',
            "Plein d'énergie"
          )}
        </Card>

        {/* Q3: Rating */}
        <Card style={styles.questionCard}>
          <Text style={styles.questionTitle}>Note globale</Text>
          {renderStarSelector(rating, setRating)}
        </Card>

        {/* Buttons */}
        <View style={styles.bottomSection}>
          <PrimaryCTA label="Enregistrer" onPress={handleSubmit} />
          <View style={{ height: spacing.md }} />
          <SecondaryButton label="Passer" onPress={handleSkip} />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['4xl'],
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  questionCard: {
    marginBottom: spacing.base,
    paddingVertical: spacing.lg,
  },
  questionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.surfaceLight,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  circleText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  circleTextSelected: {
    color: '#FFFFFF',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    marginTop: spacing.sm,
  },
  scaleLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  star: {
    fontSize: 36,
  },
  starFilled: {
    color: colors.warning,
  },
  starEmpty: {
    color: colors.surfaceLight,
  },
  bottomSection: {
    marginTop: spacing['2xl'],
  },
});
