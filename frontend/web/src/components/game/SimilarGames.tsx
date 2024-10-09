import React from "react";
import { SimilarGame } from "shared/types/game/similarGame";
import { SharedStyles } from "../../shared/styles/sharedStyles";
import { useNavigate } from "react-router-dom";
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface SimilarGamesProp {
  games: SimilarGame[];
  styles: ReturnType<
    typeof import("../../styles/game/webStyleAdapter").getWebStyles
  >;
}

const SimilarGames: React.FC<SimilarGamesProp> = ({ games, styles }) => {
  const navigate = useNavigate();

  const handleClick = (gameId: number) => {
    navigate(`/game/${gameId}`);
  };

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const game = games[index];
    return (
      <div
        style={{
          ...style,
          ...styles.similarGames.card,
          backgroundColor: styles.currentTheme.cardBackground,
          cursor: 'pointer',
          display: 'inline-block',
          width: 150, // Adjust as needed
          marginRight: 10,
        }}
        onClick={() => handleClick(game.id)}
      >
        <img src={game.cover} alt={game.name} style={{ ...styles.similarGames.cardImage, width: '100%', height: 225 }} />
        <h3 style={{ ...styles.similarGames.cardTitle, color: styles.currentTheme.text }}>{game.name}</h3>
      </div>
    );
  };

  return (
    <div style={{ ...styles.similarGames.container, backgroundColor: styles.currentTheme.background }}>
      <h2 style={{ ...styles.similarGames.heading, color: styles.currentTheme.accent }}>Similar Games</h2>
      <List
        height={300} // Adjust based on your card height
        itemCount={games.length}
        itemSize={160} // Width of each item plus margin
        layout="horizontal"
        width={800} // Adjust based on your container width
      >
        {Row}
      </List>
    </div>
    // <div
    //   style={{
    //     ...styles.similarGames.container,
    //     backgroundColor: styles.currentTheme.background,
    //   }}
    // >
    //   <h2
    //     style={{
    //       ...styles.similarGames.heading,
    //       color: styles.currentTheme.accent,
    //     }}
    //   >
    //     Similar Games
    //   </h2>
    //   <div style={styles.similarGames.grid}>
    //     {games.map((game) => (
    //       <div
    //         key={game.igdbId}
    //         style={{
    //           ...styles.similarGames.card,
    //           backgroundColor: styles.currentTheme.cardBackground,
    //         }}
    //         onClick={() => handleClick(game.id)}
    //       >
    //         <img
    //           src={game.cover}
    //           alt={`${game.name} cover`}
    //           style={styles.similarGames.cardImage}
    //         />
    //         <h3
    //           style={{
    //             ...styles.similarGames.cardTitle,
    //             color: styles.currentTheme.text,
    //           }}
    //         >
    //           {game.name}
    //         </h3>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default SimilarGames;
