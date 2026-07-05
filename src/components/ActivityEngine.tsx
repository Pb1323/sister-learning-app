import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Category } from '../data/types';
import ExploreLevel from './ExploreLevel';
import MatchLevel from './MatchLevel';
import ChooseLevel from './ChooseLevel';
import SequenceLevel from './SequenceLevel';
import RewardOverlay from './RewardOverlay';
import BigButton from './BigButton';
import { recordAnswer, recordSessionComplete } from '../utils/storage';

interface Props {
  category: Category;
  level: 1 | 2 | 3 | 4;
  onExit: () => void;
}

export default function ActivityEngine({ category, level, onExit }: Props) {
  const [showInlineReward, setShowInlineReward] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const flashReward = () => {
    setShowInlineReward(true);
    setTimeout(() => setShowInlineReward(false), 700);
  };

  const handleCorrect = () => {
    recordAnswer(category.id, true);
    flashReward();
  };
  const handleWrong = () => {
    recordAnswer(category.id, false);
  };
  const handleComplete = () => {
    recordSessionComplete(category.id);
    setSessionDone(true);
  };

  const playAgain = () => {
    setSessionDone(false);
    setRunKey((k) => k + 1);
  };

  if (sessionDone) {
    return (
      <View style={styles.container}>
        <RewardOverlay visible message="Great job!" />
        <View style={styles.doneButtons}>
          <BigButton label="Play Again" emoji="🔁" color="#43a047" onPress={playAgain} />
          <BigButton label="Categories" emoji="🏠" color="#5c6bc0" onPress={onExit} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.levelArea} key={runKey}>
        {level === 1 && <ExploreLevel items={category.items} onCorrect={handleCorrect} />}
        {level === 2 && (
          <MatchLevel
            items={category.items}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            onComplete={handleComplete}
          />
        )}
        {level === 3 && (
          <ChooseLevel
            items={category.items}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            onComplete={handleComplete}
          />
        )}
        {level === 4 && (
          <SequenceLevel
            items={category.items}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            onComplete={handleComplete}
          />
        )}
      </View>
      <RewardOverlay visible={showInlineReward} message="Well done!" />
      <View style={styles.footer}>
        <BigButton label="Finish" emoji="🏠" color="#78909c" onPress={onExit} size={70} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  levelArea: { flex: 1 },
  footer: { alignItems: 'center', paddingBottom: 12 },
  doneButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 60,
  },
});
