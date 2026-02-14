import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { SecondaryButton } from '../../components/SecondaryButton';
import { SegmentControl } from '../../components/SegmentControl';
import { SimpleBarChart } from '../../components/SimpleBarChart';
import { SimpleLineChart } from '../../components/SimpleLineChart';
import { BodyMap } from '../../components/BodyMap';
import { ProgressBar } from '../../components/ProgressBar';
import { Modal } from '../../components/Modal';
import {
  weeklyData,
  monthlyData,
  bodyParts,
  weightHistory,
  streak,
} from '../../mocks/mockStats';
import { useStorage } from '../../hooks/useStorage';
import { haptic } from '../../utils/haptics';
import { colors } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

const radius = {
  card: 20,
  cta: 30,
  pill: 14,
};

const typography = {
  h1: { fontSize: 28, fontWeight: '600' as const },
  h2: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
};

const CHART_WIDTH = SCREEN_WIDTH - spacing.xl * 2;

const RING_SIZE = 120;
const RING_STROKE = 10;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const OBJECTIVE_PERCENT = 0.68;

const segments = ['Semaine', 'Mois'];

// ---------------------------------------------------------------------------
// Dot scale indicator
// ---------------------------------------------------------------------------
function DotScale({
  total,
  filled,
  activeColor,
}: {
  total: number;
  filled: number;
  activeColor: string;
}) {
  return (
    <View style={styles.dotRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i < filled ? activeColor : colors.surfaceLight },
          ]}
        />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------
