import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export const magic = {
  ink: '#24324b',
  blue: '#83dcff',
  deepBlue: '#4f8cff',
  pink: '#ff6f91',
  purple: '#8b6cff',
  green: '#32c96d',
  yellow: '#ffd45c',
  cream: '#fff8d9',
  white: '#ffffff',
};

export function MagicWorld({ children, reducedMotion = false, tint = magic.blue }: { children: React.ReactNode; reducedMotion?: boolean; tint?: string }) {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reducedMotion) return;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: 7000, useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: 7000, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [drift, reducedMotion]);

  const cloudMove = drift.interpolate({ inputRange: [0, 1], outputRange: [-8, 18] });
  const starMove = drift.interpolate({ inputRange: [0, 1], outputRange: [0, -16] });

  return (
    <View style={[styles.world, { backgroundColor: tint }]}> 
      <View pointerEvents="none" style={styles.skyGlow} />
      <View pointerEvents="none" style={styles.sun} />
      <Animated.View pointerEvents="none" style={[styles.cloud, styles.cloudOne, { transform: [{ translateX: cloudMove }] }]} />
      <Animated.View pointerEvents="none" style={[styles.cloud, styles.cloudTwo, { transform: [{ translateX: Animated.multiply(cloudMove, -1) }] }]} />
      <Animated.Text pointerEvents="none" style={[styles.floatingStar, styles.starOne, { transform: [{ translateY: starMove }] }]}>✦</Animated.Text>
      <Animated.Text pointerEvents="none" style={[styles.floatingStar, styles.starTwo, { transform: [{ translateY: Animated.multiply(starMove, -1) }] }]}>✧</Animated.Text>
      <View pointerEvents="none" style={styles.rainbow}><View style={styles.rainbowBandOne} /><View style={styles.rainbowBandTwo} /><View style={styles.rainbowBandThree} /></View>
      {children}
    </View>
  );
}

export function HomePill({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.homePill}>
      <Text style={styles.homeText}>🏠 Home</Text>
    </Pressable>
  );
}

export function BouncyCard({ children, onPress, style, reducedMotion = false, disabled = false }: { children: React.ReactNode; onPress?: () => void; style?: StyleProp<ViewStyle>; reducedMotion?: boolean; disabled?: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const bounce = () => {
    if (!reducedMotion) {
      Animated.parallel([
        Animated.sequence([
          Animated.spring(scale, { toValue: 0.92, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1.04, friction: 3, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(rotate, { toValue: 1, duration: 90, useNativeDriver: true }),
          Animated.timing(rotate, { toValue: -1, duration: 90, useNativeDriver: true }),
          Animated.timing(rotate, { toValue: 0, duration: 90, useNativeDriver: true }),
        ]),
      ]).start();
    }
    onPress?.();
  };

  const spin = rotate.interpolate({ inputRange: [-1, 1], outputRange: ['-2deg', '2deg'] });
  return (
    <Pressable accessibilityRole="button" disabled={disabled} onPress={bounce}>
      <Animated.View style={[style, { transform: [{ scale }, { rotate: spin }], opacity: disabled ? 0.55 : 1 }]}>{children}</Animated.View>
    </Pressable>
  );
}

export function FloatingBubble({ children, style, reducedMotion = false }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; reducedMotion?: boolean }) {
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reducedMotion) return;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2600, useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2600, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [float, reducedMotion]);
  const y = float.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  return <Animated.View style={[style, { transform: [{ translateY: y }] }]}>{children}</Animated.View>;
}

export function StarCounter({ count }: { count: number }) {
  return <View style={styles.starCounter}><Text style={styles.starCounterText}>⭐ {count}</Text></View>;
}

export function RewardBurst({ show, message = 'Well done!', reducedMotion = false }: { show: boolean; message?: string; reducedMotion?: boolean }) {
  const pop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!show) return;
    if (reducedMotion) {
      pop.setValue(1);
      const timeout = setTimeout(() => pop.setValue(0), 900);
      return () => clearTimeout(timeout);
    }
    Animated.sequence([
      Animated.spring(pop, { toValue: 1, friction: 4, useNativeDriver: true }),
      Animated.delay(900),
      Animated.timing(pop, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [show, pop, reducedMotion]);
  if (!show) return null;
  return (
    <Animated.View pointerEvents="none" style={[styles.reward, { opacity: pop, transform: [{ scale: pop }] }]}> 
      <Text style={styles.rewardStars}>⭐ ✨ 🌟 ✨ ⭐</Text>
      <Text style={styles.rewardText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  world: { flex: 1, overflow: 'hidden' },
  skyGlow: { position: 'absolute', top: -90, left: -80, right: -80, height: 320, borderBottomLeftRadius: 200, borderBottomRightRadius: 200, backgroundColor: 'rgba(255,255,255,0.35)' },
  sun: { position: 'absolute', right: -38, top: -28, width: 170, height: 170, borderRadius: 85, backgroundColor: '#ffe170', borderWidth: 12, borderColor: 'rgba(255,255,255,0.45)' },
  cloud: { position: 'absolute', width: 190, height: 76, borderRadius: 46, backgroundColor: 'rgba(255,255,255,0.74)' },
  cloudOne: { top: 92, left: -62 },
  cloudTwo: { top: 234, right: -76 },
  floatingStar: { position: 'absolute', color: '#fff4a9', fontSize: 58, fontWeight: '900', textShadowColor: 'rgba(87,64,160,0.25)', textShadowRadius: 10 },
  starOne: { left: 24, top: 166 },
  starTwo: { right: 36, bottom: 160 },
  rainbow: { position: 'absolute', left: -70, bottom: -76, width: 260, height: 260, borderRadius: 130, borderWidth: 22, borderColor: 'rgba(255,111,145,0.72)' },
  rainbowBandOne: { position: 'absolute', inset: 18, borderRadius: 110, borderWidth: 18, borderColor: 'rgba(255,212,92,0.75)' },
  rainbowBandTwo: { position: 'absolute', inset: 48, borderRadius: 90, borderWidth: 16, borderColor: 'rgba(50,201,109,0.68)' },
  rainbowBandThree: { position: 'absolute', inset: 74, borderRadius: 70, borderWidth: 14, borderColor: 'rgba(79,140,255,0.62)' },
  homePill: { minHeight: 58, paddingHorizontal: 22, borderRadius: 30, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', shadowColor: '#39426b', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 5, borderWidth: 3, borderColor: '#fff8d9' },
  homeText: { fontSize: 22, fontWeight: '900', color: '#31546b' },
  starCounter: { minHeight: 54, minWidth: 96, paddingHorizontal: 18, borderRadius: 28, backgroundColor: '#fff8d9', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#ffffff', shadowColor: '#8b6cff', shadowOpacity: 0.14, shadowRadius: 10, elevation: 4 },
  starCounterText: { fontSize: 22, fontWeight: '900', color: '#7a5212' },
  reward: { position: 'absolute', alignSelf: 'center', top: '34%', maxWidth: '88%', backgroundColor: '#fff', borderRadius: 38, padding: 24, alignItems: 'center', borderWidth: 6, borderColor: '#fff4a9', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 22, elevation: 10, zIndex: 20 },
  rewardStars: { fontSize: 36, textAlign: 'center' },
  rewardText: { fontSize: 32, fontWeight: '900', color: '#5d3fd3', textAlign: 'center' },
});
