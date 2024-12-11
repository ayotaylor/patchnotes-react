import React from "react";
import {
  Bio,
  FollowButton,
  GameCard,
  NavContainer,
  ProfileActions,
  ProfileAvatar,
  ProfileButton,
  ProfileHeaderContent,
  ProfileHero,
  ProfileInfo,
  ProfileMainSection,
  ProfileTabs,
  StatItem,
  Stats,
  TabLink,
  Username,
} from "./styles";
import { Navigate, useLocation } from "react-router-dom";
import {
  ActivityItem,
  ActivityLink,
  ActivityRating,
  ActivityTime,
  GameImage,
  GameImageWrapper,
  GamesGrid,
  GameTitle,
  GameYear,
  ListCard,
  ListMeta,
  ListTitle,
  MainSection,
  PageContainer,
  ReviewCard,
  ReviewContent,
  ReviewHeader,
  ReviewMeta,
  ReviewPoster,
  ReviewText,
  ReviewTitle,
  SectionContent,
  SectionTitle,
  SideSection,
  TwoColumnGrid,
} from "@/styles/sharedStyles";

export const UserProfile: React.FC = () => {
  const user = {
    id: 1,
    username: "GameMaster",
    avatarUrl: "/api/placeholder/180/180",
    bio: "Passionate gamer exploring virtual worlds and sharing experiences. Always on the lookout for the next great adventure.",
    stats: {
      games: 245,
      lists: 12,
      reviews: 89,
      followers: 156,
      following: 143,
    },
  };
  // Sample data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "list",
      name: "best games from when i was smol",
      count: 4,
      title: "The Legend of Zelda: Tears of the Kingdom",
      image: "/api/placeholder/120/80",
      action: "Added to collection",
      date: "2 hours ago",
    },
    {
      id: 2,
      type: "review",
      game: "Baldur's Gate 3",
      title: "Baldur's Gate 3",
      rating: 4,
      image: "/api/placeholder/120/80",
      action: "Reviewed",
      date: "1 day ago",
    },
    {
      id: 3,
      game: "The Legend of Zelda: Tears of the Kingdom",
      type: "added",
      title: "Elden Ring",
      image: "/api/placeholder/120/80",
      action: "Added to wishlist",
      date: "2 days ago",
    },
  ];

  // Sample data for featured lists
  const featuredLists = [
    {
      id: 1,
      title: "Must-Play RPGs of 2023",
      gameCount: 25,
      likes: 156,
      description: "The best role-playing experiences from this year",
    },
    {
      id: 2,
      title: "Hidden Indie Gems",
      gameCount: 18,
      likes: 89,
      description: "Underrated masterpieces you might have missed",
    },
    {
      id: 3,
      title: "Best Soulslike Games",
      gameCount: 15,
      likes: 234,
      description: "Challenging adventures in the spirit of Dark Souls",
    },
  ];

  // Sample favorite games data
  const favoriteGames = [
    {
      id: 1,
      title: "Elden Ring",
      image: "/api/placeholder/200/300",
      year: 2022,
      rating: "5/5",
    },
    {
      id: 2,
      title: "Red Dead Redemption 2",
      image: "/api/placeholder/200/300",
      year: 2018,
      rating: "5/5",
    },
    {
      id: 3,
      title: "The Witcher 3",
      image: "/api/placeholder/200/300",
      year: 2015,
      rating: "5/5",
    },
    {
      id: 4,
      title: "God of War",
      image: "/api/placeholder/200/300",
      year: 2018,
      rating: "5/5",
    },
    {
      id: 5,
      title: "Hollow Knight",
      image: "/api/placeholder/200/300",
      year: 2017,
      rating: "5/5",
    },
  ];

  // Sample recent reviews data
  const recentReviews = [
    {
      id: 1,
      game: "Baldur's Gate 3",
      image: "/api/placeholder/100/150",
      rating: "5/5",
      likes: 5,
      comments: 10,
      date: "December 5, 2023",
      content:
        "An absolutely masterful RPG that sets new standards for the genre. The depth of character interaction, consequences of choices, and tactical combat create an unforgettable experience.",
    },
    {
      id: 2,
      game: "Alan Wake 2",
      image: "/api/placeholder/100/150",
      rating: "4.5/5",
      likes: 5,
      comments: 10,
      date: "November 28, 2023",
      content:
        "A mind-bending psychological thriller that pushes the boundaries of narrative gaming. The atmospheric world and innovative storytelling make this a must-play for horror fans.",
    },
  ];

  const location = useLocation();
  //const user = location.state?.user;
  //const profileUser = user || location.state?.user;  // Use auth user or passed user data

  //const { user } = useAuth();  //g get user from state
  const profileUser = user || location.state?.user; // Use auth user or passed user data

  const isCurrentUser = true;

  // Redirect if no user data is available
  if (!profileUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageContainer>
      <ProfileHero>
        <ProfileHeaderContent>
          <ProfileMainSection>
            <ProfileAvatar>
              <img src={user.avatarUrl} alt={user.username} />
            </ProfileAvatar>
            <ProfileInfo>
              <Username>{user.username}</Username>
              <Bio>{user.bio}</Bio>
              <ProfileActions>
                {isCurrentUser ? (
                  <ProfileButton>Edit Profile</ProfileButton>
                ) : (
                  <FollowButton>Follow</FollowButton>
                )}
              </ProfileActions>
            </ProfileInfo>
          </ProfileMainSection>

          <Stats>
            <StatItem to={`/users/${user.id}/collection`}>
              <span>{user.stats.games}</span> Games
            </StatItem>
            <StatItem to={`/users/${user.id}/lists`}>
              <span>{user.stats.lists}</span> Lists
            </StatItem>
            <StatItem to={`/users/${user.id}/reviews`}>
              <span>{user.stats.reviews}</span> Reviews
            </StatItem>
            <StatItem to={`/users/${user.id}/followers`}>
              <span>{user.stats.followers}</span> Followers
            </StatItem>
            <StatItem to={`/users/${user.id}/following`}>
              <span>{user.stats.following}</span> Following
            </StatItem>
          </Stats>
        </ProfileHeaderContent>
      </ProfileHero>

      <NavContainer>
        <ProfileTabs>
          <TabLink to={`/users/${user.id}`} $active>
            Profile
          </TabLink>
          <TabLink to={`/users/${user.id}/collection`}>Collection</TabLink>
          <TabLink to={`/users/${user.id}/lists`}>Lists</TabLink>
          <TabLink to={`/users/${user.id}/reviews`}>Reviews</TabLink>
          <TabLink to={`/users/${user.id}/likes`}>Likes</TabLink>
          <TabLink to={`/users/${user.id}/wishlist`}>Wishlist</TabLink>
        </ProfileTabs>
      </NavContainer>

      <SectionContent>
        <SectionTitle>Favorite Games</SectionTitle>
        <GamesGrid>
          {favoriteGames.map((game) => (
            <GameCard key={game.id} to={`/games/${game.id}`}>
              <GameImageWrapper>
                <GameImage src={game.image} alt={game.title} />
              </GameImageWrapper>
              <GameTitle>{game.title}</GameTitle>
              <GameYear>{game.year}</GameYear>
            </GameCard>
          ))}
        </GamesGrid>
      </SectionContent>

      <TwoColumnGrid>
        <MainSection>
          <SectionContent>
            <SectionTitle>Recent Reviews</SectionTitle>
            {recentReviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewPoster to={`/games/${review.id}`}>
                  <img src={review.image} alt={review.game} />
                </ReviewPoster>
                <ReviewContent>
                  <ReviewHeader>
                    <ReviewTitle to={`/games/${review.id}`}>
                      {review.game}
                    </ReviewTitle>
                    <ReviewMeta>
                      {review.rating} • {review.date}
                    </ReviewMeta>
                  </ReviewHeader>
                  <ReviewText>{review.content}</ReviewText>
                  <ReviewMeta>
                    {review.likes} likes • {review.comments} comments
                  </ReviewMeta>
                </ReviewContent>
              </ReviewCard>
            ))}
          </SectionContent>
        </MainSection>

        <SideSection>
          <SectionContent>
            <SectionTitle>Recent Activity</SectionTitle>
            {recentActivity.map((activity) => {
              if (activity.type === "added") {
                return (
                  <ActivityItem key={activity.id}>
                    Added{" "}
                    <ActivityLink to={`/games/${activity.id}`}>
                      {activity.game}
                    </ActivityLink>{" "}
                    to collection
                    <ActivityTime>{activity.date}</ActivityTime>
                  </ActivityItem>
                );
              }
              if (activity.type === "list") {
                return (
                  <ActivityItem key={activity.id}>
                    Created a new list{" "}
                    <ActivityLink to={`/users/${user.id}/lists/${activity.id}`}>
                      {activity.name}
                    </ActivityLink>{" "}
                    with {activity.count} games
                    <ActivityTime>{activity.date}</ActivityTime>
                  </ActivityItem>
                );
              }
              if (activity.type === "review") {
                return (
                  <ActivityItem key={activity.id}>
                    Reviewed{" "}
                    <ActivityLink to={`/games/${activity.id}`}>
                      {activity.game}
                    </ActivityLink>
                    <ActivityRating>{activity.rating}</ActivityRating>
                    <ActivityTime>{activity.date}</ActivityTime>
                  </ActivityItem>
                );
              }
              return null;
            })}
          </SectionContent>

          <SectionContent>
            <SectionTitle>Featured Lists</SectionTitle>
            {featuredLists.map((list) => (
              <ListCard key={list.id} to={`/users/${user.id}/lists/${list.id}`}>
                <ListTitle>{list.title}</ListTitle>
                <ListMeta>
                  {list.gameCount} games • {list.likes} likes
                </ListMeta>
                <ListMeta>{list.description}</ListMeta>
              </ListCard>
            ))}
          </SectionContent>
        </SideSection>
      </TwoColumnGrid>
    </PageContainer>
  );
};
