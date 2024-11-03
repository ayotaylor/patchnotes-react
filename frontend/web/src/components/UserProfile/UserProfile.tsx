import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { useResponsive } from '../../utils/responsive/responsive';
import * as S from '../../styles/components/UserProfile/styles';
import { ProfileHeader } from './ProfileHeader';
import { StatsBar } from './StatsBar';
import { TabNavigation } from './TabNavigation';
import { GamesGrid } from './GamesGrid/GamesGrid';
import { ListsSection } from './ListsSection/ListsSections';
import { ReviewsSection } from '../ReviewsSection/ReviewsSection';
import { User } from 'types/user';
import { Game } from 'types/game';
import { List } from 'types/list';
import { Review } from 'types/reviews';

interface UserProfileProps {
  user: User;
  games: Game[];
  lists: List[];
  reviews: Review[];
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  games,
  lists,
  reviews
}) => {
  const [activeTab, setActiveTab] = useState('games');
  const { theme } = useTheme();
  const responsive = useResponsive();

  return (
    <S.ProfileContainer>
      <ProfileHeader user={user} />
      <StatsBar
        totalGames={games.length}
        gamesThisYear={user.gamesThisYear}
        totalLists={lists.length}
        followers={user.followers}
        following={user.following}
      />
      <S.ProfileContent>
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeTab === 'games' && <GamesGrid games={games} />}
        {activeTab === 'lists' && <ListsSection lists={lists} />}
        {activeTab === 'reviews'
          && <ReviewsSection
              reviews={reviews}
              onReviewClick={() => console.log('review clicked')}
              onLikeClick={() => console.log('review clicked')} />}
      </S.ProfileContent>
    </S.ProfileContainer>
  );
};