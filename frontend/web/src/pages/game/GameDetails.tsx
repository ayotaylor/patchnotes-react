import React from "react";
import { useParams } from "react-router-dom";
import { getWebStyles } from "../../styles/game/webStyleAdapter";
import useGameDetails from "shared/hooks/useGameDetails";
import GameHeader from "../../components/game/GameHeader";
import GameActions from "../../components/game/GameActions";
import GameInfo from "../../components/game/GameInfo";
import GameStats from "../../components/game/GameStats";
import SimilarGames from "../../components/game/SimilarGames";

const styles = getWebStyles();

// interface GameDetailsProps  {
//     gameId: number;
// }

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const gameId = id ? Number(id) : 0;
  const { game, loading, error } = useGameDetails(gameId);

  if (loading) return <div style={styles.layout.container}>Loading...</div>;
  if (error) return <div style={styles.layout.container}>Error: {error}</div>;
  if (!game) return <div style={styles.layout.container}>No game found</div>;

  console.log('the storyline is:', game.storyLine);

  return (
    <div style={styles.layout.container}>
      <div style={styles.layout.gameDetails}>
        <GameHeader
          name={game.name}
          cover={game.cover}
          releaseDate={game.firstReleaseDate}
          developer={game.developer}
          publisher={game.publisher}
        />
        <GameActions gameId={game.id} averageRating={game.averageRating} />
        <GameInfo
          summary={game.summary}
          storyLine={game.storyLine}
          platforms={game.platforms}
          genres={game.genres}
        />
        <GameStats
          backlogCount={game.backlogCount}
          playingCount={game.playingCount}
          completedCount={game.completedCount}
        />
        <SimilarGames games={game.similarGames} />
      </div>
    </div>
  );
};

export default GameDetails;
