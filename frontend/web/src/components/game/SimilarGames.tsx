import React from "react";
import { SimilarGame } from "shared/types/game/similarGame";
import { getWebStyles } from "../../styles/game/webStyleAdapter";

const styles = getWebStyles();

interface SimilarGamesProp {
  games: SimilarGame[];
}

const SimilarGames: React.FC<SimilarGamesProp> = ({ games }) => {
  return (
    <div style={styles.similarGames.container}>
      <h2 style={styles.similarGames.heading}>Similar Games</h2>
      <div style={styles.similarGames.grid}>
        {games.map((game) => (
          <div key={game.igdbId} style={styles.similarGames.card}>
            <img
              src={game.cover}
              alt={`${game.name} cover`}
              style={styles.similarGames.cardImage}
            />
            <h3 style={styles.similarGames.cardTitle}>{game.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarGames;
