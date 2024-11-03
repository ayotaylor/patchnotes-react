import styled, { css, keyframes } from 'styled-components';
import { Theme } from '../../theme/types';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const ReviewCard = styled.div<{ theme: Theme; animate?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  ${({ animate }) => animate && css`
    animation: ${slideIn} 0.3s ease-out forwards;
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.border.light};
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const GameInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const GameCover = styled.img`
  width: 60px;
  height: 90px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

export const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Rating = styled.div<{ rating: number }>`
  margin-left: auto;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme, rating }) =>
    rating >= 8 ? theme.colors.status.success :
    rating >= 6 ? theme.colors.status.warning :
    theme.colors.status.error
  };
  color: ${({ theme }) => theme.colors.text.inverse};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const ReviewContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg}px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const ReviewFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.background.paper};
`;

export const InteractionButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary.main : theme.colors.text.secondary
  };
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;