// src/components/web/UserProfile/styles.ts
import styled from 'styled-components';
import { Theme } from '../../../theme/types';
import { up, down } from '../../../utils/responsive/responsive';

export const ProfileContainer = styled.div<{ theme: Theme }>`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const BannerContainer = styled.div<{ theme: Theme }>`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.spacing.xxl * 4}px;

  ${down('md')} {
    height: ${({ theme }) => theme.spacing.xxl * 3}px;
  }
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BannerOverlay = styled.div<{ theme: Theme }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.spacing.xxl}px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.colors.background.main}
  );
`;

export const ProfileContent = styled.div<{ theme: Theme }>`
  max-width: ${({ theme }) => theme.breakpoints.xl}px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md}px;

  ${up('md')} {
    padding: ${({ theme }) => theme.spacing.lg}px;
  }
`;

export const UserInfoSection = styled.div<{ theme: Theme }>`
  position: relative;
  margin-top: -${({ theme }) => theme.spacing.xxl}px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${up('md')} {
    flex-direction: row;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing.lg}px;
  }
`;

export const Avatar = styled.img<{ theme: Theme }>`
  width: ${({ theme }) => theme.spacing.xxl * 2}px;
  height: ${({ theme }) => theme.spacing.xxl * 2}px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.background.main};

  ${up('md')} {
    width: ${({ theme }) => theme.spacing.xxl * 2.5}px;
    height: ${({ theme }) => theme.spacing.xxl * 2.5}px;
  }
`;

export const UserInfo = styled.div<{ theme: Theme }>`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;

  ${up('md')} {
    text-align: left;
    margin-top: 0;
    flex: 1;
  }
`;

export const UserName = styled.h1<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  ${up('md')} {
    font-size: ${({ theme }) => theme.typography.fontSize.display}px;
  }
`;

export const UserBio = styled.p<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;

  ${up('md')} {
    margin-top: ${({ theme }) => theme.spacing.md}px;
  }
`;

export const Button = styled.button<{
  theme: Theme;
  variant?: 'primary' | 'secondary';
}>`
  padding: ${({ theme }) => `${theme.spacing.sm}px ${theme.spacing.lg}px`};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color 0.2s ease;

  ${({ theme, variant = 'primary' }) =>
    variant === 'primary'
      ? `
        background-color: ${theme.colors.primary.main};
        color: ${theme.colors.primary.contrast};
        &:hover {
          background-color: ${theme.colors.primary.dark};
        }
      `
      : `
        background-color: ${theme.colors.secondary.main};
        color: ${theme.colors.secondary.contrast};
        &:hover {
          background-color: ${theme.colors.secondary.dark};
        }
      `
  }
`;

export const StatsContainer = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;

export const StatsGrid = styled.div<{ theme: Theme }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;

  ${up('sm')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${up('md')} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const StatItem = styled.div<{ theme: Theme }>`
  text-align: center;
`;

export const StatValue = styled.div<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StatLabel = styled.div<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const TabsContainer = styled.div<{ theme: Theme }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-top: ${({ theme }) => theme.spacing.lg}px;
`;

export const TabsList = styled.div<{ theme: Theme }>`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.button<{
  theme: Theme;
  active?: boolean;
}>`
  padding: ${({ theme }) => `${theme.spacing.md}px ${theme.spacing.lg}px`};
  border-bottom: 2px solid ${({ theme, active }) =>
    active ? theme.colors.primary.main : 'transparent'
  };
  color: ${({ theme, active }) =>
    active ? theme.colors.primary.main : theme.colors.text.secondary
  };
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme, active }) =>
      active ? theme.colors.primary.main : theme.colors.text.primary
    };
  }
`;