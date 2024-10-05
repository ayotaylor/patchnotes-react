import React from "react";
import { View, ScrollView, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { getReactNativeStyles } from "../../styles/game/reactNativeStyleAdapter";
import useGameDetails from "shared/hooks/useGameDetails";
import GameHeader from "../../components/game/GameHeader";
import GameActions from "../../components/game/GameActions";
import GameInfo from "../../components/game/GameInfo";
import GameStats from "../../components/game/GameStats";
import SimilarGames from "../../components/game/SimilarGames";

const styles = getReactNativeStyles();

type RootStackParamList = {
  GameDetails: { id: number };
};

type GameDetailsScreenRouteProp = RouteProp<RootStackParamList, 'GameDetails'>;

type Props = {
  route: GameDetailsScreenRouteProp;
};

const GameDetails: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const { game, loading, error } = useGameDetails(id);

  if (loading) return <View style={styles.layout.container}><Text>Loading...</Text></View>;
  if (error) return <View style={styles.layout.container}><Text>Error: {error}</Text></View>;
  if (!game) return <View style={styles.layout.container}><Text>No game found</Text></View>;

  return (
    <ScrollView style={styles.layout.container}>
      <View style={styles.layout.gameDetails}>
        <GameHeader
          name={game.name}
          cover={game.cover}
          releaseDate={game.firstReleaseDate}
          developer={game.developer}
          publisher={game.publisher}
        />
        <GameActions
          gameId={game.id}
          averageRating={game.averageRating}
        />
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
      </View>
    </ScrollView>
  );
};

export default GameDetails;