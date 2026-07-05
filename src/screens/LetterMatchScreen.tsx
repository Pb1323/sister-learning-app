import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet } from '../data/letters';
import { speak } from '../utils/speech';
import { recordMatchCorrect } from '../utils/storage';
import { BouncyCard, HomePill, RewardBurst, Sky } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'LetterMatch'>;
const makeRound = () => alphabet.sort(() => Math.random() - 0.5).slice(0, 3);
export default function LetterMatchScreen({ navigation }: Props) { const [round, setRound] = useState(makeRound()); const [picked, setPicked] = useState<string>(); const [reward, setReward] = useState(false); const lowers = [...round].sort(() => Math.random() - 0.5);
const pickLower = (l: string) => { if (!picked) return; if (picked === l) { speak(`${picked} matches ${l.toLowerCase()}. Well done!`); recordMatchCorrect(); setReward(true); setTimeout(() => { setReward(false); setPicked(undefined); setRound(makeRound()); }, 1000); } else speak('Try again'); };
return <Sky><SafeAreaView style={styles.safe}><View style={styles.header}><HomePill onPress={() => navigation.navigate('Home')} /><Text style={styles.title}>Match Aa</Text></View><Text style={styles.help}>Tap a BIG letter, then its small letter.</Text><View style={styles.row}>{round.map((i) => <BouncyCard key={i.letter} onPress={() => { setPicked(i.letter); speak(i.letter); }} style={[styles.card, picked === i.letter && styles.selected]}><Text style={styles.upper}>{i.letter}</Text></BouncyCard>)}</View><View style={styles.row}>{lowers.map((i) => <BouncyCard key={i.lowercase} onPress={() => pickLower(i.letter)} style={styles.cardSmall}><Text style={styles.lower}>{i.lowercase}</Text></BouncyCard>)}</View><RewardBurst show={reward} message="A match!" /></SafeAreaView></Sky>; }
const styles = StyleSheet.create({ safe: { flex: 1, padding: 18 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { fontSize: 38, fontWeight: '900', color: '#23364a' }, help: { fontSize: 24, fontWeight: '800', color: '#31546b', textAlign: 'center', margin: 18 }, row: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14, flexWrap: 'wrap' }, card: { width: 125, height: 145, borderRadius: 32, backgroundColor: '#ff6f91', borderWidth: 6, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }, selected: { backgroundColor: '#ffbf2f' }, cardSmall: { width: 125, height: 145, borderRadius: 32, backgroundColor: '#6c7cff', borderWidth: 6, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }, upper: { fontSize: 76, color: '#fff', fontWeight: '900' }, lower: { fontSize: 76, color: '#fff', fontWeight: '900' } });
