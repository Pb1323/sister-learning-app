import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet } from '../data/letters';
import { getAlphabetProgress } from '../utils/storage';
import { BouncyCard, HomePill, Sky } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'AlphabetGrid'>;
export default function AlphabetGridScreen({ navigation }: Props) {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => navigation.addListener('focus', () => { getAlphabetProgress().then((p) => setDone(p.practisedLetters)); }), [navigation]);
  return <Sky><SafeAreaView style={styles.safe}><View style={styles.header}><HomePill onPress={() => navigation.navigate('Home')} /><Text style={styles.title}>Tap a letter</Text></View><ScrollView contentContainerStyle={styles.grid}>{alphabet.map((item) => <BouncyCard key={item.letter} onPress={() => navigation.navigate('LearnLetter', { letter: item.letter })} style={[styles.card, { backgroundColor: item.color }]}><Text style={styles.star}>{done.includes(item.letter) ? '⭐' : ' '}</Text><Text style={styles.letter}>{item.letter}</Text><Text style={styles.emoji}>{item.emoji}</Text></BouncyCard>)}</ScrollView></SafeAreaView></Sky>;
}
const styles = StyleSheet.create({ safe: { flex: 1, padding: 18 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, title: { fontSize: 34, fontWeight: '900', color: '#23364a' }, grid: { paddingVertical: 18, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }, card: { width: 96, height: 116, borderRadius: 26, borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }, star: { position: 'absolute', top: 5, right: 8, fontSize: 18 }, letter: { fontSize: 48, fontWeight: '900', color: '#fff' }, emoji: { fontSize: 26 } });
