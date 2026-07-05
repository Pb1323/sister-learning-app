import { Item } from './types';

// Each letter pairs with a familiar picture word, e.g. A = Apple.
export const letters: Item[] = [
  { id: 'A', label: 'A', emoji: '🍎', secondaryLabel: 'Apple' },
  { id: 'B', label: 'B', emoji: '⚽', secondaryLabel: 'Ball' },
  { id: 'C', label: 'C', emoji: '🐱', secondaryLabel: 'Cat' },
  { id: 'D', label: 'D', emoji: '🐶', secondaryLabel: 'Dog' },
  { id: 'E', label: 'E', emoji: '🐘', secondaryLabel: 'Elephant' },
  { id: 'F', label: 'F', emoji: '🐟', secondaryLabel: 'Fish' },
  { id: 'G', label: 'G', emoji: '🍇', secondaryLabel: 'Grapes' },
  { id: 'H', label: 'H', emoji: '🏠', secondaryLabel: 'House' },
  { id: 'I', label: 'I', emoji: '🍦', secondaryLabel: 'Ice cream' },
  { id: 'J', label: 'J', emoji: '🧃', secondaryLabel: 'Juice' },
  { id: 'K', label: 'K', emoji: '🔑', secondaryLabel: 'Key' },
  { id: 'L', label: 'L', emoji: '🦁', secondaryLabel: 'Lion' },
  { id: 'M', label: 'M', emoji: '🌙', secondaryLabel: 'Moon' },
  { id: 'N', label: 'N', emoji: '👃', secondaryLabel: 'Nose' },
  { id: 'O', label: 'O', emoji: '🍊', secondaryLabel: 'Orange' },
  { id: 'P', label: 'P', emoji: '🐷', secondaryLabel: 'Pig' },
  { id: 'Q', label: 'Q', emoji: '👑', secondaryLabel: 'Queen' },
  { id: 'R', label: 'R', emoji: '🌈', secondaryLabel: 'Rainbow' },
  { id: 'S', label: 'S', emoji: '☀️', secondaryLabel: 'Sun' },
  { id: 'T', label: 'T', emoji: '🌳', secondaryLabel: 'Tree' },
  { id: 'U', label: 'U', emoji: '☂️', secondaryLabel: 'Umbrella' },
  { id: 'V', label: 'V', emoji: '🚐', secondaryLabel: 'Van' },
  { id: 'W', label: 'W', emoji: '⌚', secondaryLabel: 'Watch' },
  { id: 'X', label: 'X', emoji: '🎷', secondaryLabel: 'Xylophone' },
  { id: 'Y', label: 'Y', emoji: '🪀', secondaryLabel: 'Yo-yo' },
  { id: 'Z', label: 'Z', emoji: '🦓', secondaryLabel: 'Zebra' },
];

// Uppercase/lowercase pairs, used by the matching activity.
export const letterCasePairs = letters.map((l) => ({
  id: l.id,
  upper: l.label,
  lower: l.label.toLowerCase(),
}));
