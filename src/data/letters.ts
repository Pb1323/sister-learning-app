export interface AlphabetLetter {
  id: string;
  letter: string;
  lowercase: string;
  word: string;
  emoji: string;
  color: string;
  softColor: string;
}

export const alphabet: AlphabetLetter[] = [
  { id: 'A', letter: 'A', lowercase: 'a', word: 'Apple', emoji: '🍎', color: '#ff5f7e', softColor: '#ffe4ea' },
  { id: 'B', letter: 'B', lowercase: 'b', word: 'Ball', emoji: '⚽', color: '#4f8cff', softColor: '#e3eeff' },
  { id: 'C', letter: 'C', lowercase: 'c', word: 'Cat', emoji: '🐱', color: '#ffb13b', softColor: '#fff0d6' },
  { id: 'D', letter: 'D', lowercase: 'd', word: 'Dog', emoji: '🐶', color: '#8b6cff', softColor: '#ece7ff' },
  { id: 'E', letter: 'E', lowercase: 'e', word: 'Elephant', emoji: '🐘', color: '#21b6a8', softColor: '#dcfbf7' },
  { id: 'F', letter: 'F', lowercase: 'f', word: 'Fish', emoji: '🐟', color: '#2aa8ff', softColor: '#dff4ff' },
  { id: 'G', letter: 'G', lowercase: 'g', word: 'Grapes', emoji: '🍇', color: '#a95bff', softColor: '#f1e3ff' },
  { id: 'H', letter: 'H', lowercase: 'h', word: 'House', emoji: '🏠', color: '#ff8a4c', softColor: '#ffe8dc' },
  { id: 'I', letter: 'I', lowercase: 'i', word: 'Ice cream', emoji: '🍦', color: '#ff72c6', softColor: '#ffe3f5' },
  { id: 'J', letter: 'J', lowercase: 'j', word: 'Juice', emoji: '🧃', color: '#ff6b4a', softColor: '#ffe4dd' },
  { id: 'K', letter: 'K', lowercase: 'k', word: 'Kite', emoji: '🪁', color: '#32c96d', softColor: '#ddfae8' },
  { id: 'L', letter: 'L', lowercase: 'l', word: 'Lion', emoji: '🦁', color: '#f4a51c', softColor: '#fff0cb' },
  { id: 'M', letter: 'M', lowercase: 'm', word: 'Moon', emoji: '🌙', color: '#6c7cff', softColor: '#e7eaff' },
  { id: 'N', letter: 'N', lowercase: 'n', word: 'Nest', emoji: '🪺', color: '#bd7a3a', softColor: '#f6e8da' },
  { id: 'O', letter: 'O', lowercase: 'o', word: 'Orange', emoji: '🍊', color: '#ff8f1f', softColor: '#ffe9cf' },
  { id: 'P', letter: 'P', lowercase: 'p', word: 'Pig', emoji: '🐷', color: '#ff79a8', softColor: '#ffe4ee' },
  { id: 'Q', letter: 'Q', lowercase: 'q', word: 'Queen', emoji: '👑', color: '#d6a31f', softColor: '#fff3c8' },
  { id: 'R', letter: 'R', lowercase: 'r', word: 'Rainbow', emoji: '🌈', color: '#ff5b91', softColor: '#ffe1eb' },
  { id: 'S', letter: 'S', lowercase: 's', word: 'Sun', emoji: '☀️', color: '#ffbf2f', softColor: '#fff2c9' },
  { id: 'T', letter: 'T', lowercase: 't', word: 'Tree', emoji: '🌳', color: '#28b463', softColor: '#def7e8' },
  { id: 'U', letter: 'U', lowercase: 'u', word: 'Umbrella', emoji: '☂️', color: '#7d6bff', softColor: '#e9e5ff' },
  { id: 'V', letter: 'V', lowercase: 'v', word: 'Van', emoji: '🚐', color: '#3aa8a1', softColor: '#ddf5f3' },
  { id: 'W', letter: 'W', lowercase: 'w', word: 'Water', emoji: '💧', color: '#2f9bff', softColor: '#dff0ff' },
  { id: 'X', letter: 'X', lowercase: 'x', word: 'Xylophone', emoji: '🎼', color: '#ef6cbd', softColor: '#ffe2f4' },
  { id: 'Y', letter: 'Y', lowercase: 'y', word: 'Yo-yo', emoji: '🪀', color: '#ec7b22', softColor: '#ffe8d5' },
  { id: 'Z', letter: 'Z', lowercase: 'z', word: 'Zebra', emoji: '🦓', color: '#303f58', softColor: '#e5e9ef' },
];

export const getLetter = (letter?: string) => alphabet.find((item) => item.letter === letter) ?? alphabet[0];

export const letters = alphabet.map((l) => ({ id: l.id, label: l.letter, emoji: l.emoji, secondaryLabel: l.word }));
export const letterCasePairs = alphabet.map((l) => ({ id: l.id, upper: l.letter, lower: l.lowercase }));
