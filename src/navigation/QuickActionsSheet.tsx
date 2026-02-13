import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheet } from '../components/BottomSheet';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { SecondaryButton } from '../components/SecondaryButton';
import { MainStackParamList } from './types';
import { colors, spacing, typography } from '../theme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface QuickActionsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export function QuickActionsSheet({ visible, onClose }: QuickActionsSheetProps) {
  const navigation = useNavigation<NavigationProp>();

  const handleStartSession = () => {
    onClose();
    navigation.navigate('SessionPreview');
  };

  const handleAddWeight = () => {
    // Placeholder — weight logging not yet implemented
    onClose();
  };

  const handleViewStats = () => {
    onClose();
    navigation.navigate('Tabs', { screen: 'Stats' });
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} height={320}>
      <Text style={styles.title}>Actions rapides</Text>

      <View style={styles.actions}>
        <PrimaryCTA label="Commencer ma s\u00E9ance" onPress={handleStartSession} />

        <View style={styles.gap} />

        <SecondaryButton label="Ajouter mon poids" onPress={handleAddWeight} />

        <View style={styles.gap} />

        <SecondaryButton
          label="Voir mes stats"
          onPress={handleViewStats}
          variant="ghost"
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  actions: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  gap: {
    height: spacing.md,
  },
});
