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
import { ProgressBar } from '../../components/ProgressBar';
import { MiniStat } from '../../components/MiniStat';
import { SessionSchedule, ScheduleSession } from '../../components/SessionSchedule';
import { DailyQuoteBar } from '../../components/DailyQuoteBar';
import { Avatar } from '../../components/Avatar';
import { Skeleton } from '../../components/Skeleton';

import { mockTodaySession } from '../../mocks/mockTodaySession';
import { mockPastSessions } from '../../mocks/mockPastSessions';
import { mockQuotes } from '../../mocks/mockQuotes';
import { mockUser } from '../../mocks/mockUser';
import { dayName } from '../../utils/formatDate';

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

  const handleStartSession = () => {
    haptic.medium();
    navigation.navigate('SessionPreview');
  };

  // Build schedule: 2 past sessions + today's session
  const recentPast = mockPastSessions.slice(0, 2);
  const now = new Date();
  const scheduleSessions: ScheduleSession[] = [
    ...recentPast.map((s) => {
      const d = new Date(s.date);
      return {
        id: s.id,
        title: s.title,
        type: s.type,
        duration: s.duration,
        dayLabel: dayName(d),
        dateNumber: String(d.getDate()),
        status: 'completed' as const,
        badge: s.badge,
      };
    }),
    {
      id: 'today',
      title: mockTodaySession.title,
      type: mockTodaySession.type,
      duration: mockTodaySession.duration,
      dayLabel: dayName(now),
      dateNumber: String(now.getDate()),
      status: 'today' as const,
    },
  ];

  const handleSchedulePress = (session: ScheduleSession) => {
    if (session.status === 'today') {
      handleStartSession();
    } else {
      navigation.navigate('SessionDetail', { sessionId: session.id });
    }
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

        {/* ── Mes séances ── */}
        {loading ? (
          <Skeleton
            width={'100%'}
            height={240}
            radius={radius.card}
            style={styles.sectionSpacing}
          />
        ) : (
          <Card style={styles.sectionSpacing}>
            <Text style={styles.scheduleTitle}>Mes séances</Text>
            <SessionSchedule
              sessions={scheduleSessions}
              onPress={handleSchedulePress}
            />
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

  /* Schedule */
  scheduleTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
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
