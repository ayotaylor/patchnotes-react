import React from "react";
import { getWebStyles } from "../../styles/game/webStyleAdapter";

const styles = getWebStyles();

interface GameStatsProps {
  backlogCount: number;
  playingCount: number;
  completedCount: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  backlogCount,
  playingCount,
  completedCount,
}) => {
  return (
    <div style={styles.gameStats.container}>
      <div style={styles.gameStats.stat}>
        <h3 style={styles.gameStats.statLabel}>In Backlog</h3>
        <p style={styles.gameStats.statValue}>{backlogCount}</p>
      </div>
      <div style={styles.gameStats.stat}>
        <h3 style={styles.gameStats.statLabel}>Currently Playing</h3>
        <p style={styles.gameStats.statValue}>{playingCount}</p>
      </div>
      <div style={styles.gameStats.stat}>
        <h3 style={styles.gameStats.statLabel}>Completed</h3>
        <p style={styles.gameStats.statValue}>{completedCount}</p>
      </div>
    </div>
  );
};

export default GameStats;
