import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BigButton from '../components/BigButton';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'BonusGames'>;

export default function BonusGamesScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="🎮 Bonus Games" color="#7e57c2" />
      <ScrollView contentContainerStyle={styles.grid}>
        <BigButton label="Odd One Out" emoji="🔍" color="#7e57c2" size={140} onPress={() => navigation.navigate('OddOneOut')} />
        <BigButton label="Tap the Colour" emoji="🌈" color="#ab47bc" size={140} onPress={() => navigation.navigate('FindColour')} />
        <BigButton label="Count It" emoji="🔢" color="#42a5f5" size={140} onPress={() => navigation.navigate('Counting')} />
        <BigButton label="Match Letters" emoji="🔤" color="#ef5350" size={140} onPress={() => navigation.navigate('LetterCaseMatch')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 40, paddingTop: 8 },
});
