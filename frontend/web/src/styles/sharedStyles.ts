import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "@/styles/theme";

// Media query breakpoints
export const media = {
  mobile: `@media (max-width: ${({ theme }: { theme: Theme }) =>
    theme.breakpoints.sm}px)`,
  tablet: `@media (max-width: ${({ theme }: { theme: Theme }) =>
    theme.breakpoints.md}px)`,
  desktop: `@media (max-width: ${({ theme }: { theme: Theme }) =>
    theme.breakpoints.lg}px)`,
};

// Common container components
export const PageContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.default};
`;

export const MainContent = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

// Common layout components
export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const TwoColumnGrid = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  ${media.desktop} {
    grid-template-columns: 3fr 2fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing.lg};
  }

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

// Common section headers
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

// Common card components
export const CardBase = styled(Link)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface.elevated};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.background.alternate};
  }

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

// Common grid components
export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  ${media.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

// Common image components
export const GameImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 150%; // 2:3 aspect ratio
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.background.paper};
`;

export const GameImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.default};
`;

// Common text components
export const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.3;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const GameYear = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const GameMeta = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Review styles
export const ReviewCard = styled.article`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    flex-direction: column;
  }
`;

export const ReviewPoster = styled(Link)`
  width: 100px;
  flex-shrink: 0;

  ${media.mobile} {
    width: 80px;
    float: left;
    margin-right: ${({ theme }) => theme.spacing.md};
  }

  img {
    width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ReviewGameImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const ReviewTitle = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.3;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  ${media.tablet} {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
  }
`;

export const ReviewContent = styled.div`
  flex: 1;
`;

export const ReviewGameTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

export const ReviewText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const ReviewMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Additional styled components for Activity items
// TODO: maybe move to profile specific since that's the only place it might appear
export const ActivityItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ActivityTime = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ActivityRating = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  margin: 0 ${({ theme }) => theme.spacing.xs};
`;

// List section
// export const ListCard = styled(CardBase)`
//   flex-direction: column;
//   border: 1px solid ${({ theme }) => theme.colors.border.light};
// `;

export const ListCard = styled(CardBase)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface.elevated};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  &:hover {
    background: ${({ theme }) => theme.colors.background.alternate};
  }

  ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const ListTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.3;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const ListMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;
