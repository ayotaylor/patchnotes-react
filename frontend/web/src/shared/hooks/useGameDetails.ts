import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Game } from '../types/game/game';
import { useGameCache } from '../components/GameCacheContext';

interface UseGameDetailsResult {
    game: Game | null;
    loading: boolean;
    error: string | null;
}

// const setRequestHeader = (): AxiosHeaders => {
//     const token: string | null = localStorage.getItem("token");
//     const headers = new AxiosHeaders({
//     });
//     headers.set("Authorization", `Bearer ${token}`);

//     return headers;
// };

const useGameDetails = (gameId: number) => {
    const { cache, addToCache } = useGameCache();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const token: string | null = localStorage.getItem("token");

    const fetchGameDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get<Game>(`http://localhost:8080/api/games/${gameId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setGame(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Not able to retrieve game');
        } finally {
            setLoading(false);
        }
    }, [gameId, cache, addToCache]);

    useEffect(() => {
        fetchGameDetails();
    }, [fetchGameDetails]);

    return {game, loading, error};
}

export default useGameDetails;