import * as S from '../../styles/components/UserProfile/styles';

interface StatsBarProps {
  totalGames: number;
  gamesThisYear: number;
  totalLists: number;
  followers: number;
  following: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalGames,
  gamesThisYear,
  totalLists,
  followers,
  following
}) => {
  return (
    <S.StatsContainer>
      <S.StatsGrid>
        <S.StatItem>
          <S.StatValue>{totalGames}</S.StatValue>
          <S.StatLabel>Games</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{gamesThisYear}</S.StatValue>
          <S.StatLabel>This Year</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{totalLists}</S.StatValue>
          <S.StatLabel>Lists</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{followers}</S.StatValue>
          <S.StatLabel>Followers</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{following}</S.StatValue>
          <S.StatLabel>Following</S.StatLabel>
        </S.StatItem>
      </S.StatsGrid>
    </S.StatsContainer>
  );
};
