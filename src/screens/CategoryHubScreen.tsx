import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { categories } from '../data/categories';
import BigButton from '../components/BigButton';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryHub'>;

export default function CategoryHubScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Choose what to learn" />
      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((cat) => (
          <BigButton
            key={cat.id}
            label={cat.title}
            emoji={cat.emoji}
            color={cat.color}
            size={140}
            onPress={() => navigation.navigate('LevelSelect', { categoryId: cat.id })}
          />
        ))}
        <BigButton
          label="Bonus Games"
          emoji="🎮"
          color="#7e57c2"
          size={140}
          onPress={() => navigation.navigate('BonusGames')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 40, paddingTop: 8 },
});
