import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, typography } from '../theme';
import { haptic } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 70;
const NOTCH_WIDTH = 80;
const NOTCH_DEPTH = 34;
const PLUS_SIZE = 60;

interface BottomNotchTabBarProps extends BottomTabBarProps {
  onPlusPress: () => void;
}

const TAB_META: Record<string, { icon: string; label: string }> = {
  Home: { icon: '\u{1F3E0}', label: 'Accueil' },
  Plan: { icon: '\u{1F4C5}', label: 'Plan' },
  Stats: { icon: '\u{1F4CA}', label: 'Stats' },
  Profile: { icon: '\u{1F464}', label: 'Profil' },
};

function buildNotchPath(width: number, height: number): string {
  const mid = width / 2;
  const notchHalf = NOTCH_WIDTH / 2;
  const curveInset = 18;

  // Start top-left, draw straight to left edge of notch, then a smooth
  // concave curve down and back up, then straight to top-right, then
  // down to bottom-right, across bottom, and back up to start.
  return [
    `M 0 0`,
    `L ${mid - notchHalf - curveInset} 0`,
    // Curve down into the notch
    `C ${mid - notchHalf + 2} 0, ${mid - notchHalf + 6} ${NOTCH_DEPTH}, ${mid} ${NOTCH_DEPTH}`,
    // Curve back up out of the notch
    `C ${mid + notchHalf - 6} ${NOTCH_DEPTH}, ${mid + notchHalf - 2} 0, ${mid + notchHalf + curveInset} 0`,
    `L ${width} 0`,
    `L ${width} ${height}`,
    `L 0 ${height}`,
    `Z`,
  ].join(' ');
}

export function BottomNotchTabBar({
  state,
  navigation,
  onPlusPress,
}: BottomNotchTabBarProps) {
  const insets = useSafeAreaInsets();
  const totalHeight = TAB_BAR_HEIGHT + insets.bottom;
  const notchPath = buildNotchPath(SCREEN_WIDTH, totalHeight);

  // Split tabs into left pair (indices 0,1) and right pair (indices 2,3)
  const leftRoutes = state.routes.slice(0, 2);
  const rightRoutes = state.routes.slice(2, 4);

  const renderTab = (route: (typeof state.routes)[number], index: number) => {
    const focused = state.index === index;
    const meta = TAB_META[route.name] ?? { icon: '?', label: route.name };

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        key={route.key}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        accessibilityLabel={meta.label}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}
        style={styles.tabItem}
      >
        <Text style={styles.tabIcon}>{meta.icon}</Text>
        <Text
          style={[
            styles.tabLabel,
            { color: focused ? colors.text : colors.textMuted },
          ]}
        >
          {meta.label}
        </Text>
        {focused && <View style={styles.activeDot} />}
      </TouchableOpacity>
    );
  };

  const handlePlusPress = () => {
    haptic.medium();
    onPlusPress();
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      {/* SVG background with notch */}
      <View style={[styles.svgContainer, { height: totalHeight }]}>
        <Svg width={SCREEN_WIDTH} height={totalHeight} style={StyleSheet.absoluteFill}>
          <Path d={notchPath} fill={colors.surface} />
        </Svg>
      </View>

      {/* Tab items */}
      <View style={styles.tabRow}>
        <View style={styles.tabGroup}>
          {leftRoutes.map((route, i) => renderTab(route, i))}
        </View>

        {/* Spacer for the notch area */}
        <View style={styles.notchSpacer} />

        <View style={styles.tabGroup}>
          {rightRoutes.map((route, i) => renderTab(route, i + 2))}
        </View>
      </View>

      {/* Center floating + button */}
      <View style={styles.plusContainer} pointerEvents="box-none">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handlePlusPress}
          style={styles.plusTouchable}
          accessibilityRole="button"
          accessibilityLabel="Actions rapides"
        >
          <LinearGradient
            colors={[colors.accent, colors.accentSecondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.plusGradient}
          >
            <Text style={styles.plusIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: TAB_BAR_HEIGHT,
    paddingTop: spacing.sm,
  },
  tabGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  notchSpacer: {
    width: NOTCH_WIDTH + 20,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
    paddingVertical: spacing.xs,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  tabLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '500',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.accent,
    marginTop: 3,
  },
  plusContainer: {
    position: 'absolute',
    top: -(PLUS_SIZE / 2) + 4,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  plusTouchable: {
    width: PLUS_SIZE,
    height: PLUS_SIZE,
    borderRadius: PLUS_SIZE / 2,
    ...Platform.select({
      ios: {
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 14,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  plusGradient: {
    width: PLUS_SIZE,
    height: PLUS_SIZE,
    borderRadius: PLUS_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    marginTop: -2,
  },
});
