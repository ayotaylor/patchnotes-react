import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle, TextStyle, FlatList } from 'react-native';
import { getReactNativeStyles } from "../../styles/game/reactNativeStyleAdapter";
import { SimilarGame } from 'shared/types/game/similarGame';

const baseStyles = getReactNativeStyles();

type SimilarGamesStyles = {
    container: ViewStyle;
    heading: TextStyle;
    grid: ViewStyle;
    card: ViewStyle;
    cardImage: ImageStyle;
    cardTitle: TextStyle;
  };

  const styles = StyleSheet.create<SimilarGamesStyles>({
    container: baseStyles.similarGames.container as ViewStyle,
    heading: baseStyles.similarGames.heading as TextStyle,
    grid: baseStyles.similarGames.grid as ViewStyle,
    card: baseStyles.similarGames.card as ViewStyle,
    cardImage: baseStyles.similarGames.cardImage as ImageStyle,
    cardTitle: baseStyles.similarGames.cardTitle as TextStyle,
  });

  interface SimilarGamesProps {
    games: SimilarGame[];
  }

const SimilarGames: React.FC<SimilarGamesProps> = ({ games }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Similar Games</Text>
      <FlatList
        data={games}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.cover }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.igdbId.toString()}
        numColumns={2}
        columnWrapperStyle={styles.grid}
      />
    </View>
  );
};

export default SimilarGames;