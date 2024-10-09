import React from "react";
import { SharedStyles } from "../../shared/styles/sharedStyles";
import RatingAction from "./RatingAction";

interface GameActionProps {
  gameId: number;
  averageRating: number;
  styles: ReturnType<
    typeof import("../../styles/game/webStyleAdapter").getWebStyles
  >;
}

const GameActions: React.FC<GameActionProps> = ({
  gameId,
  averageRating,
  styles,
}) => {
  const buttonStyle = {
    ...styles.gameActions.button,
    backgroundColor: styles.currentTheme.cardBackground,
    color: styles.currentTheme.text,
  };

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
      <button style={buttonStyle} onClick={handleWishlist}>
        <span style={buttonStyle}>Add to Wishlist</span>
      </button>
      <button style={buttonStyle} onClick={handleLike}>
        <span style={buttonStyle}>Like</span>
      </button>
      <RatingAction
        gameId={gameId}
        initialRating={Math.round(averageRating)}
        styles={styles}
      />
      <button style={buttonStyle} onClick={handleAddToList}>
        <span style={buttonStyle}>Add to List</span>
      </button>
      <button style={buttonStyle} onClick={handleShare}>
        <span style={buttonStyle}>Share</span>
      </button>
    </div>
  );
};

export default GameActions;
