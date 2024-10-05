import React from "react";
import { getWebStyles } from "../../styles/game/webStyleAdapter";const styles = getWebStyles();

interface GameInfoProps {
    summary: string;
    storyLine: string;
    platforms: string[];
    genres: string[];
}

const GameInfo: React.FC<GameInfoProps> = ({ summary, storyLine, platforms, genres }) => {
    console.log('info - the storyline is:', storyLine);
    return (
        <div style={styles.gameInfo.container}>
            <h2 style={styles.gameInfo.heading}>Game Information</h2>
            <h3 style={styles.gameInfo.subheading}>Summary</h3>
            <p style={styles.gameInfo.text}>{summary}</p>
            {storyLine && (
                <>
                    <h3 style={styles.gameInfo.subheading}>Storyline</h3>
                    <p style={styles.gameInfo.text}>{storyLine}</p>
                </>
            )}
            <h3 style={styles.gameInfo.subheading}>Platforms</h3>
            <ul>
                {platforms.map((platform, index) => (
                    <li key={index} style={styles.gameInfo.listItem}>{platform}</li>
                ))}
            </ul>
            <h3 style={styles.gameInfo.subheading}>Genres</h3>
            <ul>
                {genres.map((genre, index) => (
                    <li key={index} style={styles.gameInfo.listItem}>{genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameInfo;