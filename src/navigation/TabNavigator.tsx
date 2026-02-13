import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { BottomNotchTabBar } from './BottomNotchTabBar';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PlanScreen } from '../screens/plan/PlanScreen';
import { StatsScreen } from '../screens/stats/StatsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { QuickActionsSheet } from './QuickActionsSheet';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => (
          <BottomNotchTabBar {...props} onPlusPress={() => setSheetVisible(true)} />
        )}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <QuickActionsSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} />
    </>
  );
}
