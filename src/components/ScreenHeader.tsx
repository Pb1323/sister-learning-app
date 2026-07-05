import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BigButton from './BigButton';

interface Props {
  title: string;
  color?: string;
}

// Shown at the top of every screen except Home so there is always a quick,
// consistent way back — important since the child navigates independently.
export default function ScreenHeader({ title, color = '#78909c' }: Props) {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.row}>
      <BigButton label="" emoji="🏠" color={color} size={60} onPress={() => navigation.navigate('Home')} />
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 60 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#37474f',
    flex: 1,
    textAlign: 'center',
  },
});
