import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { routines } from '../data/routines';
import BigButton from '../components/BigButton';
import { speak } from '../utils/speech';

type Props = NativeStackScreenProps<RootStackParamList, 'RoutineDetail'>;

export default function RoutineDetailScreen({ route, navigation }: Props) {
  const routine = routines.find((r) => r.id === route.params.routineId)!;
  const [stepIndex, setStepIndex] = useState(0);
  const step = routine.steps[stepIndex];

  const handleTap = () => speak(step.label);
  const next = () => {
    if (stepIndex + 1 < routine.steps.length) setStepIndex(stepIndex + 1);
    else navigation.navigate('Routines');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: routine.color + '22' }]}>
      <Text style={styles.title}>{routine.title}</Text>
      <Text style={styles.stepCount}>
        Step {stepIndex + 1} of {routine.steps.length}
      </Text>
      <BigButton label={step.label} emoji={step.emoji} color={routine.color} size={220} onPress={handleTap} />
      <View style={styles.footer}>
        <BigButton label="Home" emoji="🏠" color="#78909c" size={70} onPress={() => navigation.navigate('Home')} />
        <BigButton label="Next ▶" emoji="➡️" color="#43a047" size={100} onPress={next} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 4, color: '#37474f' },
  stepCount: { fontSize: 16, color: '#607d8b', marginBottom: 20 },
  footer: { marginTop: 30, flexDirection: 'row', alignItems: 'center' },
});
