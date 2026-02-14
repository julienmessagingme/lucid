import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';
import { SessionSchedule, ScheduleSession } from '../../components/SessionSchedule';
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

/* ── Full-length day names (French) ── */
const FULL_DAY_NAMES = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

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

  /* ── Handlers ── */
  const handleStartSession = () => {
    haptic.medium();
    navigation.navigate('SessionPreview');
  };

  const handleSessionCardPress = () => {
    haptic.medium();
    navigation.navigate('SessionPreview');
  };

  /* ── Schedule data: 2 past + today ── */
  const recentPast = mockPastSessions.slice(0, 2);
  const now = new Date();
  const todayFullDay = FULL_DAY_NAMES[now.getDay()];

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

  /* ── Skeleton state ── */
  if (loading) {
    return (
      <Screen scroll>
        <View style={styles.content}>
          {/* Top bar skeleton */}
          <View style={styles.topBar}>
            <View>
              <Skeleton width={80} height={22} radius={radius.xs} />
              <Skeleton
                width={60}
                height={14}
                radius={radius.xs}
                style={{ marginTop: spacing.xs }}
              />
            </View>
            <Skeleton width={36} height={36} radius={radius.avatar} />
          </View>

          {/* Schedule card skeleton */}
          <Skeleton
            width={'100%'}
            height={220}
            radius={radius.card}
            style={styles.sectionGap}
          />

          {/* Session card skeleton */}
          <Skeleton
            width={'100%'}
            height={280}
            radius={radius.card}
            style={styles.sectionGap}
          />

          {/* Quote banner skeleton */}
          <Skeleton
            width={'100%'}
            height={56}
            radius={radius.card}
            style={styles.sectionGap}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <View style={styles.content}>
        {/* ─────────────────────────────────────────────
            1. TOP BAR
        ───────────────────────────────────────────── */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brandTitle}>Lucid</Text>
            <Text style={styles.brandCaption}>Séances</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Profil"
          >
            <Avatar initials={mockUser.initials} size={36} />
          </TouchableOpacity>
        </View>

        {/* ─────────────────────────────────────────────
            2. SESSION SCHEDULE CARD
        ───────────────────────────────────────────── */}
        <Card style={styles.sectionGap}>
          {/* Header row */}
          <View style={styles.scheduleHeader}>
            <View>
              <Text style={styles.scheduleDay}>{todayFullDay}</Text>
              <Text style={styles.scheduleCaption}>Aujourd&apos;hui</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>
                2 séances · 1 à venir
              </Text>
            </View>
          </View>

          {/* Mini pills row */}
          <View style={styles.miniPillsRow}>
            <View style={[styles.miniPill, styles.miniPillAccent]}>
              <Text style={[styles.miniPillText, styles.miniPillTextAccent]}>
                Full Body
              </Text>
            </View>
            <View style={[styles.miniPill, styles.miniPillNeutral]}>
              <Text style={[styles.miniPillText, styles.miniPillTextNeutral]}>
                Musculation
              </Text>
            </View>
            <View style={[styles.miniPill, styles.miniPillNeutral]}>
              <Text style={[styles.miniPillText, styles.miniPillTextNeutral]}>
                Intermédiaire
              </Text>
            </View>
          </View>

          {/* Session Schedule component */}
          <SessionSchedule
            sessions={scheduleSessions}
            onPress={handleSchedulePress}
          />
        </Card>

        {/* ─────────────────────────────────────────────
            3. FULL-WIDTH SESSION CARD
        ───────────────────────────────────────────── */}
        <Card style={styles.sectionGap}>
          {/* Header row */}
          <TouchableOpacity
            style={styles.sessionHeader}
            onPress={handleSessionCardPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Voir la séance du jour"
          >
            <View style={styles.sessionIconCircle}>
              <Text style={styles.sessionIconEmoji}>{'🏋️'}</Text>
            </View>
            <View style={styles.sessionHeaderCenter}>
              <Text style={styles.sessionTitle} numberOfLines={1}>
                {mockTodaySession.title}
              </Text>
              <Text style={styles.sessionSubtitle}>Séance du jour</Text>
            </View>
            <Text style={styles.sessionChevron}>{'›'}</Text>
          </TouchableOpacity>

          {/* Chips row */}
          <View style={styles.chipsRow}>
            <View style={[styles.chip, styles.chipAccent]}>
              <Text style={[styles.chipText, styles.chipTextAccent]}>
                {mockTodaySession.type}
              </Text>
            </View>
            <View style={[styles.chip, styles.chipNeutral]}>
              <Text style={[styles.chipText, styles.chipTextNeutral]}>
                {mockTodaySession.duration} min
              </Text>
            </View>
            <View style={[styles.chip, styles.chipNeutral]}>
              <Text style={[styles.chipText, styles.chipTextNeutral]}>
                {mockTodaySession.level}
              </Text>
            </View>
          </View>

          {/* Info rows */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>{'🎯'}</Text>
              <Text style={styles.infoLabel}>Objectif</Text>
              <Text style={styles.infoValue}>Force + stabilité</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>{'💪'}</Text>
              <Text style={styles.infoLabel}>Focus</Text>
              <Text style={styles.infoValue}>Jambes · Dos · Core</Text>
            </View>
          </View>

          {/* CTA */}
          <View style={styles.sessionCTA}>
            <PrimaryCTA
              label="Commencer la séance"
              onPress={handleStartSession}
            />
          </View>
        </Card>

        {/* ─────────────────────────────────────────────
            4. DAILY PHRASE BANNER
        ───────────────────────────────────────────── */}
        <TouchableOpacity
          style={[styles.quoteBanner, styles.sectionGap]}
          onPress={() => {
            haptic.light();
            setQuoteVisible(true);
          }}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Voir la phrase du jour"
        >
          <Text style={styles.quoteStarIcon}>{'✦'}</Text>
          <Text style={styles.quoteText} numberOfLines={1}>
            Respire. Tu es en contrôle.
          </Text>
          <Text style={styles.quoteChevron}>{'›'}</Text>
        </TouchableOpacity>

        {/* ─────────────────────────────────────────────
            5. BOTTOM SPACER (tab bar clearance)
        ───────────────────────────────────────────── */}
        <View style={styles.bottomSpacer} />
      </View>

      {/* ── Quote Modal ── */}
      <QuoteModal
        visible={quoteVisible}
        onClose={() => setQuoteVisible(false)}
      />
    </Screen>
  );
}

/* ══════════════════════════════════════════════════════
   STYLES — Light-theme design tokens
   ══════════════════════════════════════════════════════ */
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
  },

  /* ── Section gap (reusable vertical rhythm) ── */
  sectionGap: {
    marginTop: spacing.base,
  },

  /* ── 1. Top Bar ── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    ...typography.h1,
    color: colors.text,
  },
  brandCaption: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* ── 2. Schedule Card ── */
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  scheduleDay: {
    ...typography.h2,
    color: colors.text,
  },
  scheduleCaption: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  metaChip: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  metaChipText: {
    ...typography.caption,
    color: colors.accent,
  },

  /* Mini pills */
  miniPillsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  miniPill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  miniPillAccent: {
    backgroundColor: colors.accentSoft,
  },
  miniPillNeutral: {
    backgroundColor: colors.surfaceLight,
  },
  miniPillText: {
    ...typography.caption,
    fontSize: 11,
  },
  miniPillTextAccent: {
    color: colors.accent,
  },
  miniPillTextNeutral: {
    color: colors.textSecondary,
  },

  /* ── 3. Session Card ── */
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionIconEmoji: {
    fontSize: 20,
  },
  sessionHeaderCenter: {
    flex: 1,
    marginLeft: spacing.md,
  },
  sessionTitle: {
    ...typography.h2,
    color: colors.text,
  },
  sessionSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  sessionChevron: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },

  /* Chips row */
  chipsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.base,
  },
  chip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  chipAccent: {
    backgroundColor: colors.accentSoft,
  },
  chipNeutral: {
    backgroundColor: colors.surfaceLight,
  },
  chipText: {
    ...typography.caption,
  },
  chipTextAccent: {
    color: colors.accent,
  },
  chipTextNeutral: {
    color: colors.textSecondary,
  },

  /* Info rows */
  infoSection: {
    marginTop: spacing.base,
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 16,
    width: 24,
    textAlign: 'center',
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginLeft: spacing.sm,
    width: 60,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },

  /* Session CTA */
  sessionCTA: {
    marginTop: spacing.lg,
  },

  /* ── 4. Quote Banner ── */
  quoteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.card,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.base,
  },
  quoteStarIcon: {
    fontSize: 16,
    color: colors.accent,
    marginRight: spacing.md,
  },
  quoteText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
    fontStyle: 'italic',
  },
  quoteChevron: {
    fontSize: 20,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },

  /* ── 5. Bottom spacer ── */
  bottomSpacer: {
    height: spacing['4xl'],
  },
});
