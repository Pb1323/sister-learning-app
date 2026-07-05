import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const CONFETTI = ['⭐', '🎉', '🌟', '✨', '🎈'];

interface Props {
  visible: boolean;
  message?: string;
}

// Small celebratory banner shown after a correct answer. No sounds of
// failure or timers are ever used elsewhere in the app to keep things
// stress-free.
export default function RewardOverlay({ visible, message = 'Well done!' }: Props) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scale.setValue(0);
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Text style={styles.confettiRow}>
          {CONFETTI.map((c, i) => (
            <Text key={i}>{c} </Text>
          ))}
        </Text>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff9c4',
    paddingVertical: 24,
    paddingHorizontal: 36,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  confettiRow: {
    fontSize: 34,
  },
  message: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f57f17',
    marginTop: 8,
  },
});
