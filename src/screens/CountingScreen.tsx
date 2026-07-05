import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import RewardOverlay from '../components/RewardOverlay';
import ScreenHeader from '../components/ScreenHeader';
import { sample, shuffle } from '../utils/shuffle';
import { speak } from '../utils/speech';
import { recordAnswer, recordSessionComplete } from '../utils/storage';

const ROUNDS = 5;
const PROGRESS_ID = 'bonus-counting';
const OBJECT_EMOJIS = ['🍎', '⭐', '🎈', '🐶', '🚗', '⚽'];

function buildRound() {
  const count = 2 + Math.floor(Math.random() * 5); // 2-6
  const emoji = sample(OBJECT_EMOJIS, 1)[0];
  const wrongOptions = sample(
    [2, 3, 4, 5, 6].filter((n) => n !== count),
    2
  );
  const options = shuffle([count, ...wrongOptions]);
  return { count, emoji, options };
}

export default function CountingScreen() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [round, setRound] = useState(() => buildRound());
  const [reward, setReward] = useState(false);
  const [done, setDone] = useState(false);

  const announce = () => speak('How many do you see?');

  const handlePress = (option: number) => {
    if (option === round.count) {
      recordAnswer(PROGRESS_ID, true);
      setReward(true);
      speak(`Yes! ${round.count}!`);
      setTimeout(() => {
        setReward(false);
        if (roundIndex + 1 >= ROUNDS) {
          recordSessionComplete(PROGRESS_ID);
          setDone(true);
        } else {
          setRoundIndex((i) => i + 1);
          setRound(buildRound());
        }
      }, 800);
    } else {
      recordAnswer(PROGRESS_ID, false);
    }
  };

  const playAgain = () => {
    setDone(false);
    setRoundIndex(0);
    setRound(buildRound());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="🔢 Count It" color="#42a5f5" />
      {done ? (
        <View style={styles.center}>
          <RewardOverlay visible message="Great job!" />
          <BigButton label="Play Again" emoji="🔁" color="#43a047" onPress={playAgain} />
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.prompt}>How many do you see?</Text>
          <Text style={styles.objectRow}>{Array(round.count).fill(round.emoji).join(' ')}</Text>
          <View style={styles.row}>
            {round.options.map((option) => (
              <BigButton key={option} label={String(option)} emoji="" color="#42a5f5" onPress={() => handlePress(option)} />
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
  prompt: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#37474f' },
  objectRow: { fontSize: 40, marginBottom: 16, maxWidth: 320, textAlign: 'center' },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 },
});
