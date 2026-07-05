import { Category } from './types';
import { letters } from './letters';
import { numbers } from './numbers';
import { colors } from './colors';
import { animals } from './animals';
import { vehicles } from './vehicles';
import { emotions } from './emotions';

// Central registry. Add a new learning category by adding one entry here
// plus a data file like the ones in this folder.
export const categories: Category[] = [
  { id: 'letters', title: 'Letters', emoji: '🔤', color: '#ef5350', items: letters },
  { id: 'numbers', title: 'Numbers', emoji: '🔢', color: '#42a5f5', items: numbers },
  { id: 'colours', title: 'Colours', emoji: '🎨', color: '#ab47bc', items: colors },
  { id: 'animals', title: 'Animals', emoji: '🐾', color: '#66bb6a', items: animals },
  { id: 'vehicles', title: 'Vehicles', emoji: '🚗', color: '#ffa726', items: vehicles },
  { id: 'emotions', title: 'Emotions', emoji: '🙂', color: '#26c6da', items: emotions },
];

export const getCategory = (id: string) => categories.find((c) => c.id === id);
