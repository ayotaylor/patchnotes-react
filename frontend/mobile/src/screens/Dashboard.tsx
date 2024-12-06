import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/layout/Header";
import {
  DashboardContainer,
  SectionTitle,
  GameGridContainer,
  GameCard,
  GameImage,
  GameTitle,
} from "../components/layout/styles";

export const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  // Placeholder data - replace with actual API calls
  const recentGames = Array(4).fill({
    id: "1",
    title: "Sample Game",
    imageUrl: "https://via.placeholder.com/150x225",
  });

  const recommendedGames = Array(4).fill({
    id: "2",
    title: "Recommended Game",
    imageUrl: "https://via.placeholder.com/150x225",
  });

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <DashboardContainer>
        <SectionTitle>Recently Added</SectionTitle>
        <GameGridContainer>
          {recentGames.map((game, index) => (
            <GameCard
              key={`${game.id}-${index}`}
              onPress={() =>
                navigation.navigate("GameDetails", { gameId: game.id })
                // navigation.navigate("GameDetails", { gameId: game.id })
              }
            >
              <GameImage source={{ uri: game.imageUrl }} resizeMode="cover" />
              <GameTitle>{game.title}</GameTitle>
            </GameCard>
          ))}
        </GameGridContainer>

        <SectionTitle>Recommended For You</SectionTitle>
        <GameGridContainer>
          {recommendedGames.map((game, index) => (
            <GameCard
              key={`${game.id}-${index}`}
              onPress={() =>
                navigation.navigate("GameDetails", { gameId: game.id })
              }
            >
              <GameImage source={{ uri: game.imageUrl }} resizeMode="cover" />
              <GameTitle>{game.title}</GameTitle>
            </GameCard>
          ))}
        </GameGridContainer>
      </DashboardContainer>
    </View>
  );
};
