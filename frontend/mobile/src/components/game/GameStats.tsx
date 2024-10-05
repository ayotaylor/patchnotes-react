import React from 'react';
import { getReactNativeStyles } from "../../styles/game/reactNativeStyleAdapter";
import { View, Text } from 'react-native';

const styles = getReactNativeStyles();

interface GameStatsProps {
  backlogCount: number;
  playingCount: number;
  completedCount: number;
}

const GameStats: React.FC<GameStatsProps> = ({ backlogCount, playingCount, completedCount }) => {
  return (
    <View style={styles.gameStats.container}>
      <View style={styles.gameStats.stat}>
        <Text style={styles.gameStats.statLabel}>In Backlog</Text>
        <Text style={styles.gameStats.statValue}>{backlogCount}</Text>
      </View>
      <View style={styles.gameStats.stat}>
        <Text style={styles.gameStats.statLabel}>Currently Playing</Text>
        <Text style={styles.gameStats.statValue}>{playingCount}</Text>
      </View>
      <View style={styles.gameStats.stat}>
        <Text style={styles.gameStats.statLabel}>Completed</Text>
        <Text style={styles.gameStats.statValue}>{completedCount}</Text>
      </View>
    </View>
  );
};

export default GameStats;