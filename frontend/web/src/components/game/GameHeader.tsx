import React from "react";
import { getWebStyles } from "../../styles/game/webStyleAdapter";

const styles = getWebStyles();

interface GameHeaderProps {
    name: string;
    cover: string;
    releaseDate: string;
    developer: string;
    publisher: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ name, cover, releaseDate, developer, publisher }) => {
    return (
        <header style={styles.gameHeader.container}>
            <img src={cover} alt={`${name} cover`} style={styles.gameHeader.cover} />
            <div style={styles.gameHeader.info}>
                <h1 style={styles.gameHeader.title}>{name}</h1>
                <p style={styles.gameHeader.detail}>Release Date: {new Date(releaseDate).toLocaleDateString()}</p>
                <p style={styles.gameHeader.detail}>Developer: {developer}</p>
                <p style={styles.gameHeader.detail}>Publisher: {publisher}</p>
            </div>
        </header>
    );
};

export default GameHeader;