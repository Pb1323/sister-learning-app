import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getCategory } from '../data/categories';
import ActivityEngine from '../components/ActivityEngine';

type Props = NativeStackScreenProps<RootStackParamList, 'Activity'>;

export default function ActivityScreen({ route, navigation }: Props) {
  const category = getCategory(route.params.categoryId)!;

  return (
    <SafeAreaView style={styles.container}>
      <ActivityEngine
        category={category}
        level={route.params.level}
        onExit={() => navigation.navigate('CategoryHub')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
});
