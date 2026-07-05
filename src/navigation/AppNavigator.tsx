import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import AlphabetGridScreen from '../screens/AlphabetGridScreen';
import LearnLetterScreen from '../screens/LearnLetterScreen';
import FindLetterScreen from '../screens/FindLetterScreen';
import LetterMatchScreen from '../screens/LetterMatchScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AlphabetGrid" component={AlphabetGridScreen} />
        <Stack.Screen name="LearnLetter" component={LearnLetterScreen} />
        <Stack.Screen name="FindLetter" component={FindLetterScreen} />
        <Stack.Screen name="LetterMatch" component={LetterMatchScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
