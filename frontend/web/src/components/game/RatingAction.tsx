import React, { useState } from "react";
import axios from "axios";
import { SharedStyles } from "../../shared/styles/sharedStyles";

interface RatingActionProps {
  gameId: number;
  initialRating: number;
  styles: ReturnType<
    typeof import("../../styles/game/webStyleAdapter").getWebStyles
  >;
}

const RatingAction: React.FC<RatingActionProps> = ({
  gameId,
  initialRating,
  styles,
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
          style={{
            ...styles.ratingAction.star,
            color:
              star <= rating
                ? styles.currentTheme.accent
                : styles.currentTheme.secondary,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingAction;
