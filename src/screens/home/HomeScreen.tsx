import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { Pill } from '../../components/Pill';
import { ProgressBar } from '../../components/ProgressBar';
import { MiniStat } from '../../components/MiniStat';
import { MiniCalendar } from '../../components/MiniCalendar';
import { DailyQuoteBar } from '../../components/DailyQuoteBar';
import { Avatar } from '../../components/Avatar';
import { Skeleton } from '../../components/Skeleton';

import { mockTodaySession } from '../../mocks/mockTodaySession';
import { mockQuotes } from '../../mocks/mockQuotes';
import { mockUser } from '../../mocks/mockUser';

import { haptic } from '../../utils/haptics';
import { colors, spacing, radius, typography } from '../../theme';

import { QuoteModal } from './QuoteModal';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const todayDayIndex = new Date().getDay();
  // MiniCalendar uses 0=L(Mon) through 6=D(Sun), so map JS getDay (0=Sun) accordingly
  const calendarToday = todayDayIndex === 0 ? 6 : todayDayIndex - 1;

  const handleStartSession = () => {
    haptic.medium();
    navigation.navigate('SessionPreview');
  };

  return (
    <Screen scroll>
      <View style={styles.content}>
        {/* ── Header Row ── */}
        <View style={styles.headerRow}>
          <Text style={styles.brandTitle}>Lucid</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => Alert.alert('Notifications', 'Aucune nouvelle notification.')}
              style={styles.bellButton}
              activeOpacity={0.7}
            >
              <Text style={styles.bellIcon}>{'🔔'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.7}
            >
              <Avatar initials={mockUser.initials} size={36} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Stats Row ── */}
        {loading ? (
          <View style={styles.statsRow}>
            <Skeleton width={'48%'} height={100} radius={radius.card} />
            <Skeleton width={'48%'} height={100} radius={radius.card} />
          </View>
        ) : (
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <MiniStat
                icon={<Text style={styles.statEmoji}>{'🔥'}</Text>}
                value="5 jours"
                label="Série en cours"
              />
            </Card>
            <Card style={styles.statCard}>
              <View style={styles.weekProgress}>
                <ProgressBar
                  progress={mockUser.currentWeek / mockUser.weeklyTarget}
                  label={`${mockUser.currentWeek}/${mockUser.weeklyTarget}`}
                />
                <Text style={styles.weekLabel}>séances cette semaine</Text>
              </View>
            </Card>
          </View>
        )}

        {/* ── Session Card ── */}
        {loading ? (
          <Skeleton
            width={'100%'}
            height={200}
            radius={radius.card}
            style={styles.sectionSpacing}
          />
        ) : (
          <Card style={styles.sectionSpacing}>
            <MiniCalendar
              activeDays={[0, 1, 3, 4]}
              today={calendarToday}
            />

            <View style={styles.divider} />

            <TouchableOpacity
              onPress={handleStartSession}
              activeOpacity={0.7}
              style={styles.sessionRow}
            >
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>{mockTodaySession.title}</Text>
                <View style={styles.pillRow}>
                  <Pill label={mockTodaySession.type} />
                  <Pill label={`${mockTodaySession.duration} min`} />
                  <Pill label={mockTodaySession.level} />
                </View>
              </View>
              <Text style={styles.chevron}>{'›'}</Text>
            </TouchableOpacity>
          </Card>
        )}

        {/* ── Branding Card ── */}
        <Card variant="highlight" style={styles.sectionSpacing}>
          <LinearGradient
            colors={['rgba(59,130,246,0.08)', 'rgba(96,165,250,0.04)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.brandingGradient}
          >
            <Text style={styles.brandingText}>
              Respire. Tu es en contrôle.
            </Text>
          </LinearGradient>
        </Card>

        {/* ── Daily Quote ── */}
        <View style={styles.sectionSpacing}>
          <DailyQuoteBar
            quote={mockQuotes[0].text}
            onPress={() => setQuoteVisible(true)}
          />
        </View>

        {/* ── CTA ── */}
        <View style={styles.ctaSection}>
          <PrimaryCTA
            label="Commencer ma séance"
            onPress={handleStartSession}
          />
          <Text style={styles.ctaSubtext}>
            {mockTodaySession.duration} min · {mockTodaySession.exercises.length} exercices
          </Text>
        </View>
      </View>

      {/* ── Quote Modal ── */}
      <QuoteModal visible={quoteVisible} onClose={() => setQuoteVisible(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: spacing['3xl'],
  },

  /* Header */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  brandTitle: {
    ...typography.h2,
    color: colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bellButton: {
    padding: spacing.xs,
  },
  bellIcon: {
    fontSize: 20,
  },

  /* Stats Row */
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.base,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  statEmoji: {
    fontSize: 24,
  },
  weekProgress: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
  },
  weekLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  /* Section spacing */
  sectionSpacing: {
    marginBottom: spacing.base,
  },

  /* Session Card */
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chevron: {
    fontSize: 28,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },

  /* Branding Card */
  brandingGradient: {
    borderRadius: radius.card,
    padding: spacing.xs,
  },
  brandingText: {
    ...typography.body,
    fontStyle: 'italic',
    color: colors.textSecondary,
    textAlign: 'center',
  },

  /* CTA */
  ctaSection: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  ctaSubtext: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
