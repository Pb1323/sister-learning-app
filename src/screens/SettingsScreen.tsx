import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useSettings } from '../context/SettingsContext';
import BigButton from '../components/BigButton';
import { Settings } from '../utils/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const sizes: { key: Settings['buttonSize']; label: string }[] = [
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
  { key: 'extraLarge', label: 'Extra Large' },
];

export default function SettingsScreen({ navigation }: Props) {
  const { settings, updateSettings } = useSettings();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <Text style={styles.section}>Sound</Text>
      <View style={styles.row}>
        <BigButton
          label="On 🔊"
          emoji=""
          color={settings.soundOn ? '#43a047' : '#b0bec5'}
          size={100}
          onPress={() => updateSettings({ soundOn: true })}
        />
        <BigButton
          label="Off 🔇"
          emoji=""
          color={!settings.soundOn ? '#43a047' : '#b0bec5'}
          size={100}
          onPress={() => updateSettings({ soundOn: false })}
        />
      </View>

      <Text style={styles.section}>Button Size</Text>
      <View style={styles.row}>
        {sizes.map((s) => (
          <BigButton
            key={s.key}
            label={s.label}
            emoji=""
            color={settings.buttonSize === s.key ? '#43a047' : '#b0bec5'}
            size={100}
            onPress={() => updateSettings({ buttonSize: s.key })}
          />
        ))}
      </View>

      <BigButton label="Back" emoji="🏠" color="#78909c" size={80} onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', paddingTop: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12, color: '#37474f' },
  section: { fontSize: 18, fontWeight: '700', color: '#37474f', marginTop: 12, marginBottom: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
});
