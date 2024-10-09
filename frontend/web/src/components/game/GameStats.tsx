import React from "react";
import { SharedStyles } from "../../shared/styles/sharedStyles";

interface GameStatsProps {
  backlogCount: number;
  playingCount: number;
  completedCount: number;
  styles: ReturnType<
    typeof import("../../styles/game/webStyleAdapter").getWebStyles
  >;
}

const GameStats: React.FC<GameStatsProps> = ({
  backlogCount,
  playingCount,
  completedCount,
  styles,
}) => {
  return (
    <div
      style={{
        ...styles.gameStats.container,
        backgroundColor: styles.currentTheme.background,
      }}
    >
      <div style={styles.gameStats.stat}>
        <h3
          style={{
            ...styles.gameStats.statLabel,
            color: styles.currentTheme.secondary,
          }}
        >
          In Backlog
        </h3>
        <p
          style={{
            ...styles.gameStats.statValue,
            color: styles.currentTheme.text,
          }}
        >
          {backlogCount}
        </p>
      </div>
      <div style={styles.gameStats.stat}>
        <h3
          style={{
            ...styles.gameStats.statLabel,
            color: styles.currentTheme.secondary,
          }}
        >
          Currently Playing
        </h3>
        <p
          style={{
            ...styles.gameStats.statValue,
            color: styles.currentTheme.text,
          }}
        >
          {playingCount}
        </p>
      </div>
      <div style={styles.gameStats.stat}>
        <h3
          style={{
            ...styles.gameStats.statLabel,
            color: styles.currentTheme.secondary,
          }}
        >
          Completed
        </h3>
        <p
          style={{
            ...styles.gameStats.statValue,
            color: styles.currentTheme.text,
          }}
        >
          {completedCount}
        </p>
      </div>
    </div>
  );
};

export default GameStats;
