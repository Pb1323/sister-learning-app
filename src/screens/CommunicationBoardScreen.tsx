import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { communicationBoard } from '../data/communication';
import { CommItem } from '../data/types';
import BigButton from '../components/BigButton';
import { speak } from '../utils/speech';
import { addCustomCommunicationItem, getCustomCommunicationItems, removeCustomCommunicationItem } from '../utils/storage';
import ScreenHeader from '../components/ScreenHeader';

export default function CommunicationBoardScreen() {
  const navigation = useNavigation<any>();
  const [custom, setCustom] = useState<CommItem[]>([]);
  const [managing, setManaging] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newEmoji, setNewEmoji] = useState('');

  useEffect(() => {
    getCustomCommunicationItems().then(setCustom);
  }, []);

  const handleAdd = async () => {
    if (!newLabel.trim() || !newEmoji.trim()) return;
    const item: CommItem = { id: `custom-${Date.now()}`, label: newLabel.trim(), emoji: newEmoji.trim() };
    const updated = await addCustomCommunicationItem(item);
    setCustom(updated);
    setNewLabel('');
    setNewEmoji('');
  };

  const handleRemove = async (id: string) => {
    const updated = await removeCustomCommunicationItem(id);
    setCustom(updated);
  };

  const allItems = [...communicationBoard, ...custom];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="💬 Tell me what you need" color="#66bb6a" />
      <ScrollView contentContainerStyle={styles.grid}>
        {allItems.map((item) => (
          <BigButton key={item.id} label={item.label} emoji={item.emoji} color="#66bb6a" onPress={() => speak(item.label)} />
        ))}
        <BigButton label="I feel..." emoji="🙂" color="#26c6da" onPress={() => navigation.navigate('IFeel')} />
      </ScrollView>

      <BigButton
        label={managing ? 'Done' : 'Add Word'}
        emoji="➕"
        color="#8d6e63"
        size={70}
        onPress={() => setManaging((m) => !m)}
      />

      {managing && (
        <View style={styles.manageBox}>
          <Text style={styles.manageTitle}>Add a new word (parent use)</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Emoji e.g. 🧸"
              value={newEmoji}
              onChangeText={setNewEmoji}
            />
            <TextInput
              style={[styles.input, styles.inputWide]}
              placeholder="Word e.g. Teddy"
              value={newLabel}
              onChangeText={setNewLabel}
            />
          </View>
          <BigButton label="Save" emoji="✅" color="#43a047" size={70} onPress={handleAdd} />
          {custom.map((item) => (
            <View key={item.id} style={styles.customRow}>
              <Text style={styles.customLabel}>{item.emoji} {item.label}</Text>
              <BigButton label="Remove" emoji="🗑️" color="#e53935" size={60} onPress={() => handleRemove(item.id)} />
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '800', marginVertical: 12, color: '#37474f' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 10 },
  manageBox: { padding: 16, alignItems: 'center', width: '100%' },
  manageTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#37474f' },
  inputRow: { flexDirection: 'row', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#b0bec5', borderRadius: 8, padding: 8, margin: 4, width: 80, backgroundColor: 'white' },
  inputWide: { width: 160 },
  customRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  customLabel: { fontSize: 16, marginRight: 12 },
});
