import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { BouncyCard, FloatingBubble, MagicWorld, StarCounter, magic } from '../components/AlphabetUI';
import { alphabet } from '../data/letters';
import { getAlphabetProgress } from '../utils/storage';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { settings } = useSettings();
  const [stars, setStars] = useState(0);
  const [nextLetter, setNextLetter] = useState('A');
  useEffect(() => navigation.addListener('focus', () => {
    getAlphabetProgress().then((p) => {
      setStars(p.stars);
      setNextLetter(alphabet.find((letter) => !p.practisedLetters.includes(letter.letter))?.letter ?? 'A');
    });
  }), [navigation]);

  return (
    <MagicWorld reducedMotion={settings.reducedMotion}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <View style={styles.badge}><Text style={styles.badgeText}>🌈 Alphabet Adventure Island</Text></View>
            <StarCounter count={stars} />
          </View>

          <FloatingBubble reducedMotion={settings.reducedMotion} style={styles.castle}>
            <Text style={styles.castleEmoji}>🏰</Text>
            <Text style={styles.title}>Magic Alphabet Garden</Text>
            <Text style={styles.subtitle}>Tap a portal. Hear letters. Collect shiny stars.</Text>
            <BouncyCard reducedMotion={settings.reducedMotion} onPress={() => navigation.navigate('LearnLetter', { letter: nextLetter })} style={styles.continueButton}>
              <Text style={styles.continueText}>Continue with {nextLetter} ✨</Text>
            </BouncyCard>
          </FloatingBubble>

          <View style={styles.portalField}>
            <Portal label="Explore Letters" emoji="🔤" color={magic.pink} size="large" onPress={() => navigation.navigate('AlphabetGrid')} />
            <Portal label="Find the Letter" emoji="🔎" color={magic.deepBlue} onPress={() => navigation.navigate('FindLetter')} />
            <Portal label="Match Letters" emoji="Aa" color={magic.green} onPress={() => navigation.navigate('LetterMatch')} />
            <Portal label="My Stars" emoji="⭐" color="#f6a623" onPress={() => navigation.navigate('Progress')} />
            <Portal label="Settings" emoji="⚙️" color={magic.purple} onPress={() => navigation.navigate('Settings')} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </MagicWorld>
  );
}

function Portal({ label, emoji, color, onPress, size = 'normal' }: { label: string; emoji: string; color: string; onPress: () => void; size?: 'normal' | 'large' }) {
  const big = size === 'large';
  return (
    <BouncyCard onPress={onPress} style={[styles.portal, big && styles.portalLarge, { backgroundColor: color }]}> 
      <View style={styles.portalGlow}><Text style={[styles.portalEmoji, big && styles.portalEmojiLarge]}>{emoji}</Text></View>
      <Text style={[styles.portalText, big && styles.portalTextLarge]}>{label}</Text>
      <Text style={styles.portalSparkles}>✦ ✨ ✦</Text>
    </BouncyCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 18, paddingBottom: 38, alignItems: 'center' },
  topRow: { width: '100%', maxWidth: 780, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 8 },
  badge: { flex: 1, minHeight: 54, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.82)', justifyContent: 'center', paddingHorizontal: 18, borderWidth: 3, borderColor: '#fff8d9' },
  badgeText: { fontSize: 20, fontWeight: '900', color: magic.ink },
  castle: { width: '100%', maxWidth: 680, borderRadius: 42, backgroundColor: 'rgba(255,248,217,0.92)', borderWidth: 7, borderColor: '#fff', alignItems: 'center', padding: 22, shadowColor: '#39426b', shadowOpacity: 0.18, shadowRadius: 18, elevation: 8 },
  castleEmoji: { fontSize: 60 },
  title: { fontSize: 42, lineHeight: 46, fontWeight: '900', color: magic.ink, textAlign: 'center' },
  subtitle: { marginTop: 8, fontSize: 22, lineHeight: 28, fontWeight: '800', color: '#426070', textAlign: 'center' },
  continueButton: { marginTop: 16, minHeight: 66, minWidth: 230, borderRadius: 34, backgroundColor: magic.green, borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  continueText: { fontSize: 24, lineHeight: 30, fontWeight: '900', color: '#fff', textAlign: 'center' },
  portalField: { width: '100%', maxWidth: 780, marginTop: 18, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 16 },
  portal: { width: 168, minHeight: 158, borderRadius: 42, borderWidth: 6, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 12, shadowColor: '#344', shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 8 }, elevation: 7 },
  portalLarge: { width: 230, minHeight: 190 },
  portalGlow: { width: 82, height: 82, borderRadius: 41, backgroundColor: 'rgba(255,255,255,0.24)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  portalEmoji: { fontSize: 38, color: '#fff', fontWeight: '900' },
  portalEmojiLarge: { fontSize: 52 },
  portalText: { color: '#fff', fontSize: 23, lineHeight: 27, fontWeight: '900', textAlign: 'center' },
  portalTextLarge: { fontSize: 27, lineHeight: 31 },
  portalSparkles: { color: '#fff8d9', fontSize: 18, fontWeight: '900', marginTop: 5 },
});
