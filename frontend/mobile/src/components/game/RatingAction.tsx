import React, { useState } from "react"
import axios from "axios";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getReactNativeStyles } from "../../styles/game/reactNativeStyleAdapter";

const styles = getReactNativeStyles();

interface RatingActionProps {
    gameId: number;
    initialRating: number;
}

const RatingAction: React.FC<RatingActionProps> = ({ gameId, initialRating }) => {
    const [rating, setRating] = useState<number>(initialRating);

    const handleRating = async (newRating: number) => {
        try {
            // check if axios is best for react native
            await axios.post(`/api/games/${gameId}/rate`, { rating: newRating });
            setRating(newRating);
        } catch (error) {
            console.error('Error rating game:', error);
        }
    };

    return (
        <View style={styles.ratingAction.container}>
            {[1,2,3,4,5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                    <Text style={[styles.ratingAction.star, star <= rating && styles.ratingAction.activeStar]}>★</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default RatingAction;