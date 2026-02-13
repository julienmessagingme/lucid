import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Screen } from '../../components/Screen';
import { Card } from '../../components/Card';
import { SecondaryButton } from '../../components/SecondaryButton';
import { Avatar } from '../../components/Avatar';
import { Modal } from '../../components/Modal';
import { mockUser } from '../../mocks/mockUser';
import { colors, spacing, typography } from '../../theme';

export function ProfileScreen() {
  const [workoutReminders, setWorkoutReminders] = useState(mockUser.notifications);
  const [dailyQuote, setDailyQuote] = useState(true);
  const [resetModalVisible, setResetModalVisible] = useState(false);

  const handleExport = () => {
    Alert.alert('Fonctionnalité à venir');
  };

  const handleReset = () => {
    Alert.alert('Données réinitialisées');
    setResetModalVisible(false);
  };

  return (
    <Screen>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Avatar initials={mockUser.initials} size={80} />
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.goal}>{mockUser.goal}</Text>
        </View>

        {/* Apparence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPARENCE</Text>
          <Card>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Mode sombre</Text>
              <Switch
                value={mockUser.darkMode}
                disabled
                trackColor={{ false: colors.surfaceLight, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>
          </Card>
        </View>

        {/* Unités */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UNITÉS</Text>
          <Card>
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <Text style={styles.rowLabel}>Unité de poids</Text>
              <Text style={styles.rowValue}>{mockUser.unit}</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
          <Card>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.rowLabel}>Rappels d'entraînement</Text>
              <Switch
                value={workoutReminders}
                onValueChange={setWorkoutReminders}
                trackColor={{ false: colors.surfaceLight, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Phrase du jour</Text>
              <Switch
                value={dailyQuote}
                onValueChange={setDailyQuote}
                trackColor={{ false: colors.surfaceLight, true: colors.accent }}
                thumbColor={colors.text}
              />
            </View>
          </Card>
        </View>

        {/* Données */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DONNÉES</Text>
          <Card>
            <TouchableOpacity
              style={[styles.row, styles.rowBorder]}
              activeOpacity={0.7}
              onPress={handleExport}
            >
              <Text style={styles.rowLabel}>Exporter mes données</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => setResetModalVisible(true)}
            >
              <Text style={styles.rowLabelDanger}>Réinitialiser</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Lucid v1.0.0</Text>

        {/* Reset Modal */}
        <Modal
          visible={resetModalVisible}
          onClose={() => setResetModalVisible(false)}
        >
          <Text style={styles.modalTitle}>Réinitialiser les données ?</Text>
          <Text style={styles.modalBody}>
            Cette action supprimera toutes vos données locales.
          </Text>
          <View style={styles.modalActions}>
            <SecondaryButton
              label="Annuler"
              onPress={() => setResetModalVisible(false)}
            />
            <TouchableOpacity
              style={styles.dangerButton}
              activeOpacity={0.7}
              onPress={handleReset}
            >
              <Text style={styles.dangerButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.base,
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    marginTop: spacing.base,
  },
  name: {
    ...typography.h1,
    color: colors.text,
    marginTop: spacing.md,
  },
  goal: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  /* Sections */
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },

  /* Rows */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    ...typography.body,
    color: colors.text,
  },
  rowValue: {
    ...typography.body,
    color: colors.textSecondary,
  },
  rowLabelDanger: {
    ...typography.body,
    color: colors.danger,
  },

  /* Footer */
  footer: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing['3xl'],
  },

  /* Modal */
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  modalBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.md,
  },
  dangerButton: {
    height: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  dangerButtonText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.danger,
  },
});
