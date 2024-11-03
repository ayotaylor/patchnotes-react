import React from 'react';
import styled from 'styled-components';
import { Theme } from 'theme/types';
import { GameStatus } from 'types/gameStatus';

interface StatusColors {
  bg: string;
  text: string;
}

export const getStatusColors = (status: GameStatus, theme: Theme): StatusColors => {
  switch (status) {
    case 'playing':
      return {
        bg: theme.colors.status.success,
        text: theme.colors.text.inverse,
      };
    case 'completed':
      return {
        bg: theme.colors.primary.main,
        text: theme.colors.text.inverse,
      };
    case 'backlog':
      return {
        bg: theme.colors.status.warning,
        text: theme.colors.text.inverse,
      };
    case 'abandoned':
      return {
        bg: theme.colors.status.error,
        text: theme.colors.text.inverse,
      };
    default:
      return {
        bg: theme.colors.background.card,
        text: theme.colors.text.primary,
      };
  }
};

const Badge = styled.div<{
  theme: Theme;
  status: GameStatus;
}>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs}px ${theme.spacing.sm}px`};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: ${({ theme, status }) => getStatusColors(status, theme).bg};
  color: ${({ theme, status }) => getStatusColors(status, theme).text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
`;

interface GameStatusBadgeProps {
  status: GameStatus;
  className?: string;
}

export const GameStatusBadge: React.FC<GameStatusBadgeProps> = ({
  status,
  className,
}) => (
  <Badge status={status} className={className}>
    {status}
  </Badge>
);