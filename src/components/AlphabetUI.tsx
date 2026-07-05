import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';

export function Sky({ children }: { children: React.ReactNode }) {
  return <View style={styles.sky}><View style={styles.sun} /><View style={[styles.cloud, styles.cloudOne]} /><View style={[styles.cloud, styles.cloudTwo]} />{children}</View>;
}

export function HomePill({ onPress }: { onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={styles.homePill}><Text style={styles.homeText}>🏠 Home</Text></Pressable>;
}

export function BouncyCard({ children, onPress, style }: { children: React.ReactNode; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  const scale = useRef(new Animated.Value(1)).current;
  const bounce = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.94, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
    onPress?.();
  };
  return <Pressable onPress={bounce}><Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View></Pressable>;
}

export function RewardBurst({ show, message = 'Well done!' }: { show: boolean; message?: string }) {
  const pop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (show) Animated.sequence([
      Animated.spring(pop, { toValue: 1, useNativeDriver: true }),
      Animated.delay(850),
      Animated.timing(pop, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [show, pop]);
  if (!show) return null;
  return <Animated.View pointerEvents="none" style={[styles.reward, { opacity: pop, transform: [{ scale: pop }] }]}><Text style={styles.rewardStars}>⭐ ✨ 🌟</Text><Text style={styles.rewardText}>{message}</Text></Animated.View>;
}

const styles = StyleSheet.create({
  sky: { flex: 1, backgroundColor: '#9fe7ff', overflow: 'hidden' },
  sun: { position: 'absolute', right: -30, top: -25, width: 150, height: 150, borderRadius: 75, backgroundColor: '#ffe16a' },
  cloud: { position: 'absolute', width: 170, height: 70, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.72)' },
  cloudOne: { top: 88, left: -55 },
  cloudTwo: { top: 210, right: -70 },
  homePill: { minHeight: 56, paddingHorizontal: 22, borderRadius: 28, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', shadowColor: '#527', shadowOpacity: 0.16, shadowRadius: 10, elevation: 4 },
  homeText: { fontSize: 22, fontWeight: '900', color: '#31546b' },
  reward: { position: 'absolute', alignSelf: 'center', top: '38%', backgroundColor: '#fff', borderRadius: 34, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 8, zIndex: 20 },
  rewardStars: { fontSize: 42 },
  rewardText: { fontSize: 30, fontWeight: '900', color: '#5d3fd3' },
});
