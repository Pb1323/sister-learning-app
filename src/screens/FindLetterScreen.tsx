import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet } from '../data/letters';
import { useSettings } from '../context/SettingsContext';
import { speak } from '../utils/speech';
import { recordFindCorrect } from '../utils/storage';
import { playCorrectSound, playRewardSound, playWrongSound } from '../utils/music';
import { BouncyCard, HomePill, MagicWorld, RewardBurst, magic } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'FindLetter'>;
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const sample = (target: string, count: number) => shuffle([target, ...shuffle(alphabet.map((l) => l.letter).filter((l) => l !== target)).slice(0, count - 1)]);
const randomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)].letter;

export default function FindLetterScreen({ navigation }: Props) {
  const { settings } = useSettings();
  const [target, setTarget] = useState(randomLetter());
  const [reward, setReward] = useState(false);
  const [message, setMessage] = useState('Tap the matching letter.');
  const [wrong, setWrong] = useState<string>();
  const [roundReady, setRoundReady] = useState(false);
  const choices = useMemo(() => sample(target, settings.difficulty), [target, settings.difficulty]);

  const ask = () => speak(`Find ${target}`);
  const next = () => { const n = randomLetter(); setTarget(n); setMessage('Tap the matching letter.'); setRoundReady(false); setWrong(undefined); setTimeout(() => speak(`Find ${n}`), 120); };
  const choose = (letter: string) => {
    if (letter === target) {
      speak(`You found ${target}. Well done!`);
      playCorrectSound();
      playRewardSound();
      recordFindCorrect();
      setMessage('You found it!');
      setReward(true);
      setRoundReady(true);
      setTimeout(() => setReward(false), 1100);
      return;
    }
    setWrong(letter);
    setMessage('Try again.');
    playWrongSound();
    speak(`Try again. Find ${target}`);
    setTimeout(() => setWrong(undefined), 500);
  };

  return (
    <MagicWorld reducedMotion={settings.reducedMotion} tint="#b8ecff">
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}><HomePill onPress={() => navigation.navigate('Home')} /><BouncyCard reducedMotion={settings.reducedMotion} onPress={ask} style={styles.repeat}><Text style={styles.repeatText}>🔊 Repeat</Text></BouncyCard></View>
        <View style={styles.bubble}><Text style={styles.bubbleSmall}>Magic cloud says...</Text><Text style={styles.prompt}>Find {target}</Text><Text style={styles.message}>{message}</Text></View>
        <View style={styles.choices}>{choices.map((letter, index) => <BouncyCard key={letter} reducedMotion={settings.reducedMotion} disabled={roundReady} onPress={() => choose(letter)} style={[styles.choice, wrong === letter && styles.wrong, { transform: [{ rotate: index % 2 ? '2deg' : '-2deg' }] }]}><Text style={styles.choiceStar}>✦</Text><Text style={styles.letter}>{letter}</Text></BouncyCard>)}</View>
        {roundReady && <BouncyCard reducedMotion={settings.reducedMotion} onPress={next} style={styles.next}><Text style={styles.nextText}>Next Round ✨</Text></BouncyCard>}
        <RewardBurst show={reward} message="You found it!" reducedMotion={settings.reducedMotion} />
      </SafeAreaView>
    </MagicWorld>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  repeat: { minHeight: 58, borderRadius: 30, backgroundColor: '#fff', paddingHorizontal: 22, justifyContent: 'center', borderWidth: 3, borderColor: '#fff8d9' },
  repeatText: { fontSize: 22, fontWeight: '900', color: '#31546b' },
  bubble: { marginTop: 18, alignSelf: 'center', width: '100%', maxWidth: 560, backgroundColor: '#fff', borderRadius: 42, borderWidth: 7, borderColor: '#fff8d9', padding: 20, alignItems: 'center', shadowColor: '#39426b', shadowOpacity: 0.16, shadowRadius: 14, elevation: 7 },
  bubbleSmall: { fontSize: 20, fontWeight: '900', color: '#607080' },
  prompt: { fontSize: 64, lineHeight: 72, fontWeight: '900', color: magic.pink, textAlign: 'center' },
  message: { minHeight: 30, fontSize: 22, fontWeight: '900', color: magic.ink, textAlign: 'center' },
  choices: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', gap: 18, paddingVertical: 12 },
  choice: { width: 148, height: 150, borderRadius: 42, backgroundColor: '#fff8d9', borderWidth: 8, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#39426b', shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 },
  wrong: { borderColor: '#ff9aa8', backgroundColor: '#ffe7eb' },
  choiceStar: { position: 'absolute', top: 8, right: 14, color: '#ffd45c', fontSize: 24 },
  letter: { fontSize: 86, lineHeight: 94, fontWeight: '900', color: magic.deepBlue },
  next: { alignSelf: 'center', minWidth: 230, minHeight: 76, borderRadius: 36, backgroundColor: magic.green, borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  nextText: { fontSize: 26, fontWeight: '900', color: '#fff' },
});
