import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getWebStyles } from "../../styles/game/webStyleAdapter";
import useGameDetails from "shared/hooks/useGameDetails";
import GameHeader from "../../components/game/GameHeader";
import GameActions from "../../components/game/GameActions";

const GameInfo = lazy(() => import("../../components/game/GameInfo"));
const GameStats = lazy(() => import("../../components/game/GameStats"));
const SimilarGames = lazy(() => import("../../components/game/SimilarGames"));

const GameDetails: React.FC = () => {
  const styles = getWebStyles();
  const { id } = useParams<{ id: string }>();
  const gameId = id ? Number(id) : 0;
  const { game, loading, error } = useGameDetails(gameId);

  if (loading)
    return (
      <div
        style={{ ...styles.layout.container, color: styles.currentTheme.text }}
      >
        Loading...
      </div>
    );
  if (error)
    return (
      <div
        style={{ ...styles.layout.container, color: styles.currentTheme.text }}
      >
        Error: {error}
      </div>
    );
  if (!game)
    return (
      <div
        style={{ ...styles.layout.container, color: styles.currentTheme.text }}
      >
        No game found
      </div>
    );

  return (
    <div
      style={{
        ...styles.layout.container,
        backgroundColor: styles.currentTheme.background,
      }}
    >
      <div
        style={{
          ...styles.layout.gameDetails,
          color: styles.currentTheme.text,
        }}
      >
        <GameHeader
          name={game.name}
          cover={game.cover}
          releaseDate={game.firstReleaseDate}
          developer={game.developer}
          publisher={game.publisher}
          styles={styles}
        />
        <GameActions
          gameId={game.id}
          averageRating={game.averageRating}
          styles={styles}
        />
        <Suspense fallback={<div>Loading game info...</div>}>
          <GameInfo
            summary={game.summary}
            storyLine={game.storyLine}
            platforms={game.platforms}
            genres={game.genres}
            styles={styles}
          />
        </Suspense>
        <Suspense fallback={<div>Loading game info...</div>}>
          <GameStats
            backlogCount={game.backlogCount}
            playingCount={game.playingCount}
            completedCount={game.completedCount}
            styles={styles}
          />
        </Suspense>
        <Suspense fallback={<div>Loading game info...</div>}>
          <SimilarGames games={game.similarGames} styles={styles} />
        </Suspense>
      </div>
    </div>
  );
};

export default GameDetails;
