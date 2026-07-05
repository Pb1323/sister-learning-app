import * as Speech from 'expo-speech';

let enabled = true;

export const setSpeechEnabled = (value: boolean) => {
  enabled = value;
};

export const speak = (text: string) => {
  if (!enabled || !text) return;
  Speech.stop();
  Speech.speak(text, { pitch: 1.1, rate: 0.85 });
};
