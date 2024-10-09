import React from "react";
import { SharedStyles } from '../../shared/styles/sharedStyles';

interface GameHeaderProps {
  name: string;
  cover: string;
  releaseDate: string;
  developer: string;
  publisher: string;
  styles: ReturnType<typeof import("../../styles/game/webStyleAdapter").getWebStyles>;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  name,
  cover,
  releaseDate,
  developer,
  publisher,
  styles
}) => {
  return (
    <header style={styles.gameHeader.container}>
      <img src={cover} alt={`${name} cover`} style={styles.gameHeader.cover} />
      <div style={styles.gameHeader.info}>
        <h1
          style={{
            ...styles.gameHeader.title,
            color: styles.currentTheme.text,
          }}
        >
          {name}
        </h1>
        <p
          style={{
            ...styles.gameHeader.detail,
            color: styles.currentTheme.secondary,
          }}
        >
          Release Date: {new Date(releaseDate).toLocaleDateString()}
        </p>
        <p
          style={{
            ...styles.gameHeader.detail,
            color: styles.currentTheme.secondary,
          }}
        >
          Developer: {developer}
        </p>
        <p
          style={{
            ...styles.gameHeader.detail,
            color: styles.currentTheme.secondary,
          }}
        >
          Publisher: {publisher}
        </p>
      </div>
    </header>
  );
};

export default GameHeader;
