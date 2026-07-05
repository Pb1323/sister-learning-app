import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import CategoryHubScreen from '../screens/CategoryHubScreen';
import LevelSelectScreen from '../screens/LevelSelectScreen';
import ActivityScreen from '../screens/ActivityScreen';
import CommunicationBoardScreen from '../screens/CommunicationBoardScreen';
import RoutinesScreen from '../screens/RoutinesScreen';
import RoutineDetailScreen from '../screens/RoutineDetailScreen';
import ParentDashboardScreen from '../screens/ParentDashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BonusGamesScreen from '../screens/BonusGamesScreen';
import OddOneOutScreen from '../screens/OddOneOutScreen';
import FindColourScreen from '../screens/FindColourScreen';
import CountingScreen from '../screens/CountingScreen';
import LetterCaseMatchScreen from '../screens/LetterCaseMatchScreen';
import IFeelScreen from '../screens/IFeelScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CategoryHub" component={CategoryHubScreen} />
        <Stack.Screen name="LevelSelect" component={LevelSelectScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="CommunicationBoard" component={CommunicationBoardScreen} />
        <Stack.Screen name="Routines" component={RoutinesScreen} />
        <Stack.Screen name="RoutineDetail" component={RoutineDetailScreen} />
        <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="BonusGames" component={BonusGamesScreen} />
        <Stack.Screen name="OddOneOut" component={OddOneOutScreen} />
        <Stack.Screen name="FindColour" component={FindColourScreen} />
        <Stack.Screen name="Counting" component={CountingScreen} />
        <Stack.Screen name="LetterCaseMatch" component={LetterCaseMatchScreen} />
        <Stack.Screen name="IFeel" component={IFeelScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
