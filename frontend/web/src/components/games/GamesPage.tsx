import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PageContainer,
  SectionContent,
  MainSection,
  SideSection,
  TwoColumnGrid,
  SectionTitle,
  GamesGrid,
  GameImageWrapper,
  GameImage,
  GameTitle,
  GameMeta,
  ReviewCard,
  ReviewHeader,
  ReviewerAvatar,
  ReviewerInfo,
  ReviewerName,
  ReviewPoster,
  ReviewContent,
  ReviewTitleLink,
  ReviewActions,
  ActionButton,
} from "@/styles/sharedStyles";
import {
  GamesSectionHeader,
  FilterBar,
  FilterChip,
  CrewPickCard,
  PopularReviewerCard,
} from "./styles";

type FilterType = "all" | "new" | "popular" | "upcoming";

export const GamesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("popular");

  const handleLike = (reviewId: number) => {
    // Handle like action
    console.log("Liked review:", reviewId);
  };

  const handleComment = (reviewId: number) => {
    // Handle comment action
    console.log("Comment on review:", reviewId);
  };

  const handleShare = (reviewId: number) => {
    // Handle share action
    console.log("Share review:", reviewId);
  };

  const popularGames = [
    {
      id: 1,
      title: "Marvel's Spider-Man 2",
      image: "/api/placeholder/160/240",
      releaseYear: 2023,
      rating: "4.5",
    },
    // Add more games...
  ];

  const recentReviews = [
    {
      id: 1,
      game: {
        id: 101,
        title: "Baldur's Gate 3",
        image: "/api/placeholder/400/225",
      },
      reviewer: {
        id: 1,
        name: "GameCritic",
        avatar: "/api/placeholder/40/40",
      },
      content: "A masterpiece that sets new standards for CRPGs...",
      rating: "★★★★★",
      date: "2 hours ago",
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      game: {
        id: 102,
        title: "Metal Gear Solid 3",
        image: "/api/placeholder/400/225",
      },
      reviewer: {
        id: 1,
        name: "I hate games hence I review them",
        avatar: "/api/placeholder/40/40",
      },
      content:
        "This game is painfully reductive. Can you believe it copies elements from it's predecessors??",
      rating: "★★★★★",
      date: "2 hours ago",
      likes: 234,
      comments: 45,
    },
    {
      id: 3,
      game: {
        id: 101,
        title: "The Legend Of Zelda OG",
        image: "/api/placeholder/400/225",
      },
      reviewer: {
        id: 1,
        name: "Nintendo cuck",
        avatar: "/api/placeholder/40/40",
      },
      content: "A masterpiece that sets new standards for all forms of art...",
      rating: "★★★★★",
      date: "2 hours ago",
      likes: 234,
      comments: 45,
    },
  ];

  const crewPicks = [
    {
      id: 1,
      title: "Super Mario Wonder",
      image: "/api/placeholder/80/120",
      description: "A delightful return to 2D platforming excellence",
      curator: "John Doe",
    },
    // Add more picks...
  ];

  const popularReviewers = [
    {
      id: 1,
      name: "ProGamer",
      avatar: "/api/placeholder/40/40",
      reviews: 156,
      followers: 2400,
    },
  ];

  return (
    <PageContainer>
      <SectionContent>
        <GamesSectionHeader>
          <SectionTitle>Games</SectionTitle>
          <FilterBar>
            <FilterChip
              $active={activeFilter === "popular"}
              onClick={() => setActiveFilter("popular")}
            >
              Popular
            </FilterChip>
            <FilterChip
              $active={activeFilter === "new"}
              onClick={() => setActiveFilter("new")}
            >
              New Releases
            </FilterChip>
            <FilterChip
              $active={activeFilter === "upcoming"}
              onClick={() => setActiveFilter("upcoming")}
            >
              Upcoming
            </FilterChip>
            <FilterChip
              $active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            >
              All Games
            </FilterChip>
          </FilterBar>
        </GamesSectionHeader>

        <GamesGrid>
          {popularGames.map((game) => (
            <Link key={game.id} to={`/games/${game.id}`}>
              <GameImageWrapper>
                <GameImage src={game.image} alt={game.title} />
              </GameImageWrapper>
              <GameTitle>{game.title}</GameTitle>
              <GameMeta>
                {game.releaseYear} • {game.rating}★
              </GameMeta>
            </Link>
          ))}
        </GamesGrid>
      </SectionContent>

      <TwoColumnGrid>
        <MainSection>
          <SectionTitle>Popular Reviews This Week</SectionTitle>
          {recentReviews.map((review) => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <ReviewerAvatar
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                />
                <ReviewerInfo>
                  <ReviewerName to={`/users/${review.reviewer.id}`}>
                    {review.reviewer.name}
                  </ReviewerName>
                  <GameMeta>{review.date}</GameMeta>
                </ReviewerInfo>
              </ReviewHeader>

              <ReviewPoster to={`/reviews/${review.id}`}>
                <img src={review.game.image} alt={review.game.title} />
              </ReviewPoster>

              <ReviewContent>
                <ReviewTitleLink to={`/reviews/${review.id}`}>
                  <GameTitle>{review.game.title}</GameTitle>
                </ReviewTitleLink>
                <GameMeta>{review.rating}</GameMeta>
                <p>{review.content}</p>

                <ReviewActions>
                  <ActionButton onClick={() => handleLike(review.id)}>
                    <span>👍</span> {review.likes}
                  </ActionButton>
                  <ActionButton onClick={() => handleComment(review.id)}>
                    <span>💬</span> {review.comments}
                  </ActionButton>
                  <ActionButton onClick={() => handleShare(review.id)}>
                    <span>↗️</span> Share
                  </ActionButton>
                </ReviewActions>
              </ReviewContent>
            </ReviewCard>
          ))}
        </MainSection>

        <SideSection>
          <div>
            <SectionTitle>Crew Picks</SectionTitle>
            {crewPicks.map((pick) => (
              <CrewPickCard key={pick.id} to={`/games/${pick.id}`}>
                <GameImageWrapper
                  style={{ width: "80px", paddingTop: "120px" }}
                >
                  <GameImage src={pick.image} alt={pick.title} />
                </GameImageWrapper>
                <div>
                  <GameTitle>{pick.title}</GameTitle>
                  <GameMeta>{pick.description}</GameMeta>
                  <GameMeta>Picked by {pick.curator}</GameMeta>
                </div>
              </CrewPickCard>
            ))}
          </div>

          <div>
            <SectionTitle>Popular Reviewers</SectionTitle>
            {popularReviewers.map((reviewer) => (
              <PopularReviewerCard key={reviewer.id}>
                <ReviewerAvatar src={reviewer.avatar} alt={reviewer.name} />
                <ReviewerInfo>
                  <ReviewerName to={`/users/${reviewer.id}`}>
                    {reviewer.name}
                  </ReviewerName>
                  <GameMeta>
                    {reviewer.reviews} reviews • {reviewer.followers} followers
                  </GameMeta>
                </ReviewerInfo>
              </PopularReviewerCard>
            ))}
          </div>
        </SideSection>
      </TwoColumnGrid>
    </PageContainer>
  );
};

export default GamesPage;
