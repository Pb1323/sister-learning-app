import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet } from '../data/letters';
import { AlphabetProgress, defaultAlphabetProgress, getAlphabetProgress } from '../utils/storage';
import { HomePill, MagicWorld, StarCounter, magic } from '../components/AlphabetUI';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Progress'>;

export default function ProgressScreen({ navigation }: Props) {
  const { settings } = useSettings();
  const [progress, setProgress] = useState<AlphabetProgress>(defaultAlphabetProgress);
  useEffect(() => navigation.addListener('focus', () => { getAlphabetProgress().then(setProgress); }), [navigation]);
  const practised = progress.practisedLetters.length;
  const badges = [
    { label: 'First Letter', emoji: '🌱', unlocked: practised >= 1 },
    { label: '5 Letters', emoji: '🌟', unlocked: practised >= 5 },
    { label: '10 Letters', emoji: '🏅', unlocked: practised >= 10 },
    { label: 'Alphabet Explorer', emoji: '🧭', unlocked: practised >= 26 },
    { label: 'Find Game Star', emoji: '🔎', unlocked: progress.findCorrect >= 1 },
    { label: 'Match Game Star', emoji: 'Aa', unlocked: progress.matchCorrect >= 1 },
  ];

  return (
    <MagicWorld reducedMotion={settings.reducedMotion} tint="#c9f3ff">
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}><HomePill onPress={() => navigation.navigate('Home')} /><StarCounter count={progress.stars} /></View>
        <ScrollView contentContainerStyle={styles.book} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>My Star Sticker Book</Text>
          <View style={styles.heroSticker}><Text style={styles.heroStars}>{'⭐'.repeat(Math.min(8, Math.max(1, progress.stars)))}</Text><Text style={styles.heroText}>{practised}/26 letters practised</Text></View>
          <Text style={styles.section}>Badges</Text>
          <View style={styles.badges}>{badges.map((badge) => <View key={badge.label} style={[styles.badge, !badge.unlocked && styles.locked]}><Text style={styles.badgeEmoji}>{badge.emoji}</Text><Text style={styles.badgeLabel}>{badge.label}</Text><Text style={styles.badgeState}>{badge.unlocked ? 'Unlocked!' : 'Keep going'}</Text></View>)}</View>
          <Text style={styles.section}>A-Z Stars</Text>
          <View style={styles.letterBook}>{alphabet.map((item) => { const unlocked = progress.practisedLetters.includes(item.letter); return <View key={item.letter} style={[styles.letterSticker, { backgroundColor: unlocked ? item.color : '#d7e2ea' }]}><Text style={styles.letter}>{item.letter}</Text><Text style={styles.letterStar}>{unlocked ? '⭐' : '○'}</Text></View>; })}</View>
          <Text style={styles.stats}>Find wins: {progress.findCorrect}   Match wins: {progress.matchCorrect}</Text>
        </ScrollView>
      </SafeAreaView>
    </MagicWorld>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  book: { alignItems: 'center', paddingBottom: 42 },
  title: { marginTop: 12, fontSize: 40, lineHeight: 44, fontWeight: '900', color: magic.ink, textAlign: 'center' },
  heroSticker: { width: '100%', maxWidth: 620, marginVertical: 14, borderRadius: 42, backgroundColor: '#fff8d9', borderWidth: 7, borderColor: '#fff', padding: 20, alignItems: 'center', shadowColor: '#39426b', shadowOpacity: 0.16, shadowRadius: 14, elevation: 7 },
  heroStars: { fontSize: 34, textAlign: 'center' },
  heroText: { fontSize: 28, lineHeight: 34, fontWeight: '900', color: magic.ink, textAlign: 'center', marginTop: 8 },
  section: { fontSize: 28, fontWeight: '900', color: magic.ink, marginTop: 12, marginBottom: 8 },
  badges: { width: '100%', maxWidth: 760, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  badge: { width: 150, minHeight: 146, borderRadius: 30, backgroundColor: '#fff', borderWidth: 5, borderColor: '#fff4a9', alignItems: 'center', justifyContent: 'center', padding: 10 },
  locked: { opacity: 0.55, borderColor: '#d7e2ea' },
  badgeEmoji: { fontSize: 38, fontWeight: '900' },
  badgeLabel: { fontSize: 18, lineHeight: 22, fontWeight: '900', color: magic.ink, textAlign: 'center' },
  badgeState: { fontSize: 15, fontWeight: '900', color: '#607080', textAlign: 'center', marginTop: 4 },
  letterBook: { width: '100%', maxWidth: 760, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  letterSticker: { width: 62, height: 70, borderRadius: 20, borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  letter: { color: '#fff', fontSize: 28, fontWeight: '900' },
  letterStar: { color: '#fff8d9', fontSize: 16, fontWeight: '900' },
  stats: { marginTop: 18, fontSize: 21, lineHeight: 28, fontWeight: '900', color: '#426070', textAlign: 'center' },
});
