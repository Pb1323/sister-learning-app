import { Item } from './types';

// Dots are grouped 5-per-row so counts above 10 stay readable instead of
// overflowing into one long unbroken line.
const dot = (n: number) => {
  const rows: string[] = [];
  for (let i = 0; i < n; i += 5) {
    rows.push('⚫'.repeat(Math.min(5, n - i)));
  }
  return rows.join('\n');
};

export const numbers: Item[] = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1;
  return {
    id: String(n),
    label: String(n),
    emoji: dot(n),
    secondaryLabel: `${n} dot${n > 1 ? 's' : ''}`,
  };
});
