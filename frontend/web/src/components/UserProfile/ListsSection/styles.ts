import styled, { css, keyframes } from 'styled-components';
import { Theme } from '../../../theme/types';
import { up } from '../../../utils/responsive/responsive';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ListsContainer = styled.div<{ theme: Theme }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px 0;
  animation: ${fadeIn} 0.3s ease-out;

  ${up('md')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ListCard = styled.div<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.border.light};
  }
`;

export const ListHeader = styled.div<{ theme: Theme }>`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ListTitle = styled.h3<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const ListDescription = styled.p<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const GamePreviewGrid = styled.div<{ theme: Theme }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const GamePreview = styled.div<{ theme: Theme }>`
  aspect-ratio: 2/3;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  overflow: hidden;
  position: relative;
`;

export const GamePreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ListMeta = styled.div<{ theme: Theme }>`
  padding: ${({ theme }) => theme.spacing.md}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
`;