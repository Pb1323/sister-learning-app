import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getCategory } from '../data/categories';
import BigButton from '../components/BigButton';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'LevelSelect'>;

const levels: { level: 1 | 2 | 3 | 4; title: string; emoji: string }[] = [
  { level: 1, title: 'Look & Listen', emoji: '👀' },
  { level: 2, title: 'Match Pairs', emoji: '🧩' },
  { level: 3, title: 'Choose the Right One', emoji: '👉' },
  { level: 4, title: 'Put in Order', emoji: '🔢' },
];

export default function LevelSelectScreen({ route, navigation }: Props) {
  const category = getCategory(route.params.categoryId)!;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title={`${category.emoji} ${category.title}`} color={category.color} />
      <View style={styles.grid}>
        {levels.map((l) => (
          <BigButton
            key={l.level}
            label={l.title}
            emoji={l.emoji}
            color={category.color}
            size={150}
            onPress={() => navigation.navigate('Activity', { categoryId: category.id, level: l.level })}
          />
        ))}
        {category.id === 'letters' && (
          <BigButton
            label="Match Letters"
            emoji="🔡"
            color={category.color}
            size={150}
            onPress={() => navigation.navigate('LetterCaseMatch')}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '800', marginVertical: 16, color: '#37474f' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
