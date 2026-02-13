import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

interface ToastProps {
  visible: boolean;
  message: string;
  onHide?: () => void;
}

export function Toast({ visible, message, onHide }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isAnimating = useRef(false);

  const fadeIn = useCallback(() => {
    isAnimating.current = true;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      isAnimating.current = false;
      onHide?.();
    });
  }, [opacity, onHide]);

  useEffect(() => {
    if (visible) {
      fadeIn();
      timerRef.current = setTimeout(() => {
        fadeOut();
      }, 2000);
    } else {
      fadeOut();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, fadeIn, fadeOut]);

  if (!visible && !isAnimating.current) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  message: {
    ...typography.body,
    color: colors.text,
  },
});
