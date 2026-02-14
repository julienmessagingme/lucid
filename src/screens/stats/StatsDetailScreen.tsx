import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { SimpleBarChart } from '../../components/SimpleBarChart';
import { SimpleLineChart } from '../../components/SimpleLineChart';
import {
  weeklyData,
  monthlyData,
  bodyParts,
  weightHistory,
  streak,
} from '../../mocks/mockStats';
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

const typography = {
  h1: { fontSize: 28, fontWeight: '600' as const },
  h2: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
};

const CHART_WIDTH = SCREEN_WIDTH - spacing.xl * 2;
const LARGE_CHART_HEIGHT = 260;

type CategoryKey = 'streak' | 'calories' | 'bodyParts' | 'weight';

const CATEGORY_TITLES: Record<CategoryKey, string> = {
  streak: 'Ponctualité',
  calories: 'Calories brûlées',
  bodyParts: 'Muscles travaillés',
  weight: 'Poids',
};

export function StatsDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const category: CategoryKey = route.params?.category ?? 'streak';

  const title = CATEGORY_TITLES[category] ?? category;

  // ── Chart data ────────────────────────────────────────────
  const minutesWeekly = useMemo(
    () => weeklyData.map((d) => ({ label: d.day, value: d.minutes })),
    [],
  );

  const minutesMonthly = useMemo(
    () => monthlyData.map((d) => ({ label: d.week, value: d.minutes })),
    [],
  );

  const caloriesWeekly = useMemo(
    () => weeklyData.map((d) => ({ label: d.day, value: d.calories })),
    [],
  );

  const caloriesMonthly = useMemo(
    () => monthlyData.map((d) => ({ label: d.week, value: d.calories })),
    [],
  );

  const weightData = useMemo(
    () => weightHistory.map((w) => ({ label: w.date, value: w.value })),
    [],
  );

  const totalCaloriesWeekly = useMemo(
    () => weeklyData.reduce((s, d) => s + d.calories, 0),
    [],
  );

  const totalCaloriesMonthly = useMemo(
    () => monthlyData.reduce((s, d) => s + d.calories, 0),
    [],
  );

  // ── Render helpers per category ───────────────────────────
  const renderContent = () => {
    switch (category) {
      case 'streak':
        return (
          <>
            <Card style={styles.card}>
              <Text style={[typography.h2, styles.sectionTitle]}>Semaine</Text>
              <View style={styles.statRow}>
                <View style={styles.statBlock}>
                  <Text style={styles.statValue}>{streak.current}</Text>
                  <Text style={[typography.caption, styles.statLabel]}>
                    jours consécutifs
                  </Text>
                </View>
                <View style={styles.statBlock}>
                  <Text style={styles.statValue}>{streak.best}</Text>
                  <Text style={[typography.caption, styles.statLabel]}>
                    record
                  </Text>
                </View>
                <View style={styles.statBlock}>
                  <Text style={styles.statValue}>{streak.thisWeek}</Text>
                  <Text style={[typography.caption, styles.statLabel]}>
                    cette semaine
                  </Text>
                </View>
              </View>
              <SimpleBarChart
                data={minutesWeekly}
                height={LARGE_CHART_HEIGHT}
              />
            </Card>
            <Card style={styles.card}>
              <Text style={[typography.h2, styles.sectionTitle]}>Mois</Text>
              <SimpleBarChart
                data={minutesMonthly}
                height={LARGE_CHART_HEIGHT}
              />
            </Card>
          </>
        );

      case 'calories':
        return (
          <>
            <Card style={styles.card}>
              <Text style={[typography.h2, styles.sectionTitle]}>Semaine</Text>
              <Text style={styles.bigNumber}>
                {totalCaloriesWeekly.toLocaleString()} kcal
              </Text>
              <SimpleLineChart
                data={caloriesWeekly}
                width={CHART_WIDTH}
                height={LARGE_CHART_HEIGHT}
              />
            </Card>
            <Card style={styles.card}>
              <Text style={[typography.h2, styles.sectionTitle]}>Mois</Text>
              <Text style={styles.bigNumber}>
                {totalCaloriesMonthly.toLocaleString()} kcal
              </Text>
              <SimpleLineChart
                data={caloriesMonthly}
                width={CHART_WIDTH}
                height={LARGE_CHART_HEIGHT}
              />
            </Card>
          </>
        );

      case 'bodyParts':
        return (
          <Card style={styles.card}>
            <Text style={[typography.h2, styles.sectionTitle]}>
              Répartition par muscle
            </Text>
            {bodyParts.map((part) => (
              <View key={part.name} style={styles.bodyRow}>
                <Text style={[typography.body, styles.bodyName]}>
                  {part.name}
                </Text>
                <View style={styles.detailBarOuter}>
                  <View
                    style={[
                      styles.detailBarInner,
                      { width: `${part.percentage}%` },
                    ]}
                  />
                </View>
                <Text style={[typography.caption, styles.bodyPercent]}>
                  {part.percentage}%
                </Text>
              </View>
            ))}
          </Card>
        );

      case 'weight':
        return (
          <Card style={styles.card}>
            <Text style={[typography.h2, styles.sectionTitle]}>
              Historique de poids
            </Text>
            <SimpleLineChart
              data={weightData}
              width={CHART_WIDTH}
              height={LARGE_CHART_HEIGHT}
            />
            <View style={styles.weightMeta}>
              {weightHistory.length > 0 && (
                <>
                  <Text style={[typography.body, styles.metaText]}>
                    Dernier relevé :{' '}
                    {weightHistory[weightHistory.length - 1].value} kg
                  </Text>
                  <Text style={[typography.caption, styles.metaCaption]}>
                    {weightHistory[weightHistory.length - 1].date}
                  </Text>
                </>
              )}
            </View>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Screen>
      {/* ── Header with back button ──────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            haptic.medium();
            navigation.goBack();
          }}
          style={styles.backButton}
          accessibilityLabel="Retour"
          accessibilityRole="button"
        >
          <Text style={styles.backArrow}>{'\u2190'}</Text>
        </TouchableOpacity>
        <Text style={[typography.h1, styles.headerTitle]}>{title}</Text>
      </View>

      {renderContent()}
    </Screen>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  backArrow: {
    fontSize: 20,
    color: colors.text,
  },
  headerTitle: {
    color: colors.text,
    flex: 1,
  },

  card: {
    marginBottom: spacing.base,
  },

  sectionTitle: {
    color: colors.text,
    marginBottom: spacing.md,
  },

  // Streak stats
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.accent,
  },
  statLabel: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  // Calories
  bigNumber: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.accentSecondary,
    marginBottom: spacing.md,
  },

  // Body parts
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bodyName: {
    color: colors.textSecondary,
    width: 110,
  },
  detailBarOuter: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  detailBarInner: {
    height: 8,
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  bodyPercent: {
    color: colors.textMuted,
    width: 44,
    textAlign: 'right',
  },

  // Weight
  weightMeta: {
    marginTop: spacing.base,
  },
  metaText: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  metaCaption: {
    color: colors.textMuted,
  },
});
