import React from 'react';
import styled from 'styled-components';
import { Theme } from 'theme/types';
import { GameStatus } from 'types/gameStatus';
import { getStatusColors } from './GameStatusBadge';

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
`;

const StatusButton = styled.button<{
  theme: Theme;
  selected: boolean;
  status: GameStatus;
}>`
  padding: ${({ theme }) => `${theme.spacing.sm}px ${theme.spacing.md}px`};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: ${({ theme, selected, status }) =>
    selected ? getStatusColors(status, theme).bg : theme.colors.background.card};
  color: ${({ theme, selected, status }) =>
    selected ? getStatusColors(status, theme).text : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, status }) =>
      getStatusColors(status, theme).bg}40;
  }
`;

interface GameStatusSelectProps {
  value: GameStatus;
  onChange: (status: GameStatus) => void;
  disabled?: boolean;
}

export const GameStatusSelect: React.FC<GameStatusSelectProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const statuses: GameStatus[] = ['playing', 'completed', 'backlog', 'abandoned'];

  return (
    <Container>
      {statuses.map((status) => (
        <StatusButton
          key={status}
          selected={status === value}
          status={status}
          onClick={() => onChange(status)}
          disabled={disabled}
        >
          {status}
        </StatusButton>
      ))}
    </Container>
  );
};