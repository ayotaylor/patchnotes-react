import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { getReactNativeStyles } from "../../styles/game/reactNativeStyleAdapter";

const styles = getReactNativeStyles();

interface GameInfoProps {
  summary: string;
  storyLine?: string;
  platforms: string[];
  genres: string[];
}

const GameInfo: React.FC<GameInfoProps> = ({
  summary,
  storyLine,
  platforms,
  genres,
}) => {
  return (
    <ScrollView style={styles.gameInfo.container}>
      <Text style={styles.gameInfo.heading}>Game Information</Text>
      <Text style={styles.gameInfo.subheading}>Summary</Text>
      <Text style={styles.gameInfo.text}>{summary}</Text>
      {storyLine && (
        <>
          <Text style={styles.gameInfo.subheading}>Storyline</Text>
          <Text style={styles.gameInfo.text}>{storyLine}</Text>
        </>
      )}
      <Text style={styles.gameInfo.subheading}>Platforms</Text>
      <View style={styles.gameInfo.list}>
        {platforms.map((platform, index) => (
          <View key={index} style={styles.gameInfo.listItem}>
            <Text style={styles.gameInfo.text}>{platform}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.gameInfo.subheading}>Genres</Text>
      <View style={styles.gameInfo.list}>
        {genres.map((genre, index) => (
          <View key={index} style={styles.gameInfo.listItem}>
            <Text style={styles.gameInfo.text}>{genre}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GameInfo;
