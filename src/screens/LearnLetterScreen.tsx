import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet, getLetter } from '../data/letters';
import { speak } from '../utils/speech';
import { recordLetterPractised } from '../utils/storage';
import { BouncyCard, HomePill, RewardBurst, Sky } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnLetter'>;

export default function LearnLetterScreen({ navigation, route }: Props) {
  const initial = alphabet.findIndex((l) => l.letter === route.params?.letter);
  const [index, setIndex] = useState(initial >= 0 ? initial : 0);
  const [reward, setReward] = useState(false);
  const item = alphabet[index];
  const phrase = useMemo(() => `${item.letter}. ${item.letter} is for ${item.word}.`, [item]);
  const hear = () => { speak(phrase); recordLetterPractised(item.letter); setReward(true); setTimeout(() => setReward(false), 1100); };
  useEffect(() => { hear(); }, [index]);
  return <Sky><SafeAreaView style={styles.safe}><View style={styles.top}><HomePill onPress={() => navigation.navigate('Home')} /><Text style={styles.progress}>Letter {index + 1} of 26</Text></View><View style={[styles.card, { backgroundColor: item.softColor }]}><Text style={styles.emoji}>{item.emoji}</Text><Text style={[styles.letter, { color: item.color }]}>{item.letter}</Text><Text style={styles.words}>{item.letter} is for {item.word}</Text></View><View style={styles.controls}><Button text="◀ Previous" color="#6c7cff" onPress={() => setIndex((index + 25) % 26)} /><Button text="🔊 Hear again" color="#ff6f91" onPress={hear} /><Button text="Next ▶" color="#32c96d" onPress={() => setIndex((index + 1) % 26)} /></View><RewardBurst show={reward} message="Great listening!" /></SafeAreaView></Sky>;
}
function Button({ text, color, onPress }: { text: string; color: string; onPress: () => void }) { return <BouncyCard onPress={onPress} style={[styles.button, { backgroundColor: color }]}><Text style={styles.buttonText}>{text}</Text></BouncyCard>; }
const styles = StyleSheet.create({ safe: { flex: 1, padding: 18 }, top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }, progress: { fontSize: 22, fontWeight: '900', color: '#31546b', backgroundColor: '#fff', padding: 14, borderRadius: 24 }, card: { flex: 1, marginVertical: 18, borderRadius: 42, borderWidth: 7, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 18, elevation: 8 }, emoji: { fontSize: 95 }, letter: { fontSize: 170, fontWeight: '900', lineHeight: 180 }, words: { fontSize: 34, fontWeight: '900', color: '#23364a', textAlign: 'center' }, controls: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }, button: { minWidth: 155, minHeight: 74, borderRadius: 28, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, borderWidth: 4, borderColor: '#fff' }, buttonText: { color: '#fff', fontSize: 21, fontWeight: '900' } });
