import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { categories } from '../data/categories';
import { ProgressStore, getProgress } from '../utils/storage';
import BigButton from '../components/BigButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentDashboard'>;

const bonusGames = [
  { id: 'bonus-odd-one-out', title: 'Odd One Out', emoji: '🔍' },
  { id: 'bonus-find-colour', title: 'Tap the Colour', emoji: '🌈' },
  { id: 'bonus-counting', title: 'Count It', emoji: '🔢' },
];

function buildRows(progress: ProgressStore, list: { id: string; title: string; emoji: string }[]) {
  return list.map((entry) => {
    const rec = progress[entry.id] ?? { attempts: 0, correct: 0, sessionsCompleted: 0 };
    const accuracy = rec.attempts > 0 ? Math.round((rec.correct / rec.attempts) * 100) : null;
    return { entry, rec, accuracy };
  });
}

export default function ParentDashboardScreen({ navigation }: Props) {
  const [progress, setProgress] = useState<ProgressStore>({});

  useEffect(() => {
    getProgress().then(setProgress);
  }, []);

  const categoryRows = buildRows(
    progress,
    categories.map((c) => ({ id: c.id, title: c.title, emoji: c.emoji }))
  );
  const bonusRows = buildRows(progress, bonusGames);
  const allRows = [...categoryRows, ...bonusRows];

  const withAttempts = allRows.filter((r) => r.rec.attempts > 0);
  const favourite = withAttempts.length
    ? withAttempts.reduce((a, b) => (b.rec.sessionsCompleted > a.rec.sessionsCompleted ? b : a))
    : null;
  const needsPractice = withAttempts.length
    ? withAttempts.reduce((a, b) => ((b.accuracy ?? 100) < (a.accuracy ?? 100) ? b : a))
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>👪 Parent Dashboard</Text>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scroll}>
        {favourite && <Text style={styles.summary}>⭐ Favourite: {favourite.entry.title}</Text>}
        {needsPractice && (
          <Text style={styles.summary}>📌 Could use more practice: {needsPractice.entry.title}</Text>
        )}
        {!withAttempts.length && <Text style={styles.summary}>No activities played yet.</Text>}

        <Text style={styles.sectionHeading}>Learning Categories</Text>
        {categoryRows.map(({ entry, rec, accuracy }) => (
          <View key={entry.id} style={styles.row}>
            <Text style={styles.rowTitle}>{entry.emoji} {entry.title}</Text>
            <Text style={styles.rowDetail}>Activities completed: {rec.sessionsCompleted}</Text>
            <Text style={styles.rowDetail}>Correct answers: {rec.correct} / {rec.attempts}</Text>
            <Text style={styles.rowDetail}>Accuracy: {accuracy !== null ? `${accuracy}%` : '—'}</Text>
          </View>
        ))}

        <Text style={styles.sectionHeading}>Bonus Games</Text>
        {bonusRows.map(({ entry, rec, accuracy }) => (
          <View key={entry.id} style={styles.row}>
            <Text style={styles.rowTitle}>{entry.emoji} {entry.title}</Text>
            <Text style={styles.rowDetail}>Activities completed: {rec.sessionsCompleted}</Text>
            <Text style={styles.rowDetail}>Correct answers: {rec.correct} / {rec.attempts}</Text>
            <Text style={styles.rowDetail}>Accuracy: {accuracy !== null ? `${accuracy}%` : '—'}</Text>
          </View>
        ))}
      </ScrollView>
      <BigButton label="Back" emoji="🏠" color="#78909c" size={80} onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', paddingTop: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 8, color: '#37474f' },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  summary: { fontSize: 16, fontWeight: '700', color: '#5c6bc0', marginBottom: 8 },
  sectionHeading: { fontSize: 15, fontWeight: '800', color: '#90a4ae', marginTop: 10, marginBottom: 6, textTransform: 'uppercase' },
  row: { backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 10 },
  rowTitle: { fontSize: 18, fontWeight: '800', color: '#37474f' },
  rowDetail: { fontSize: 14, color: '#607d8b' },
});
