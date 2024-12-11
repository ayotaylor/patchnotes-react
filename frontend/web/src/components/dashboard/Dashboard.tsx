import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardContainer,
  DashboardSection,
  SectionTitle,
  GameGrid,
  GameCard,
  GameImage,
  GameTitle,
} from "./styles";
import { useAuth } from "@/hooks/useAuth";

export const Dashboard: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth(); // Get user from auth context
  const userData = user || location.state?.user; // Use either source of user data
  // Placeholder data - replace with actual API calls
  const recentGames = Array(6).fill({
    id: "1",
    title: "Sample Game",
    imageUrl: "/api/placeholder/150/225",
  });

  const recommendedGames = Array(6).fill({
    id: "2",
    title: "Recommended Game",
    imageUrl: "/api/placeholder/150/225",
  });

  return (
    <DashboardContainer>
      <div>
      {userData && (
          <DashboardSection>
            <SectionTitle>Welcome, {userData.username}!</SectionTitle>
            <Link
              to={`/users/${userData.username}`}
              state={{ user: userData }}
            >
              View Profile
            </Link>
          </DashboardSection>
        )}
        <DashboardSection>
          <SectionTitle>Recently Added</SectionTitle>
          <GameGrid>
            {recentGames.map((game, index) => (
              <Link to={`/games/${game.id}`} key={`${game.id}-${index}`}>
                <GameCard>
                  <GameImage src={game.imageUrl} alt={game.title} />
                  <GameTitle>{game.title}</GameTitle>
                </GameCard>
              </Link>
            ))}
          </GameGrid>
        </DashboardSection>

        <DashboardSection>
          <SectionTitle>Recommended For You</SectionTitle>
          <GameGrid>
            {recommendedGames.map((game, index) => (
              <Link to={`/games/${game.id}`} key={`${game.id}-${index}`}>
                <GameCard>
                  <GameImage src={game.imageUrl} alt={game.title} />
                  <GameTitle>{game.title}</GameTitle>
                </GameCard>
              </Link>
            ))}
          </GameGrid>
        </DashboardSection>
      </div>

      <div>
        <DashboardSection>
          <SectionTitle>Activity Feed</SectionTitle>
          {/* Add activity feed components here */}
        </DashboardSection>
      </div>
    </DashboardContainer>
  );
};
