import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import RewardOverlay from '../components/RewardOverlay';
import ScreenHeader from '../components/ScreenHeader';
import { colors } from '../data/colors';
import { coloredObjects, ColoredObject } from '../data/coloredObjects';
import { sample, shuffle } from '../utils/shuffle';
import { speak } from '../utils/speech';
import { recordAnswer, recordSessionComplete } from '../utils/storage';

const ROUNDS = 4;
const PROGRESS_ID = 'bonus-find-colour';

function buildRound() {
  const targetColor = sample(colors, 1)[0];
  const matches = sample(
    coloredObjects.filter((o) => o.colorId === targetColor.id),
    Math.min(3, coloredObjects.filter((o) => o.colorId === targetColor.id).length)
  );
  const distractors = sample(
    coloredObjects.filter((o) => o.colorId !== targetColor.id),
    5
  );
  const board = shuffle([...matches, ...distractors]);
  return { targetColor, matchIds: new Set(matches.map((m) => m.id)), board };
}

export default function FindColourScreen() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [round, setRound] = useState(() => buildRound());
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());
  const [reward, setReward] = useState(false);
  const [done, setDone] = useState(false);

  const announce = () => speak(`Tap all the ${round.targetColor.label} things!`);

  const nextRound = () => {
    if (roundIndex + 1 >= ROUNDS) {
      recordSessionComplete(PROGRESS_ID);
      setDone(true);
    } else {
      setRoundIndex((i) => i + 1);
      setRound(buildRound());
      setFoundIds(new Set());
    }
  };

  const handlePress = (item: ColoredObject) => {
    if (foundIds.has(item.id)) return;
    if (round.matchIds.has(item.id)) {
      recordAnswer(PROGRESS_ID, true);
      const updated = new Set(foundIds);
      updated.add(item.id);
      setFoundIds(updated);
      setReward(true);
      setTimeout(() => setReward(false), 500);
      if (updated.size === round.matchIds.size) {
        setTimeout(nextRound, 700);
      }
    } else {
      recordAnswer(PROGRESS_ID, false);
    }
  };

  const playAgain = () => {
    setDone(false);
    setRoundIndex(0);
    setRound(buildRound());
    setFoundIds(new Set());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="🌈 Tap the Colour" color="#ab47bc" />
      {done ? (
        <View style={styles.center}>
          <RewardOverlay visible message="Great job!" />
          <BigButton label="Play Again" emoji="🔁" color="#43a047" onPress={playAgain} />
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.prompt}>Tap all the {round.targetColor.label} things!</Text>
          <View style={[styles.swatch, { backgroundColor: round.targetColor.color }]} />
          <View style={styles.row}>
            {round.board.map((item) => (
              <BigButton
                key={item.id}
                label={item.label}
                emoji={item.emoji}
                color="#78909c"
                faded={foundIds.has(item.id)}
                size={100}
                onPress={() => handlePress(item)}
              />
            ))}
          </View>
          <BigButton label="🔁 Hear again" emoji="" color="#90a4ae" size={70} onPress={announce} />
        </View>
      )}
      <RewardOverlay visible={reward} message="Well done!" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  prompt: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#37474f', textAlign: 'center', paddingHorizontal: 12 },
  swatch: { width: 50, height: 50, borderRadius: 12, marginBottom: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 },
});