export function StatsScreen() {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [weightSaved, setWeightSaved] = useState(false);
  const [weightEntries, setWeightEntries] = useStorage<
    { date: string; value: number }[]
  >('weightEntries', []);

  const isWeekly = segmentIndex === 0;

  const minutesChartData = useMemo(
    () =>
      isWeekly
        ? weeklyData.map((d) => ({ label: d.day, value: d.minutes }))
        : monthlyData.map((d) => ({ label: d.week, value: d.minutes })),
    [isWeekly],
  );

  const caloriesChartData = useMemo(
    () =>
      isWeekly
        ? weeklyData.map((d) => ({ label: d.day, value: d.calories }))
        : monthlyData.map((d) => ({ label: d.week, value: d.calories })),
    [isWeekly],
  );

  const totalCalories = useMemo(
    () =>
      isWeekly
        ? weeklyData.reduce((sum, d) => sum + d.calories, 0)
        : monthlyData.reduce((sum, d) => sum + d.calories, 0),
    [isWeekly],
  );

  const weightChartData = useMemo(
    () => weightHistory.map((w) => ({ label: w.date, value: w.value })),
    [],
  );

  // Weight submission
  const handleWeightSubmit = () => {
    const parsed = parseFloat(weightInput.replace(',', '.'));
    if (isNaN(parsed) || parsed <= 0) return;

    const entry = { date: new Date().toISOString().slice(0, 10), value: parsed };
    setWeightEntries([...(weightEntries ?? []), entry]);
    haptic.medium();
    setWeightInput('');
    setWeightSaved(true);
    setTimeout(() => {
      setWeightSaved(false);
      setWeightModalVisible(false);
    }, 1200);
  };

  // Progress ring offset
  const strokeDashoffset =
    RING_CIRCUMFERENCE - RING_CIRCUMFERENCE * OBJECTIVE_PERCENT;

  return (
    <Screen>
      {/* ── Header ─────────────────────────────────────────────── */}
      <Text style={[typography.h1, styles.header]}>Statistiques</Text>

      {/* ── Segment control ────────────────────────────────────── */}
      <View style={styles.segmentWrapper}>
        <SegmentControl
          segments={segments}
          activeIndex={segmentIndex}
          onChange={(i: number) => {
            haptic.light();
            setSegmentIndex(i);
          }}
        />
      </View>

      {/* ── Streak card ────────────────────────────────────────── */}
      <Card style={styles.card}>
        <Text style={[typography.h2, styles.cardTitle]}>Ponctualité</Text>
        <View style={styles.streakRow}>
          <Text style={styles.streakBig}>{streak.current}</Text>
          <Text style={styles.streakLabel}>jours consécutifs</Text>
        </View>
        <Text style={[typography.caption, styles.streakCaption]}>
          {streak.best} record
        </Text>
        <SimpleBarChart data={minutesChartData} />
      </Card>

      {/* ── Calories card ──────────────────────────────────────── */}
      <Card style={styles.card}>
        <Text style={[typography.h2, styles.cardTitle]}>Calories brûlées</Text>
        <Text style={styles.totalCalories}>
          {totalCalories.toLocaleString()} kcal
        </Text>
        <SimpleLineChart data={caloriesChartData} width={CHART_WIDTH} />
      </Card>

      {/* ── Body map card ──────────────────────────────────────── */}
      <Card style={styles.card}>
        <Text style={[typography.h2, styles.cardTitle]}>Muscles travaillés</Text>
        <BodyMap parts={bodyParts} />
        <View style={styles.bodyList}>
          {bodyParts.map((part) => (
            <View key={part.name} style={styles.bodyRow}>
              <Text style={[typography.body, styles.bodyName]}>{part.name}</Text>
              <View style={styles.bodyBarWrapper}>
                <ProgressBar progress={part.percentage / 100} />
              </View>
              <Text style={[typography.caption, styles.bodyPercent]}>
                {part.percentage}%
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* ── Weight card ────────────────────────────────────────── */}
      <Card style={styles.card}>
        <Text style={[typography.h2, styles.cardTitle]}>Poids</Text>
        <SimpleLineChart data={weightChartData} width={CHART_WIDTH} />
        <View style={styles.weightCta}>
          <SecondaryButton
            label="Ajouter"
            onPress={() => {
              haptic.light();
              setWeightModalVisible(true);
            }}
          />
        </View>
      </Card>

      {/* Weight modal */}
      <Modal
        visible={weightModalVisible}
        onClose={() => {
          setWeightModalVisible(false);
          setWeightInput('');
          setWeightSaved(false);
        }}
      >
        <Text style={[typography.h2, styles.modalTitle]}>Nouveau poids</Text>
        <TextInput
          style={styles.weightInput}
          placeholder="Ex: 75.2"
          placeholderTextColor={colors.textMuted}
          keyboardType="numeric"
          value={weightInput}
          onChangeText={setWeightInput}
        />
        {weightSaved ? (
          <Text style={styles.savedFeedback}>Enregistré !</Text>
        ) : (
          <PrimaryCTA label="Enregistrer" onPress={handleWeightSubmit} />
        )}
      </Modal>

      {/* ── Objective card ─────────────────────────────────────── */}
      <Card style={styles.card}>
        <Text style={[typography.h2, styles.cardTitle]}>Objectif</Text>
        <View style={styles.ringContainer}>
          <Svg width={RING_SIZE} height={RING_SIZE}>
            {/* Background circle */}
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={colors.surfaceLight}
              strokeWidth={RING_STROKE}
              fill="none"
            />
            {/* Foreground arc */}
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              stroke={colors.accent}
              strokeWidth={RING_STROKE}
              fill="none"
              strokeDasharray={`${RING_CIRCUMFERENCE}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
            />
          </Svg>
          <Text style={styles.ringPercent}>68%</Text>
        </View>
        <Text style={[typography.caption, styles.objectiveCaption]}>
          Prise de masse
        </Text>
      </Card>

      {/* ── Bonus: Charge perçue ───────────────────────────────── */}
      <Card style={styles.card}>
        <Text style={[typography.h2, styles.cardTitle]}>Charge perçue</Text>
        <Text style={[typography.caption, styles.bonusCaption]}>
          Intensité ressentie cette semaine
        </Text>
        <DotScale total={5} filled={3} activeColor={colors.warning} />
      </Card>

      {/* ── Bonus: Récupération ────────────────────────────────── */}
      <Card style={styles.card}>
        <Text style={[typography.h2, styles.cardTitle]}>Récupération</Text>
        <Text style={[typography.caption, styles.bonusCaption]}>
          Niveau de récupération estimé
        </Text>
        <DotScale total={5} filled={4} activeColor={colors.success} />
      </Card>
    </Screen>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  header: {
    color: colors.text,
    marginBottom: spacing.lg,
  },

  segmentWrapper: {
    marginBottom: spacing.xl,
  },

  card: {
    marginBottom: spacing.base,
  },

  cardTitle: {
    color: colors.text,
    marginBottom: spacing.md,
  },

  // Streak
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  streakBig: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.accent,
    marginRight: spacing.sm,
  },
  streakLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  streakCaption: {
    color: colors.textMuted,
    marginBottom: spacing.base,
  },

  // Calories
  totalCalories: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.accentSecondary,
    marginBottom: spacing.md,
  },

  // Body map
  bodyList: {
    marginTop: spacing.base,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bodyName: {
    color: colors.textSecondary,
    width: 100,
  },
  bodyBarWrapper: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  bodyPercent: {
    color: colors.textMuted,
    width: 40,
    textAlign: 'right',
  },

  // Weight
  weightCta: {
    marginTop: spacing.md,
    alignItems: 'flex-start',
  },
  modalTitle: {
    color: colors.text,
    marginBottom: spacing.base,
  },
  weightInput: {
    backgroundColor: colors.surface,
    color: colors.text,
    ...typography.body,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.base,
  },
  savedFeedback: {
    ...typography.body,
    color: colors.success,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },

  // Objective ring
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.base,
  },
  ringPercent: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  objectiveCaption: {
    color: colors.textMuted,
    textAlign: 'center',
  },

  // Bonus cards
  bonusCaption: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  dotRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
});
