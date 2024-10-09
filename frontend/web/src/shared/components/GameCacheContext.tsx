import React, { createContext, useContext, useState } from 'react';
import { Game } from '../types/game/game';

interface GameCache {
  [id: number]: Game;
}

interface GameCacheContextType {
  cache: GameCache;
  addToCache: (game: Game) => void;
}

const GameCacheContext = createContext<GameCacheContextType | undefined>(undefined);

export const GameCacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cache, setCache] = useState<GameCache>({});

  const addToCache = (game: Game) => {
    setCache(prevCache => ({ ...prevCache, [game.id]: game }));
  };

  return (
    <GameCacheContext.Provider value={{ cache, addToCache }}>
      {children}
    </GameCacheContext.Provider>
  );
};

export const useGameCache = () => {
  const context = useContext(GameCacheContext);
  if (!context) {
    throw new Error('useGameCache must be used within a GameCacheProvider');
  }
  return context;
};