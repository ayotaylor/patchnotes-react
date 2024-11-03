import styled from 'styled-components';
import { Theme } from '../../../theme/types';
import { up } from '../../../utils/responsive/responsive';
export const GridContainer = styled.div<{ theme: Theme }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px 0;

  ${up('sm')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${up('md')} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${up('lg')} {
    grid-template-columns: repeat(5, 1fr);
  }

  ${up('xl')} {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const FilterSection = styled.div<{ theme: Theme }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const GameCard = styled.div<{ theme: Theme }>`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.card};
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const GameImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

export const GameOverlay = styled.div<{ theme: Theme }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md}px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0)
  );
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${GameCard}:hover & {
    opacity: 1;
  }
`;

export const GameTitle = styled.h3<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const GameMeta = styled.div<{ theme: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
`;