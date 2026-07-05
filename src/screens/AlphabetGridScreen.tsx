import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet } from '../data/letters';
import { getAlphabetProgress } from '../utils/storage';
import { BouncyCard, FloatingBubble, HomePill, MagicWorld, StarCounter, magic } from '../components/AlphabetUI';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'AlphabetGrid'>;

export default function AlphabetGridScreen({ navigation }: Props) {
  const { settings } = useSettings();
  const [done, setDone] = useState<string[]>([]);
  const [stars, setStars] = useState(0);
  useEffect(() => navigation.addListener('focus', () => { getAlphabetProgress().then((p) => { setDone(p.practisedLetters); setStars(p.stars); }); }), [navigation]);

  return (
    <MagicWorld reducedMotion={settings.reducedMotion} tint="#9fe7ff">
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}><HomePill onPress={() => navigation.navigate('Home')} /><StarCounter count={stars} /></View>
        <Text style={styles.title}>Alphabet Sky Islands</Text>
        <Text style={styles.help}>Tap a letter island to visit its magic scene.</Text>
        <ScrollView contentContainerStyle={styles.map} showsVerticalScrollIndicator={false}>
          {alphabet.map((item, index) => {
            const practised = done.includes(item.letter);
            return (
              <FloatingBubble key={item.letter} reducedMotion={settings.reducedMotion} style={[styles.floatWrap, { marginTop: index % 2 ? 22 : 0 }]}> 
                <BouncyCard reducedMotion={settings.reducedMotion} onPress={() => navigation.navigate('LearnLetter', { letter: item.letter })} style={[styles.island, { backgroundColor: item.color }, practised && styles.islandDone]}>
                  <Text style={styles.doneStar}>{practised ? '⭐' : '✦'}</Text>
                  <Text style={styles.letter}>{item.letter}</Text>
                  <Text style={styles.emoji}>{item.emoji}</Text>
                </BouncyCard>
              </FloatingBubble>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </MagicWorld>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  title: { marginTop: 12, fontSize: 38, lineHeight: 42, fontWeight: '900', color: magic.ink, textAlign: 'center' },
  help: { fontSize: 21, fontWeight: '800', color: '#426070', textAlign: 'center', marginTop: 4, marginBottom: 10 },
  map: { paddingVertical: 18, paddingBottom: 42, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  floatWrap: { alignItems: 'center' },
  island: { width: 102, height: 122, borderRadius: 34, borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#39426b', shadowOpacity: 0.2, shadowRadius: 12, elevation: 7 },
  islandDone: { borderColor: '#fff4a9', shadowColor: '#ffd45c', shadowOpacity: 0.45 },
  doneStar: { position: 'absolute', top: 6, right: 10, fontSize: 20, color: '#fff8d9', fontWeight: '900' },
  letter: { fontSize: 50, lineHeight: 54, fontWeight: '900', color: '#fff' },
  emoji: { fontSize: 27 },
});
