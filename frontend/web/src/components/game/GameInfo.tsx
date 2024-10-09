import React from "react";
import { SharedStyles } from "../../shared/styles/sharedStyles";

interface GameInfoProps {
  summary: string;
  storyLine: string;
  platforms: string[];
  genres: string[];
  styles: ReturnType<
    typeof import("../../styles/game/webStyleAdapter").getWebStyles
  >;
}

const GameInfo: React.FC<GameInfoProps> = ({
  summary,
  storyLine,
  platforms,
  genres,
  styles,
}) => {
  return (
    <div
      style={{
        ...styles.gameInfo.container,
        backgroundColor: styles.currentTheme.background,
      }}
    >
      <h2
        style={{
          ...styles.gameInfo.heading,
          color: styles.currentTheme.accent,
        }}
      >
        Game Information
      </h2>
      <h3
        style={{
          ...styles.gameInfo.subheading,
          color: styles.currentTheme.text,
        }}
      >
        Summary
      </h3>
      <p style={{ ...styles.gameInfo.text, color: styles.currentTheme.text }}>
        {summary}
      </p>
      {storyLine && (
        <>
          <h3
            style={{
              ...styles.gameInfo.subheading,
              color: styles.currentTheme.text,
            }}
          >
            Storyline
          </h3>
          <p
            style={{ ...styles.gameInfo.text, color: styles.currentTheme.text }}
          >
            {storyLine}
          </p>
        </>
      )}
      <h3
        style={{
          ...styles.gameInfo.subheading,
          color: styles.currentTheme.text,
        }}
      >
        Platforms
      </h3>
      <ul>
        {platforms.map((platform, index) => (
          <li
            key={index}
            style={{
              ...styles.gameInfo.listItem,
              backgroundColor: styles.currentTheme.background,
              color: styles.currentTheme.text,
            }}
          >
            {platform}
          </li>
        ))}
      </ul>
      <h3
        style={{
          ...styles.gameInfo.subheading,
          color: styles.currentTheme.text,
        }}
      >
        Genres
      </h3>
      <ul>
        {genres.map((genre, index) => (
          <li
            key={index}
            style={{
              ...styles.gameInfo.listItem,
              backgroundColor: styles.currentTheme.background,
              color: styles.currentTheme.text,
            }}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameInfo;
