export interface ColoredObject {
  id: string;
  label: string;
  emoji: string;
  colorId: string;
}

// Small pool of real-world objects tagged by colour, used by the
// "Tap all the [colour] things" bonus game.
export const coloredObjects: ColoredObject[] = [
  { id: 'apple', label: 'Apple', emoji: '🍎', colorId: 'red' },
  { id: 'strawberry', label: 'Strawberry', emoji: '🍓', colorId: 'red' },
  { id: 'firetruck', label: 'Fire truck', emoji: '🚒', colorId: 'red' },
  { id: 'banana', label: 'Banana', emoji: '🍌', colorId: 'yellow' },
  { id: 'sun', label: 'Sun', emoji: '☀️', colorId: 'yellow' },
  { id: 'duck', label: 'Duck', emoji: '🐥', colorId: 'yellow' },
  { id: 'blueberry', label: 'Blueberry', emoji: '🫐', colorId: 'blue' },
  { id: 'whale', label: 'Whale', emoji: '🐳', colorId: 'blue' },
  { id: 'jeans', label: 'Jeans', emoji: '👖', colorId: 'blue' },
  { id: 'frog', label: 'Frog', emoji: '🐸', colorId: 'green' },
  { id: 'tree', label: 'Tree', emoji: '🌳', colorId: 'green' },
  { id: 'cucumber', label: 'Cucumber', emoji: '🥒', colorId: 'green' },
  { id: 'orange', label: 'Orange', emoji: '🍊', colorId: 'orange' },
  { id: 'carrot', label: 'Carrot', emoji: '🥕', colorId: 'orange' },
  { id: 'fox', label: 'Fox', emoji: '🦊', colorId: 'orange' },
  { id: 'grapes', label: 'Grapes', emoji: '🍇', colorId: 'purple' },
  { id: 'eggplant', label: 'Eggplant', emoji: '🍆', colorId: 'purple' },
];
