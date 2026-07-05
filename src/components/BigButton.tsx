import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSettings, buttonSizeToDimension } from '../context/SettingsContext';

interface Props {
  label: string;
  emoji?: string;
  color?: string;
  onPress: () => void;
  selected?: boolean;
  faded?: boolean;
  size?: number;
}

function emojiFontSize(emoji: string) {
  // Long emoji strings (e.g. number-of-dots visuals) need to shrink and
  // wrap instead of overflowing the fixed-size button.
  if (emoji.length <= 3) return 42;
  return Math.max(14, 42 - (emoji.length - 3) * 2);
}

// Light swatches (e.g. yellow, white in the Colours category) need dark
// text — a fixed white label would be unreadable on them.
function textColorFor(background: string) {
  const hex = background.replace('#', '');
  if (hex.length !== 6) return 'white';
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.65 ? '#263238' : 'white';
}

export default function BigButton({ label, emoji, color, onPress, selected, faded, size }: Props) {
  const { settings } = useSettings();
  const scale = useRef(new Animated.Value(1)).current;
  const dimension = size ?? buttonSizeToDimension[settings.buttonSize];
  const labelColor = textColorFor(color ?? '#5c6bc0');

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.button,
          {
            width: dimension,
            height: dimension,
            backgroundColor: color ?? '#5c6bc0',
            transform: [{ scale }],
            opacity: faded ? 0.4 : 1,
            borderWidth: selected ? 6 : 0,
            borderColor: '#fff59d',
            borderBottomWidth: selected ? 6 : 6,
            borderBottomColor: selected ? '#fff59d' : 'rgba(0,0,0,0.18)',
          },
        ]}
      >
        {emoji ? (
          <Text style={[styles.emoji, { fontSize: emojiFontSize(emoji) }]} numberOfLines={3}>
            {emoji}
          </Text>
        ) : null}
        {label ? (
          <Text numberOfLines={2} style={[styles.label, { color: labelColor }]}>
            {label}
          </Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    padding: 6,
    overflow: 'hidden',
  },
  emoji: {
    fontSize: 42,
    textAlign: 'center',
  },
  label: {
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 2,
  },
});
