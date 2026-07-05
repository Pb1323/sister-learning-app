import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useSettings } from '../context/SettingsContext';
import { playCorrectSound } from '../utils/music';
import { BouncyCard, HomePill, MagicWorld, magic } from '../components/AlphabetUI';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const { settings, updateSettings } = useSettings();
  return (
    <MagicWorld reducedMotion={settings.reducedMotion} tint="#d9f8ff">
      <SafeAreaView style={styles.safe}>
        <HomePill onPress={() => navigation.navigate('Home')} />
        <Text style={styles.title}>Grown-up Settings</Text>
        <View style={styles.panel}>
          <View style={styles.sectionCard}>
            <Text style={styles.section}>Audio</Text>
            <Text style={styles.sectionHelp}>Voice and music have their own big buttons with extra space so they are easy to tap.</Text>
            <View style={styles.audioStack}>
              <Toggle label="Voice sounds" on={settings.soundOn} onPress={() => updateSettings({ soundOn: !settings.soundOn })} />
              <Toggle label="Calm music" on={settings.musicOn} onPress={() => updateSettings({ musicOn: !settings.musicOn })} />
            </View>
            <BouncyCard reducedMotion={settings.reducedMotion} onPress={playCorrectSound} style={styles.testSound}>
              <Text style={styles.testSoundText}>✨ Try a gentle chime</Text>
            </BouncyCard>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.section}>Comfort</Text>
            <Toggle label="Reduced motion" on={settings.reducedMotion} onPress={() => updateSettings({ reducedMotion: !settings.reducedMotion })} />
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.section}>Find Letter choices</Text>
            <View style={styles.row}>{([2, 3, 4] as const).map((n) => <BouncyCard key={n} reducedMotion={settings.reducedMotion} onPress={() => updateSettings({ difficulty: n })} style={[styles.choice, settings.difficulty === n && styles.active]}><Text style={styles.choiceText}>{n}</Text></BouncyCard>)}</View>
          </View>

          <Text style={styles.note}>Audio uses speech plus safe web chimes when available. If a browser blocks audio, the app keeps working.</Text>
        </View>
      </SafeAreaView>
    </MagicWorld>
  );
}

function Toggle({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  return <BouncyCard onPress={onPress} style={[styles.toggle, { backgroundColor: on ? magic.green : '#8fa0ad' }]}><Text style={styles.toggleText}>{on ? '✅' : '⬜'} {label}</Text></BouncyCard>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, padding: 18, alignItems: 'center' },
  title: { fontSize: 40, lineHeight: 46, fontWeight: '900', color: magic.ink, marginVertical: 18, textAlign: 'center' },
  panel: { width: '100%', maxWidth: 640, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 40, borderWidth: 7, borderColor: '#fff', padding: 16, gap: 18, shadowColor: '#39426b', shadowOpacity: 0.16, shadowRadius: 14, elevation: 7 },
  sectionCard: { borderRadius: 30, backgroundColor: 'rgba(255,248,217,0.72)', borderWidth: 4, borderColor: '#fff', padding: 14, gap: 12 },
  section: { fontSize: 27, fontWeight: '900', color: magic.ink, textAlign: 'center' },
  sectionHelp: { fontSize: 17, lineHeight: 23, fontWeight: '800', color: '#607080', textAlign: 'center' },
  audioStack: { gap: 16 },
  toggle: { minHeight: 78, borderRadius: 30, alignItems: 'center', justifyContent: 'center', padding: 12, borderWidth: 4, borderColor: '#fff' },
  toggleText: { fontSize: 24, lineHeight: 30, color: '#fff', fontWeight: '900', textAlign: 'center' },
  testSound: { minHeight: 62, borderRadius: 30, backgroundColor: magic.purple, borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  testSoundText: { fontSize: 21, lineHeight: 26, color: '#fff', fontWeight: '900', textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  choice: { width: 88, height: 78, borderRadius: 26, backgroundColor: '#d9e2ea', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#fff' },
  active: { backgroundColor: magic.yellow },
  choiceText: { fontSize: 32, fontWeight: '900', color: magic.ink },
  note: { fontSize: 18, lineHeight: 24, fontWeight: '800', color: '#607080', textAlign: 'center' },
});
