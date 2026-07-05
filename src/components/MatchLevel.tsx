import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Item } from '../data/types';
import BigButton from './BigButton';
import { speak } from '../utils/speech';
import { sample, shuffle } from '../utils/shuffle';

interface Card {
  cardId: string;
  item: Item;
}

interface Props {
  items: Item[];
  onCorrect: () => void;
  onWrong: () => void;
  onComplete: () => void;
}

// Level 2: memory-card matching. Flip two cards; matching pairs stay open.
export default function MatchLevel({ items, onCorrect, onWrong, onComplete }: Props) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());

  useEffect(() => {
    const chosen = sample(items, Math.min(4, items.length));
    const pairCards = shuffle(
      chosen.flatMap((item) => [
        { cardId: `${item.id}-a`, item },
        { cardId: `${item.id}-b`, item },
      ])
    );
    setCards(pairCards);
    setFlipped([]);
    setMatched(new Set());
  }, [items]);

  const totalPairs = cards.length / 2;

  const handlePress = (card: Card) => {
    if (flipped.includes(card.cardId) || matched.has(card.item.id) || flipped.length === 2) return;
    speak(card.item.label);
    const next = [...flipped, card.cardId];
    setFlipped(next);

    if (next.length === 2) {
      const [firstId, secondId] = next;
      const first = cards.find((c) => c.cardId === firstId)!;
      const second = cards.find((c) => c.cardId === secondId)!;
      if (first.item.id === second.item.id) {
        onCorrect();
        setTimeout(() => {
          setMatched((prev) => {
            const updated = new Set(prev);
            updated.add(first.item.id);
            if (updated.size === totalPairs) setTimeout(onComplete, 400);
            return updated;
          });
          setFlipped([]);
        }, 500);
      } else {
        onWrong();
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Find the matching pairs!</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {cards.map((card) => {
          const isFaceUp = flipped.includes(card.cardId) || matched.has(card.item.id);
          return (
            <BigButton
              key={card.cardId}
              label={isFaceUp ? card.item.label : ''}
              emoji={isFaceUp ? card.item.emoji : '❓'}
              color={isFaceUp ? card.item.color ?? '#5c6bc0' : '#90a4ae'}
              faded={matched.has(card.item.id)}
              size={100}
              onPress={() => handlePress(card)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  prompt: { fontSize: 22, fontWeight: '700', marginVertical: 8, color: '#37474f' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 40 },
});
