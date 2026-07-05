import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { emotions } from '../data/emotions';
import BigButton from '../components/BigButton';
import ScreenHeader from '../components/ScreenHeader';
import { speak } from '../utils/speech';

// A quick, dedicated way to communicate a feeling — distinct from the
// Emotions learning category, framed as "I feel..." for real-time use.
export default function IFeelScreen() {
  const say = (label: string) => speak(`I feel ${label.toLowerCase()}`);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="🙂 I feel..." color="#26c6da" />
      <View style={styles.grid}>
        {emotions.map((e) => (
          <BigButton key={e.id} label={e.label} emoji={e.emoji} color="#26c6da" onPress={() => say(e.label)} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 20 },
});
