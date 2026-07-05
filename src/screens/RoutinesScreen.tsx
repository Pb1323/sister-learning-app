import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { routines } from '../data/routines';
import BigButton from '../components/BigButton';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Routines'>;

export default function RoutinesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="🗓️ My Day" color="#ffa726" />
      <ScrollView contentContainerStyle={styles.grid}>
        {routines.map((r) => (
          <BigButton
            key={r.id}
            label={r.title}
            emoji={r.emoji}
            color={r.color}
            size={140}
            onPress={() => navigation.navigate('RoutineDetail', { routineId: r.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 8 },
});
