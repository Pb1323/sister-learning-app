import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import RewardOverlay from '../components/RewardOverlay';
import ScreenHeader from '../components/ScreenHeader';
import { letterCasePairs } from '../data/letters';
import { sample, shuffle } from '../utils/shuffle';
import { speak } from '../utils/speech';
import { recordAnswer, recordSessionComplete } from '../utils/storage';

const ROUND_SIZE = 4;
const PROGRESS_ID = 'letters';

function buildRound() {
  const pairs = sample(letterCasePairs, ROUND_SIZE);
  return { uppers: pairs, lowers: shuffle(pairs) };
}

// Matches uppercase letters to their lowercase form — tap one from each
// column. Complements the generic 4-level engine used by every other
// category with a skill that's specific to letters.
export default function LetterCaseMatchScreen() {
  const [round, setRound] = useState(() => buildRound());
  const [selectedUpper, setSelectedUpper] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [reward, setReward] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpperPress = (id: string) => {
    if (matched.has(id)) return;
    setSelectedUpper(id);
    speak(round.uppers.find((p) => p.id === id)!.upper);
  };

  const handleLowerPress = (id: string) => {
    if (matched.has(id) || !selectedUpper) return;
    if (id === selectedUpper) {
      recordAnswer(PROGRESS_ID, true);
      const updated = new Set(matched);
      updated.add(id);
      setMatched(updated);
      setSelectedUpper(null);
      setReward(true);
      setTimeout(() => setReward(false), 500);
      if (updated.size === round.uppers.length) {
        recordSessionComplete(PROGRESS_ID);
        setTimeout(() => setDone(true), 600);
      }
    } else {
      recordAnswer(PROGRESS_ID, false);
    }
  };

  const playAgain = () => {
    setDone(false);
    setMatched(new Set());
    setSelectedUpper(null);
    setRound(buildRound());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Aa Match the Letters" color="#ef5350" />
      {done ? (
        <View style={styles.center}>
          <RewardOverlay visible message="Great job!" />
          <BigButton label="Play Again" emoji="🔁" color="#43a047" onPress={playAgain} />
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.prompt}>Tap a big letter, then its small letter</Text>
          <View style={styles.columns}>
            <View style={styles.column}>
              {round.uppers.map((p) => (
                <BigButton
                  key={p.id}
                  label={p.upper}
                  color="#ef5350"
                  size={80}
                  faded={matched.has(p.id)}
                  selected={selectedUpper === p.id}
                  onPress={() => handleUpperPress(p.id)}
                />
              ))}
            </View>
            <View style={styles.column}>
              {round.lowers.map((p) => (
                <BigButton
                  key={p.id}
                  label={p.lower}
                  color="#f8bbd0"
                  size={80}
                  faded={matched.has(p.id)}
                  onPress={() => handleLowerPress(p.id)}
                />
              ))}
            </View>
          </View>
        </View>
      )}
      <RewardOverlay visible={reward} message="Well done!" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  prompt: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#37474f', textAlign: 'center', paddingHorizontal: 12 },
  columns: { flexDirection: 'row' },
  column: { marginHorizontal: 12 },
});
