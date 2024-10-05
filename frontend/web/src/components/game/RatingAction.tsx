import React, { useState } from "react";
import axios from "axios";
import { getWebStyles } from "../../styles/game/webStyleAdapter";

const styles = getWebStyles();

interface RatingActionProps {
  gameId: number;
  initialRating: number;
}

const RatingAction: React.FC<RatingActionProps> = ({
  gameId,
  initialRating,
}) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleRating = async (newRating: number) => {
    try {
      await axios.post(`/api/games/${gameId}/rate`, { rating: newRating });
      setRating(newRating);
    } catch (error) {
      console.error("Error rating game:", error);
    }
  };

  return (
    <div style={styles.ratingAction.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          style={
            star <= rating
              ? {
                  ...styles.ratingAction.star,
                  ...styles.ratingAction.activeStar,
                }
              : styles.ratingAction.star
          }
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingAction;
