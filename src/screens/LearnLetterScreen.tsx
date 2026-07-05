import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet } from '../data/letters';
import { speak } from '../utils/speech';
import { getAlphabetProgress, recordLetterPractised } from '../utils/storage';
import { playRewardSound } from '../utils/music';
import { BouncyCard, FloatingBubble, HomePill, MagicWorld, RewardBurst, StarCounter, magic } from '../components/AlphabetUI';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'LearnLetter'>;

export default function LearnLetterScreen({ navigation, route }: Props) {
  const { settings } = useSettings();
  const initial = alphabet.findIndex((l) => l.letter === route.params?.letter);
  const [index, setIndex] = useState(initial >= 0 ? initial : 0);
  const [reward, setReward] = useState(false);
  const [stars, setStars] = useState(0);
  const scenePulse = useRef(new Animated.Value(0)).current;
  const item = alphabet[index];
  const phrase = useMemo(() => `${item.letter}. ${item.letter} is for ${item.word}.`, [item]);

  useEffect(() => navigation.addListener('focus', () => { getAlphabetProgress().then((p) => setStars(p.stars)); }), [navigation]);
  useEffect(() => {
    if (settings.reducedMotion) return;
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(scenePulse, { toValue: 1, duration: 1800, useNativeDriver: true }),
      Animated.timing(scenePulse, { toValue: 0, duration: 1800, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [scenePulse, settings.reducedMotion]);

  const hear = () => {
    speak(phrase);
    recordLetterPractised(item.letter).then((p) => setStars(p.stars));
    playRewardSound();
    setReward(true);
    setTimeout(() => setReward(false), 1150);
  };

  useEffect(() => { hear(); }, [index]);

  const breathe = scenePulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.035] });

  return (
    <MagicWorld reducedMotion={settings.reducedMotion} tint={item.softColor}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.top}><HomePill onPress={() => navigation.navigate('Home')} /><StarCounter count={stars} /></View>
        <View style={styles.progressPill}><Text style={styles.progressText}>Letter {index + 1} of 26</Text></View>
        <Animated.View style={[styles.scene, { transform: [{ scale: breathe }] }]}> 
          <Text style={styles.sparkles}>✦ ✨ ✦</Text>
          <FloatingBubble reducedMotion={settings.reducedMotion} style={styles.objectBubble}><Text style={styles.emoji}>{item.emoji}</Text></FloatingBubble>
          <View style={styles.letterRow}>
            <Text style={[styles.bigLetter, { color: item.color }]}>{item.letter}</Text>
            <Text style={[styles.smallLetter, { color: item.color }]}>{item.lowercase}</Text>
          </View>
          <Text style={styles.words}>{item.letter} is for {item.word}</Text>
        </Animated.View>
        <View style={styles.controls}>
          <BigAction label="◀ Previous" color={magic.purple} onPress={() => setIndex((index + 25) % 26)} reducedMotion={settings.reducedMotion} />
          <BigAction label="🔊 Hear Again" color={magic.pink} onPress={hear} reducedMotion={settings.reducedMotion} />
          <BigAction label="Next ▶" color={magic.green} onPress={() => setIndex((index + 1) % 26)} reducedMotion={settings.reducedMotion} />
        </View>
        <RewardBurst show={reward} message="Magic star!" reducedMotion={settings.reducedMotion} />
      </SafeAreaView>
    </MagicWorld>
  );
}

function BigAction({ label, color, onPress, reducedMotion }: { label: string; color: string; onPress: () => void; reducedMotion: boolean }) {
  return <BouncyCard reducedMotion={reducedMotion} onPress={onPress} style={[styles.button, { backgroundColor: color }]}><Text style={styles.buttonText}>{label}</Text></BouncyCard>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  progressPill: { alignSelf: 'center', marginTop: 12, minHeight: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.85)', justifyContent: 'center', paddingHorizontal: 20, borderWidth: 3, borderColor: '#fff' },
  progressText: { fontSize: 20, fontWeight: '900', color: magic.ink },
  scene: { flex: 1, marginVertical: 14, borderRadius: 48, borderWidth: 8, borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.58)', alignItems: 'center', justifyContent: 'center', padding: 14, shadowColor: '#39426b', shadowOpacity: 0.16, shadowRadius: 18, elevation: 8 },
  sparkles: { position: 'absolute', top: 16, fontSize: 28, color: '#fff' },
  objectBubble: { width: 138, height: 138, borderRadius: 69, backgroundColor: '#fff8d9', alignItems: 'center', justifyContent: 'center', borderWidth: 6, borderColor: '#fff', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 12, elevation: 5 },
  emoji: { fontSize: 76 },
  letterRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 12 },
  bigLetter: { fontSize: 154, lineHeight: 164, fontWeight: '900', textShadowColor: 'rgba(255,255,255,0.9)', textShadowRadius: 8 },
  smallLetter: { fontSize: 82, lineHeight: 98, fontWeight: '900', opacity: 0.86, marginBottom: 16 },
  words: { fontSize: 34, lineHeight: 40, fontWeight: '900', color: magic.ink, textAlign: 'center' },
  controls: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 },
  button: { minWidth: 160, minHeight: 76, borderRadius: 30, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, borderWidth: 5, borderColor: '#fff', shadowColor: '#39426b', shadowOpacity: 0.2, shadowRadius: 10, elevation: 6 },
  buttonText: { color: '#fff', fontSize: 21, lineHeight: 25, fontWeight: '900', textAlign: 'center' },
});
