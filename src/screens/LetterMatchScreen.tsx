import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { alphabet, AlphabetLetter } from '../data/letters';
import { speak } from '../utils/speech';
import { recordMatchCorrect } from '../utils/storage';
import { playCorrectSound, playRewardSound, playWrongSound } from '../utils/music';
import { BouncyCard, HomePill, MagicWorld, RewardBurst, magic } from '../components/AlphabetUI';
import { useSettings } from '../context/SettingsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'LetterMatch'>;
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const makeRound = () => shuffle(alphabet).slice(0, 3);

export default function LetterMatchScreen({ navigation }: Props) {
  const { settings } = useSettings();
  const [round, setRound] = useState<AlphabetLetter[]>(makeRound());
  const [picked, setPicked] = useState<string>();
  const [matched, setMatched] = useState<string[]>([]);
  const [reward, setReward] = useState(false);
  const lowers = useMemo(() => shuffle(round), [round]);

  const startNextRound = () => { setRound(makeRound()); setPicked(undefined); setMatched([]); setReward(false); };
  const pickLower = (letter: string) => {
    if (!picked || matched.includes(letter)) return;
    if (picked === letter) {
      speak(`${picked} matches ${letter.toLowerCase()}. Great!`);
      playCorrectSound();
      recordMatchCorrect();
      const nextMatched = [...matched, letter];
      setMatched(nextMatched);
      setPicked(undefined);
      if (nextMatched.length === round.length) {
        playRewardSound();
        setReward(true);
      }
      return;
    }
    playWrongSound();
    speak('Try again');
  };

  return (
    <MagicWorld reducedMotion={settings.reducedMotion} tint="#d9f8ff">
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}><HomePill onPress={() => navigation.navigate('Home')} /><Text style={styles.title}>Match Magic</Text></View>
        <View style={styles.tip}><Text style={styles.tipText}>Tap a BIG letter, then tap its small letter.</Text></View>
        <Text style={styles.section}>BIG letters</Text>
        <View style={styles.row}>{round.map((item) => <BouncyCard key={item.letter} reducedMotion={settings.reducedMotion} disabled={matched.includes(item.letter)} onPress={() => { setPicked(item.letter); speak(item.letter); }} style={[styles.upperCard, { backgroundColor: item.color }, picked === item.letter && styles.selected, matched.includes(item.letter) && styles.matched]}><Text style={styles.cardStar}>{matched.includes(item.letter) ? '⭐' : picked === item.letter ? '✨' : '✦'}</Text><Text style={styles.upper}>{item.letter}</Text></BouncyCard>)}</View>
        <Text style={styles.section}>small letters</Text>
        <View style={styles.row}>{lowers.map((item) => <BouncyCard key={item.lowercase} reducedMotion={settings.reducedMotion} disabled={matched.includes(item.letter)} onPress={() => pickLower(item.letter)} style={[styles.lowerCard, matched.includes(item.letter) && styles.matched]}><Text style={styles.cardStar}>{matched.includes(item.letter) ? '⭐' : '✦'}</Text><Text style={styles.lower}>{item.lowercase}</Text></BouncyCard>)}</View>
        {matched.length === round.length && <BouncyCard reducedMotion={settings.reducedMotion} onPress={startNextRound} style={styles.next}><Text style={styles.nextText}>New Match Round ✨</Text></BouncyCard>}
        <RewardBurst show={reward} message="All matched!" reducedMotion={settings.reducedMotion} />
      </SafeAreaView>
    </MagicWorld>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  title: { fontSize: 38, lineHeight: 42, fontWeight: '900', color: magic.ink },
  tip: { marginVertical: 14, alignSelf: 'center', maxWidth: 560, borderRadius: 30, backgroundColor: '#fff8d9', borderWidth: 4, borderColor: '#fff', padding: 14 },
  tipText: { fontSize: 22, lineHeight: 28, fontWeight: '900', color: '#426070', textAlign: 'center' },
  section: { fontSize: 25, fontWeight: '900', color: magic.ink, textAlign: 'center', marginBottom: 8 },
  row: { flex: 1, minHeight: 145, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 10 },
  upperCard: { width: 132, height: 150, borderRadius: 38, borderWidth: 6, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#39426b', shadowOpacity: 0.2, shadowRadius: 12, elevation: 7 },
  lowerCard: { width: 132, height: 150, borderRadius: 38, backgroundColor: magic.purple, borderWidth: 6, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#39426b', shadowOpacity: 0.2, shadowRadius: 12, elevation: 7 },
  selected: { borderColor: '#fff4a9', shadowColor: '#ffd45c', shadowOpacity: 0.55 },
  matched: { backgroundColor: magic.green, borderColor: '#fff4a9' },
  cardStar: { position: 'absolute', top: 8, right: 12, fontSize: 22, color: '#fff8d9' },
  upper: { fontSize: 78, lineHeight: 86, color: '#fff', fontWeight: '900' },
  lower: { fontSize: 78, lineHeight: 86, color: '#fff', fontWeight: '900' },
  next: { alignSelf: 'center', minWidth: 260, minHeight: 72, borderRadius: 36, backgroundColor: magic.pink, borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  nextText: { fontSize: 24, fontWeight: '900', color: '#fff' },
});
