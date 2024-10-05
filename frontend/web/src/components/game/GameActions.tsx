import React from "react";
import { getWebStyles } from "../../styles/game/webStyleAdapter";
import RatingAction from "./RatingAction";

const styles = getWebStyles();

interface GameActionProps {
  gameId: number;
  averageRating: number;
}

const GameActions: React.FC<GameActionProps> = ({ gameId, averageRating }) => {
  const handleWishlist = () => {
    console.log("Add to wishlist");
  };

  const handleLike = () => {
    console.log("Liked game");
  };

  const handleAddToList = () => {
    console.log("Added to list");
  };

  const handleShare = () => {
    console.log("Shared game");
  };

  return (
    <div style={styles.gameActions.container}>
      <button style={styles.gameActions.button} onClick={handleWishlist}>
        <span style={styles.gameActions.buttonText}>Add to Wishlist</span>
      </button>
      <button style={styles.gameActions.buttonText} onClick={handleLike}>
        <span style={styles.gameActions.buttonText}>Like</span>
      </button>
      <RatingAction gameId={gameId} initialRating={Math.round(averageRating)} />
      <button style={styles.gameActions.button} onClick={handleAddToList}>
        <span style={styles.gameActions.buttonText}>Add to List</span>
      </button>
      <button style={styles.gameActions.button} onClick={handleShare}>
        <span style={styles.gameActions.buttonText}>Share</span>
      </button>
    </div>
  );
};

export default GameActions;
