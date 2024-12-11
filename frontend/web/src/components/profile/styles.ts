import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "@/styles/sharedStyles";

export const ProfileHero = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    ${({ theme }) => theme.colors.background.default} 100%
  );
  display: flex;
  align-items: flex-end;

  ${media.tablet} {
    height: 240px;
  }

  ${media.mobile} {
    height: 200px;
  }
`;

export const ProfileHeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;

  ${media.tablet} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
    flex-direction: column;
  }

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const ProfileMainSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.background.default};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  ${media.mobile} {
    width: 100px;
    height: 100px;
    border-width: 3px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const NavContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-top: 75px;

  ${media.mobile} {
    margin-top: 50px;
    overflow-x: auto;
  }
`;

export const ProfileTabs = styled.nav`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center; // Center the tabs horizontally
  align-items: center; // Center vertically if needed

  ${media.tablet} {
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }

  ${media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};
    min-width: min-content;
    overflow-x: auto; // Allow scrolling on mobile if tabs overflow
    justify-content: flex-start; // Start alignment for scrollable tabs
    -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS

    /* Hide scrollbar but keep functionality */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Profile actions
export const ProfileActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ProfileButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.surface.elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.background.alternate};
  }
`;

export const FollowButton = styled(ProfileButton)`
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const TabLink = styled(Link)<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : theme.colors.text.secondary};
  text-decoration: none;
  border-bottom: 2px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary.main : 'transparent'};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Username = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #fff;
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

export const Stats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: rgba(255, 255, 255, 0.7);
  justify-content: flex-end;
  min-width: max-content;

  ${media.tablet} {
    margin-top: ${({ theme }) => theme.spacing.lg};
    justify-content: flex-start;
  }

  ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    flex-wrap: wrap;
  }
`;

export const StatItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  span {
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

export const Bio = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.md} 0;
  max-width: 600px;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const GameCard = styled(Link)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface.elevated};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.background.alternate};
  }
`;