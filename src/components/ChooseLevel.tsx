import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Item } from '../data/types';
import BigButton from './BigButton';
import { speak } from '../utils/speech';
import { sample, shuffle } from '../utils/shuffle';

interface Round {
  target: Item;
  options: Item[];
}

interface Props {
  items: Item[];
  rounds?: number;
  onCorrect: () => void;
  onWrong: () => void;
  onComplete: () => void;
}

// Level 3: "Listen and choose" — hear/see the target, tap it among 3-4 options.
export default function ChooseLevel({ items, rounds = 6, onCorrect, onWrong, onComplete }: Props) {
  const totalRounds = Math.min(rounds, items.length);
  const gameRounds = useMemo<Round[]>(() => {
    const targets = sample(items, totalRounds);
    return targets.map((target) => {
      const distractors = sample(
        items.filter((i) => i.id !== target.id),
        Math.min(3, items.length - 1)
      );
      return { target, options: shuffle([target, ...distractors]) };
    });
  }, [items, totalRounds]);

  const [roundIndex, setRoundIndex] = useState(0);
  const round = gameRounds[roundIndex];

  const announce = () => {
    if (round) speak(`Find ${round.target.label}`);
  };

  useEffect(() => {
    announce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex]);

  if (!round) return null;

  const handlePress = (option: Item) => {
    if (option.id === round.target.id) {
      onCorrect();
      speak('Yes! Well done!');
      setTimeout(() => {
        if (roundIndex + 1 >= gameRounds.length) onComplete();
        else setRoundIndex((i) => i + 1);
      }, 900);
    } else {
      onWrong();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Find: {round.target.label}</Text>
      <BigButton
        label=""
        emoji={round.target.emoji}
        color={round.target.color ?? '#5c6bc0'}
        onPress={announce}
        size={110}
      />
      <Text style={styles.repeatHint}>🔁 Tap to hear again</Text>
      <View style={styles.optionsRow}>
        {round.options.map((option) => (
          <BigButton
            key={option.id}
            label={option.label}
            emoji={option.emoji}
            color={option.color ?? '#5c6bc0'}
            onPress={() => handlePress(option)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  prompt: { fontSize: 22, fontWeight: '700', marginVertical: 8, color: '#37474f' },
  repeatHint: { fontSize: 14, color: '#78909c', marginBottom: 12 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
