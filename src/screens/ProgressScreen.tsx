import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { defaultAlphabetProgress, getAlphabetProgress, AlphabetProgress } from '../utils/storage';
import { HomePill, Sky } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'Progress'>;
export default function ProgressScreen({ navigation }: Props) { const [p, setP] = useState<AlphabetProgress>(defaultAlphabetProgress); useEffect(() => navigation.addListener('focus', () => { getAlphabetProgress().then(setP); }), [navigation]); return <Sky><SafeAreaView style={styles.safe}><HomePill onPress={() => navigation.navigate('Home')} /><Text style={styles.title}>My Stars</Text><Text style={styles.stars}>{'⭐'.repeat(Math.min(10, Math.max(1, p.stars)))}</Text><View style={styles.panel}><Text style={styles.big}>{p.practisedLetters.length}/26</Text><Text style={styles.label}>letters practised</Text><Text style={styles.stat}>👀 Find wins: {p.findCorrect}</Text><Text style={styles.stat}>🔤 Match wins: {p.matchCorrect}</Text></View></SafeAreaView></Sky>; }
const styles = StyleSheet.create({ safe: { flex: 1, padding: 18, alignItems: 'center' }, title: { fontSize: 48, fontWeight: '900', color: '#23364a', marginTop: 20 }, stars: { fontSize: 38, margin: 18, textAlign: 'center' }, panel: { width: '100%', maxWidth: 520, backgroundColor: '#fff', borderRadius: 38, padding: 28, alignItems: 'center', borderWidth: 6, borderColor: '#fff7c7' }, big: { fontSize: 74, fontWeight: '900', color: '#ff6f91' }, label: { fontSize: 26, fontWeight: '900', color: '#31546b', marginBottom: 18 }, stat: { fontSize: 24, fontWeight: '800', color: '#23364a', margin: 6 } });
