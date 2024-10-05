import React from "react";
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { getReactNativeStyles } from "../../styles/game/reactNativeStyleAdapter";

const baseStyles = getReactNativeStyles();

const styles = StyleSheet.create({
  ...baseStyles.gameHeader,
  container: baseStyles.gameHeader.container as ViewStyle,
  cover: baseStyles.gameHeader.cover as ImageStyle,
  info: baseStyles.gameHeader.info as ViewStyle,
  title: baseStyles.gameHeader.title as TextStyle,
  detail: baseStyles.gameHeader.detail as TextStyle,
});

interface GameHeaderProps {
    name: string;
    cover: string;
    releaseDate: string;
    developer: string;
    publisher: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ name, cover, releaseDate, developer, publisher }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: cover }} style={styles.cover}/>
            <View style={styles.info}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.detail}>Release Date: {new Date(releaseDate).toLocaleDateString()}</Text>
                <Text style={styles.detail}>Developer: {developer}</Text>
                <Text style={styles.detail}>Publisher: {publisher}</Text>
            </View>
        </View>
    );
};

export default GameHeader;