import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { BouncyCard, Sky } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <Sky>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.kicker}>🌈 Alphabet classroom</Text>
          <Text style={styles.title}>Let’s learn letters!</Text>
          <Text style={styles.subtitle}>Tap big cards. Hear letters. Earn happy stars.</Text>
          <BouncyCard style={styles.hero} onPress={() => navigation.navigate('LearnLetter', {})}>
            <Text style={styles.heroEmoji}>🍎</Text><Text style={styles.heroLetter}>A B C</Text><Text style={styles.heroText}>Start learning</Text>
          </BouncyCard>
          <View style={styles.grid}>
            <Tile label="Letters" emoji="🔤" color="#ff6f91" onPress={() => navigation.navigate('AlphabetGrid')} />
            <Tile label="Find" emoji="👀" color="#4f8cff" onPress={() => navigation.navigate('FindLetter')} />
            <Tile label="Match" emoji="Aa" color="#32c96d" onPress={() => navigation.navigate('LetterMatch')} />
            <Tile label="Stars" emoji="⭐" color="#ffb13b" onPress={() => navigation.navigate('Progress')} />
            <Tile label="Settings" emoji="⚙️" color="#8b6cff" onPress={() => navigation.navigate('Settings')} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Sky>
  );
}

function Tile({ label, emoji, color, onPress }: { label: string; emoji: string; color: string; onPress: () => void }) {
  return <BouncyCard onPress={onPress} style={[styles.tile, { backgroundColor: color }]}><Text style={styles.tileEmoji}>{emoji}</Text><Text style={styles.tileText}>{label}</Text></BouncyCard>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 }, content: { padding: 22, alignItems: 'center', paddingBottom: 40 },
  kicker: { marginTop: 12, color: '#31546b', fontSize: 22, fontWeight: '900' }, title: { fontSize: 46, fontWeight: '900', color: '#23364a', textAlign: 'center' }, subtitle: { fontSize: 22, color: '#31546b', textAlign: 'center', marginBottom: 16, fontWeight: '700' },
  hero: { width: '100%', maxWidth: 620, minHeight: 230, borderRadius: 38, backgroundColor: '#fff7c7', borderWidth: 6, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', marginVertical: 12, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 18, elevation: 7 },
  heroEmoji: { fontSize: 62 }, heroLetter: { fontSize: 62, fontWeight: '900', color: '#ff5f7e' }, heroText: { fontSize: 26, fontWeight: '900', color: '#31546b' },
  grid: { width: '100%', maxWidth: 720, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 8 },
  tile: { width: 150, minHeight: 135, borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: '#fff' }, tileEmoji: { fontSize: 42, color: '#fff', fontWeight: '900' }, tileText: { fontSize: 24, color: '#fff', fontWeight: '900' },
});
