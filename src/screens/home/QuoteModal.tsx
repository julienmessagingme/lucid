import React from 'react';
import { Modal, StyleSheet, Switch, Text, View } from 'react-native';

import { SecondaryButton } from '../../components/SecondaryButton';
import { mockQuotes } from '../../mocks/mockQuotes';
import { useStorage } from '../../hooks/useStorage';
import { colors, spacing, radius, typography } from '../../theme';

interface QuoteModalProps {
  visible: boolean;
  onClose: () => void;
}

export function QuoteModal({ visible, onClose }: QuoteModalProps) {
  const [quoteIndex] = useStorage<number>('quoteIndex', 0);
  const [dailyRotation, setDailyRotation] = useStorage<boolean>('preferences', true);

  const safeIndex = quoteIndex % mockQuotes.length;
  const quote = mockQuotes[safeIndex];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.explanation}>{quote.explanation}</Text>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Nouvelle phrase chaque jour</Text>
            <Switch
              value={typeof dailyRotation === 'boolean' ? dailyRotation : true}
              onValueChange={(val) => setDailyRotation(val)}
              trackColor={{ false: colors.surfaceLight, true: colors.accent }}
              thumbColor={colors.text}
            />
          </View>

          <View style={styles.closeContainer}>
            <SecondaryButton
              label="Fermer"
              onPress={onClose}
              variant="ghost"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.xl,
  },
  quoteText: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  explanation: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    paddingTop: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  toggleLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
    marginRight: spacing.md,
  },
  closeContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
});
