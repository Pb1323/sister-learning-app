import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import RewardOverlay from '../components/RewardOverlay';
import ScreenHeader from '../components/ScreenHeader';
import { categories } from '../data/categories';
import { Item } from '../data/types';
import { sample, shuffle } from '../utils/shuffle';
import { speak } from '../utils/speech';
import { recordAnswer, recordSessionComplete } from '../utils/storage';

const ROUNDS = 5;
const PROGRESS_ID = 'bonus-odd-one-out';

interface Round {
  options: Item[];
  oddId: string;
}

function buildRound(): Round {
  const [mainCat, otherCat] = sample(categories, 2);
  const three = sample(mainCat.items, 3);
  const odd = sample(otherCat.items, 1)[0];
  return { options: shuffle([...three, odd]), oddId: odd.id };
}

export default function OddOneOutScreen() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [round, setRound] = useState<Round>(() => buildRound());
  const [reward, setReward] = useState(false);
  const [done, setDone] = useState(false);

  const announce = () => speak('Find the one that is different!');

  const handlePress = (item: Item) => {
    if (item.id === round.oddId) {
      recordAnswer(PROGRESS_ID, true);
      setReward(true);
      speak('Yes! Well done!');
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
      <ScreenHeader title="🔍 Odd One Out" color="#7e57c2" />
      {done ? (
        <View style={styles.center}>
          <RewardOverlay visible message="Great job!" />
          <BigButton label="Play Again" emoji="🔁" color="#43a047" onPress={playAgain} />
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.prompt}>Which one is different?</Text>
          <View style={styles.row}>
            {round.options.map((item) => (
              <BigButton key={item.id} label={item.label} emoji={item.emoji} color={item.color ?? '#5c6bc0'} onPress={() => handlePress(item)} />
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
  prompt: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: '#37474f' },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 16 },
});
