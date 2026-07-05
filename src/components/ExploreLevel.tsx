import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Item } from '../data/types';
import BigButton from './BigButton';
import { speak } from '../utils/speech';

interface Props {
  items: Item[];
  onCorrect: () => void;
}

// Level 1: tap any picture to see and hear it. No wrong answers — pure
// recognition practice.
export default function ExploreLevel({ items, onCorrect }: Props) {
  const [selected, setSelected] = useState<Item | null>(null);

  const handlePress = (item: Item) => {
    setSelected(item);
    speak(item.secondaryLabel ? `${item.label}. ${item.secondaryLabel}` : item.label);
    onCorrect();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Tap a picture to hear it!</Text>
      {selected ? (
        <Text style={styles.caption}>
          {selected.label}
          {selected.secondaryLabel ? ` — ${selected.secondaryLabel}` : ''}
        </Text>
      ) : null}
      <ScrollView contentContainerStyle={styles.grid}>
        {items.map((item) => (
          <BigButton
            key={item.id}
            label={item.label}
            emoji={item.emoji}
            color={item.color ?? '#5c6bc0'}
            selected={selected?.id === item.id}
            onPress={() => handlePress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  prompt: { fontSize: 22, fontWeight: '700', marginVertical: 8, color: '#37474f' },
  caption: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: '#5c6bc0' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 40 },
});
