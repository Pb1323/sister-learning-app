import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet } from '../data/letters';
import { useSettings } from '../context/SettingsContext';
import { speak } from '../utils/speech';
import { recordFindCorrect } from '../utils/storage';
import { BouncyCard, HomePill, RewardBurst, Sky } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'FindLetter'>;
const sample = (target: string, count: number) => [target, ...alphabet.map((l) => l.letter).filter((l) => l !== target).sort(() => Math.random() - 0.5).slice(0, count - 1)].sort(() => Math.random() - 0.5);
export default function FindLetterScreen({ navigation }: Props) {
  const { settings } = useSettings(); const [target, setTarget] = useState(alphabet[Math.floor(Math.random() * 26)].letter); const [reward, setReward] = useState(false); const choices = useMemo(() => sample(target, settings.difficulty), [target, settings.difficulty]);
  const ask = () => speak(`Find ${target}`); const next = () => { const n = alphabet[Math.floor(Math.random() * 26)].letter; setTarget(n); setTimeout(() => speak(`Find ${n}`), 150); };
  const choose = (letter: string) => { if (letter === target) { speak('Well done!'); recordFindCorrect(); setReward(true); setTimeout(() => { setReward(false); next(); }, 1000); } else speak('Try again. Find ' + target); };
  return <Sky><SafeAreaView style={styles.safe}><View style={styles.header}><HomePill onPress={() => navigation.navigate('Home')} /><BouncyCard onPress={ask} style={styles.sound}><Text style={styles.soundText}>🔊 Repeat</Text></BouncyCard></View><Text style={styles.prompt}>Find {target}</Text><View style={styles.choices}>{choices.map((letter) => <BouncyCard key={letter} onPress={() => choose(letter)} style={styles.choice}><Text style={styles.letter}>{letter}</Text></BouncyCard>)}</View><RewardBurst show={reward} /></SafeAreaView></Sky>;
}
const styles = StyleSheet.create({ safe: { flex: 1, padding: 18 }, header: { flexDirection: 'row', justifyContent: 'space-between' }, sound: { backgroundColor: '#fff', minHeight: 56, borderRadius: 28, paddingHorizontal: 20, justifyContent: 'center' }, soundText: { fontSize: 22, fontWeight: '900', color: '#31546b' }, prompt: { fontSize: 56, fontWeight: '900', color: '#23364a', textAlign: 'center', marginVertical: 28 }, choices: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', gap: 18 }, choice: { width: 145, height: 145, borderRadius: 36, backgroundColor: '#fff', borderWidth: 7, borderColor: '#ffcf54', alignItems: 'center', justifyContent: 'center' }, letter: { fontSize: 82, fontWeight: '900', color: '#ff6f91' } });
