import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { PrimaryCTA } from '../../components/PrimaryCTA';

import { mockUser } from '../../mocks/mockUser';

import { colors, spacing, radius, typography } from '../../theme';

// ---------------------------------------------------------------------------
// Static option sets
// ---------------------------------------------------------------------------

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;
const DURATIONS = ['45 min', '60 min', '90 min'] as const;
const EQUIPMENT = ['Haltères', 'Barre', 'Machine', 'Poids du corps'] as const;
const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé'] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PreferencesScreen() {
  const navigation = useNavigation();

  // Visual-only state -- no persistence
  const [selectedDays, setSelectedDays] = useState<Set<number>>(
    new Set([0, 1, 3, 4]),
  );
  const [selectedDuration, setSelectedDuration] = useState<string>('60 min');
  const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(
    new Set(['Haltères', 'Barre', 'Poids du corps']),
  );
  const [selectedLevel, setSelectedLevel] = useState<string>('Intermédiaire');

  // Togglers
  const toggleDay = (index: number) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleEquipment = (item: string) => {
    setSelectedEquipment((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  const handleSave = () => {
    Alert.alert('Enregistré ✓', 'Tes préférences ont été mises à jour.');
  };

  return (
    <Screen scroll>
      <View style={styles.content}>

        {/* ── Back + Title ── */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Mes préférences</Text>

        {/* ── Training days ── */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Jours d'entraînement</Text>
          <View style={styles.pillRow}>
            {DAYS.map((day, i) => {
              const active = selectedDays.has(i);
              return (
                <TouchableOpacity
                  key={day}
                  activeOpacity={0.7}
                  onPress={() => toggleDay(i)}
                  style={[
                    styles.selectablePill,
                    active && styles.selectablePillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.selectablePillText,
                      active && styles.selectablePillTextActive,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* ── Preferred duration ── */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Durée préférée</Text>
          <View style={styles.pillRow}>
            {DURATIONS.map((dur) => {
              const active = selectedDuration === dur;
              return (
                <TouchableOpacity
                  key={dur}
                  activeOpacity={0.7}
                  onPress={() => setSelectedDuration(dur)}
                  style={[
                    styles.selectablePill,
                    active && styles.selectablePillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.selectablePillText,
                      active && styles.selectablePillTextActive,
                    ]}
                  >
                    {dur}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* ── Goal ── */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Objectif</Text>
          <Text style={styles.goalValue}>{mockUser.goal}</Text>
        </Card>

        {/* ── Available equipment ── */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Équipement disponible</Text>
          <View style={styles.pillRow}>
            {EQUIPMENT.map((item) => {
              const active = selectedEquipment.has(item);
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.7}
                  onPress={() => toggleEquipment(item)}
                  style={[
                    styles.selectablePill,
                    active && styles.selectablePillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.selectablePillText,
                      active && styles.selectablePillTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* ── Level ── */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Niveau</Text>
          <View style={styles.pillRow}>
            {LEVELS.map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <TouchableOpacity
                  key={lvl}
                  activeOpacity={0.7}
                  onPress={() => setSelectedLevel(lvl)}
                  style={[
                    styles.selectablePill,
                    active && styles.selectablePillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.selectablePillText,
                      active && styles.selectablePillTextActive,
                    ]}
                  >
                    {lvl}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* ── Save CTA ── */}
        <View style={styles.ctaWrapper}>
          <PrimaryCTA label="Enregistrer" onPress={handleSave} />
        </View>
      </View>
    </Screen>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: spacing['3xl'],
  },

  /* Back */
  backButton: {
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingRight: spacing.md,
  },
  backArrow: {
    fontSize: 24,
    color: colors.text,
  },

  /* Header */
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xl,
  },

  /* Cards */
  card: {
    marginBottom: spacing.base,
  },
  cardTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },

  /* Selectable pills */
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  selectablePill: {
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.surfaceLight,
  },
  selectablePillActive: {
    backgroundColor: colors.accent,
  },
  selectablePillText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  selectablePillTextActive: {
    color: '#FFFFFF',
  },

  /* Goal */
  goalValue: {
    ...typography.body,
    color: colors.accentSecondary,
  },

  /* CTA */
  ctaWrapper: {
    marginTop: spacing.xl,
  },
});
