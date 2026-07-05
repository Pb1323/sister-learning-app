import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Item } from '../data/types';
import BigButton from './BigButton';
import { speak } from '../utils/speech';
import { shuffle } from '../utils/shuffle';

interface Props {
  items: Item[];
  onCorrect: () => void;
  onWrong: () => void;
  onComplete: () => void;
}

// Level 4: simple sequencing — tap items in their correct order (e.g. 1-2-3
// or A-B-C), taken directly from the category's natural order.
export default function SequenceLevel({ items, onCorrect, onWrong, onComplete }: Props) {
  const size = Math.min(4, items.length);
  const sequence = useMemo(() => {
    const start = Math.max(0, Math.floor(Math.random() * (items.length - size + 1)));
    return items.slice(start, start + size);
  }, [items, size]);
  const shuffled = useMemo(() => shuffle(sequence), [sequence]);

  const [placed, setPlaced] = useState<Item[]>([]);
  const nextExpected = sequence[placed.length];

  const handlePress = (item: Item) => {
    if (placed.find((p) => p.id === item.id)) return;
    if (item.id === nextExpected.id) {
      speak(item.label);
      onCorrect();
      const updated = [...placed, item];
      setPlaced(updated);
      if (updated.length === sequence.length) {
        setTimeout(onComplete, 700);
      }
    } else {
      onWrong();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Put them in order!</Text>
      <View style={styles.builtRow}>
        {sequence.map((item, i) => {
          const isPlaced = i < placed.length;
          return (
            <View key={item.id} style={styles.slot}>
              <Text style={styles.slotEmoji}>{isPlaced ? item.emoji : '⬜'}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.optionsRow}>
        {shuffled.map((item) => (
          <BigButton
            key={item.id}
            label={item.label}
            emoji={item.emoji}
            color={item.color ?? '#5c6bc0'}
            faded={!!placed.find((p) => p.id === item.id)}
            onPress={() => handlePress(item)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  prompt: { fontSize: 22, fontWeight: '700', marginVertical: 8, color: '#37474f' },
  builtRow: { flexDirection: 'row', marginBottom: 20 },
  slot: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#b0bec5',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
  },
  slotEmoji: { fontSize: 30 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
