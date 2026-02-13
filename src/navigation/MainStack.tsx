import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';
import { TabNavigator } from './TabNavigator';
import { SessionDetailScreen } from '../screens/plan/SessionDetailScreen';
import { PreferencesScreen } from '../screens/plan/PreferencesScreen';
import { SessionPreviewScreen } from '../screens/session/SessionPreviewScreen';
import { SessionExerciseScreen } from '../screens/session/SessionExerciseScreen';
import { RestScreen } from '../screens/session/RestScreen';
import { SessionEndSurveyScreen } from '../screens/session/SessionEndSurveyScreen';
import { SessionSummaryScreen } from '../screens/session/SessionSummaryScreen';
import { StatsDetailScreen } from '../screens/stats/StatsDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="SessionPreview" component={SessionPreviewScreen} />
      <Stack.Screen name="SessionExercise" component={SessionExerciseScreen} />
      <Stack.Screen name="Rest" component={RestScreen} />
      <Stack.Screen name="SessionEndSurvey" component={SessionEndSurveyScreen} />
      <Stack.Screen name="SessionSummary" component={SessionSummaryScreen} />
    </Stack.Navigator>
  );
}
