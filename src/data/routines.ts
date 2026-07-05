import { Routine } from './types';

export const routines: Routine[] = [
  {
    id: 'morning',
    title: 'Morning',
    emoji: '🌅',
    color: '#ffb74d',
    steps: [
      { id: 'wake', label: 'Wake up', emoji: '⏰' },
      { id: 'wash', label: 'Wash face', emoji: '🧼' },
      { id: 'dress', label: 'Get dressed', emoji: '👕' },
      { id: 'breakfast', label: 'Eat breakfast', emoji: '🥣' },
    ],
  },
  {
    id: 'mealtime',
    title: 'Meal Time',
    emoji: '🍽️',
    color: '#ef5350',
    steps: [
      { id: 'wash-hands', label: 'Wash hands', emoji: '🧼' },
      { id: 'sit', label: 'Sit at table', emoji: '🪑' },
      { id: 'eat', label: 'Eat food', emoji: '🍽️' },
      { id: 'clean-up', label: 'Clean up', emoji: '🧽' },
    ],
  },
  {
    id: 'learning',
    title: 'School Time',
    emoji: '📚',
    color: '#42a5f5',
    steps: [
      { id: 'sit-down', label: 'Sit down', emoji: '🪑' },
      { id: 'learn', label: 'Learn together', emoji: '📚' },
      { id: 'practice', label: 'Practice', emoji: '✏️' },
      { id: 'well-done', label: 'Well done!', emoji: '⭐' },
    ],
  },
  {
    id: 'playtime',
    title: 'Play Time',
    emoji: '🧸',
    color: '#66bb6a',
    steps: [
      { id: 'choose-toy', label: 'Choose a toy', emoji: '🧸' },
      { id: 'play', label: 'Play', emoji: '🎈' },
      { id: 'share', label: 'Share turns', emoji: '🤝' },
      { id: 'tidy-up', label: 'Tidy up', emoji: '🧹' },
    ],
  },
  {
    id: 'bedtime',
    title: 'Bedtime',
    emoji: '🌙',
    color: '#7e57c2',
    steps: [
      { id: 'bath', label: 'Bath time', emoji: '🛁' },
      { id: 'pajamas', label: 'Put on pyjamas', emoji: '👘' },
      { id: 'story', label: 'Story time', emoji: '📖' },
      { id: 'sleep', label: 'Sleep', emoji: '😴' },
    ],
  },
];
