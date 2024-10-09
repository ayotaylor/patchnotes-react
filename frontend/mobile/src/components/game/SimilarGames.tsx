import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle, TextStyle, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
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

  // Define your navigation params
type RootStackParamList = {
  GameDetails: { id: number };
  // Add other routes as needed
};

  interface SimilarGamesProps {
    games: SimilarGame[];
  }

const SimilarGames: React.FC<SimilarGamesProps> = ({ games }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = 150; // Adjust as needed

  const handlePress = (gameId: number) => {
    navigation.navigate('GameDetails', { id: gameId });
  };

  const renderItem = ({ item }: { item: SimilarGame }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: itemWidth,
          //backgroundColor: styles.cardBackground,
          marginRight: 10,
        }
      ]}
      onPress={() => handlePress(item.id)}
    >
      <Image
        source={{ uri: item.cover }}
        style={[styles.cardImage, { width: itemWidth, height: itemWidth * 1.5 }]}
      />
      <Text style={[styles.cardTitle/*, { color: styles.cardTitle }*/]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, /*{ backgroundColor: styles.background }*/]}>
      <Text style={[styles.heading/*, { color: styles.currentTheme.accent }*/]}>
        Similar Games
      </Text>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.heading}>Similar Games</Text>
    //   <FlatList
    //     data={games}
    //     renderItem={({ item }) => (
    //       <View style={styles.card}>
    //         <Image source={{ uri: item.cover }} style={styles.cardImage} />
    //         <Text style={styles.cardTitle}>{item.name}</Text>
    //       </View>
    //     )}
    //     keyExtractor={(item) => item.igdbId.toString()}
    //     numColumns={2}
    //     columnWrapperStyle={styles.grid}
    //   />
    // </View>
  );
};

export default SimilarGames;