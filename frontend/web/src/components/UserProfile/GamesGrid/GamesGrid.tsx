import { Game } from 'types/game';
import * as S from './styles';
import { useTheme } from 'theme/ThemeContext';
import { useMemo, useState } from 'react';
import { FilterButton } from 'components/FilterButton';
import { GameStatus } from 'types/gameStatus';

interface GamesGridProps {
    games: Game[];
    onGameClick?: (game: Game) => void;
  }

  export const GamesGrid: React.FC<GamesGridProps> = ({
    games,
    onGameClick
  }) => {
    const [filter, setFilter] = useState<GameStatus | 'all'>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');
    const { theme } = useTheme();

    const filteredGames = useMemo(() => {
      let filtered = filter === 'all'
        ? games
        : games.filter(game => game.status === filter);

      return filtered.sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        return new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime();
      });
    }, [games, filter, sortBy]);

    return (
      <div>
        <S.FilterSection>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton
            active={filter === 'playing'}
            onClick={() => setFilter('playing')}
          >
            Playing
          </FilterButton>
          <FilterButton
            active={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </FilterButton>
          <FilterButton
            active={filter === 'backlog'}
            onClick={() => setFilter('backlog')}
          >
            Backlog
          </FilterButton>
        </S.FilterSection>

        <S.GridContainer>
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onGameClick?.(game)}
            />
          ))}
        </S.GridContainer>
      </div>
    );
  };

  interface GameCardProps {
    game: Game;
    onClick?: () => void;
  }

  const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
    return (
      <S.GameCard onClick={onClick}>
        <S.GameImage src={game.cover} alt={game.name} />
        <S.GameOverlay>
          <S.GameTitle>{game.name}</S.GameTitle>
          <S.GameMeta>
            {game.rating && <span>{game.rating}/10</span>}
            <span>{game.status}</span>
          </S.GameMeta>
        </S.GameOverlay>
      </S.GameCard>
    );
  };