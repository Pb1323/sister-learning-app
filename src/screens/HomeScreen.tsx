import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BigButton from '../components/BigButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fade, transform: [{ scale }], alignItems: 'center' }}>
        <Text style={styles.title}>🌟 Let's Learn! 🌟</Text>
        <View style={styles.grid}>
          <BigButton label="Learn" emoji="📚" color="#42a5f5" size={150} onPress={() => navigation.navigate('CategoryHub')} />
          <BigButton label="Talk" emoji="💬" color="#66bb6a" size={150} onPress={() => navigation.navigate('CommunicationBoard')} />
          <BigButton label="My Day" emoji="🗓️" color="#ffa726" size={150} onPress={() => navigation.navigate('Routines')} />
        </View>
        <View style={styles.footerRow}>
          <BigButton label="Parents" emoji="👪" color="#8d6e63" size={90} onPress={() => navigation.navigate('ParentDashboard')} />
          <BigButton label="Settings" emoji="⚙️" color="#78909c" size={90} onPress={() => navigation.navigate('Settings')} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 34, fontWeight: '800', marginBottom: 30, color: '#37474f' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  footerRow: { flexDirection: 'row', marginTop: 30 },
});
