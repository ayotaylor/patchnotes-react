import React from 'react';
import RatingAction from './RatingAction';
import { getReactNativeStyles } from "../../styles/game/reactNativeStyleAdapter";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const styles = getReactNativeStyles();

interface GameActionProps {
  gameId: number;
  averageRating: number;
}

const GameActions: React.FC<GameActionProps> = ({gameId, averageRating}) => {
  const handleWishlist = () => {
    console.log('Add to wishlist');
  };

  const handleLike = () => {
    console.log('Liked game');
  };

  const handleAddToList = () => {
    console.log('Added to list');
  };

  const handleShare = () => {
    console.log('Shared game');
  };

  return (
    <View style={styles.gameActions.container}>
      <TouchableOpacity
        style={styles.gameActions.button}
        onPress={() => handleWishlist}>
        <Text style={styles.gameActions.buttonText}>Wishlist</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gameActions.button}
        onPress={() => handleLike}>
        <Text style={styles.gameActions.buttonText}>Like</Text>
      </TouchableOpacity>
      <RatingAction gameId={gameId} initialRating={Math.round(averageRating)} />
      <TouchableOpacity
        style={styles.gameActions.button}
        onPress={() => handleAddToList}>
        <Text style={styles.gameActions.buttonText}>Add to List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gameActions.button}
        onPress={() => handleShare}>
        <Text style={styles.gameActions.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameActions;
