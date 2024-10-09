import React from "react";
import { SimilarGame } from "shared/types/game/similarGame";
import { SharedStyles } from "../../shared/styles/sharedStyles";

interface SimilarGamesProp {
  games: SimilarGame[];
  styles: ReturnType<
    typeof import("../../styles/game/webStyleAdapter").getWebStyles
  >;
}

const SimilarGames: React.FC<SimilarGamesProp> = ({ games, styles }) => {
  return (
    <div
      style={{
        ...styles.similarGames.container,
        backgroundColor: styles.currentTheme.background,
      }}
    >
      <h2
        style={{
          ...styles.similarGames.heading,
          color: styles.currentTheme.accent,
        }}
      >
        Similar Games
      </h2>
      <div style={styles.similarGames.grid}>
        {games.map((game) => (
          <div
            key={game.igdbId}
            style={{
              ...styles.similarGames.card,
              backgroundColor: styles.currentTheme.cardBackground,
            }}
          >
            <img
              src={game.cover}
              alt={`${game.name} cover`}
              style={styles.similarGames.cardImage}
            />
            <h3
              style={{
                ...styles.similarGames.cardTitle,
                color: styles.currentTheme.text,
              }}
            >
              {game.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarGames;
