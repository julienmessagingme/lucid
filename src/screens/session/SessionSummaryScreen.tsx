import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { SecondaryButton } from '../../components/SecondaryButton';
import { Pill } from '../../components/Pill';
import { mockTodaySession } from '../../mocks/mockTodaySession';
import { colors } from '../../theme';

type MainStackParamList = {
  SessionPreview: undefined;
  SessionExercise: { exerciseIndex: number };
  Rest: { nextExerciseIndex: number };
  SessionEndSurvey: undefined;
  SessionSummary: undefined;
  Tabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'SessionSummary'>;

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

const session = mockTodaySession;

type StatRow = {
  label: string;
  value: string;
  isPill?: boolean;
};

const stats: StatRow[] = [
  { label: 'Durée', value: `${session.duration} min` },
  { label: 'Exercices', value: `${session.exercises.length}/${session.exercises.length}` },
  { label: 'Calories', value: '~320 kcal' },
  { label: 'Type', value: session.type, isPill: true },
];

export const SessionSummaryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleGoHome = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
  };

  const handleViewStats = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
  };

  return (
    <Screen>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Bien joué.</Text>
          <Text style={styles.heroSubtext}>
            Tu viens de compléter ta séance. Continue comme ça !
          </Text>
        </View>

        {/* Summary card */}
        <Card style={styles.summaryCard}>
          {stats.map((stat, index) => (
            <View
              key={stat.label}
              style={[
                styles.statRow,
                index < stats.length - 1 && styles.statRowBorder,
              ]}
            >
              <Text style={styles.statLabel}>{stat.label}</Text>
              {stat.isPill ? (
                <Pill label={stat.value} />
              ) : (
                <Text style={styles.statValue}>{stat.value}</Text>
              )}
            </View>
          ))}
        </Card>

        {/* Badge */}
        <Card style={styles.badgeCard}>
          <Text style={styles.badgeText}>
            🔥 Nouvelle série de 5 jours !
          </Text>
        </Card>

        {/* Buttons */}
        <View style={styles.bottomSection}>
          <PrimaryCTA label="Retour à l'accueil" onPress={handleGoHome} />
          <View style={{ height: spacing.md }} />
          <SecondaryButton label="Voir mes stats" onPress={handleViewStats} />
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
    paddingTop: spacing['4xl'],
    paddingBottom: spacing['4xl'],
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  heroSubtext: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.xl,
  },
  summaryCard: {
    marginBottom: spacing.base,
    paddingVertical: spacing.sm,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  statRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  badgeCard: {
    marginBottom: spacing['2xl'],
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.accent,
  },
  bottomSection: {
    marginTop: spacing.sm,
  },
});
