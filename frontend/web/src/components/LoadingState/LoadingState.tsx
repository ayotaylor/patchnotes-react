import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Theme } from '../../theme/types';
import { LoadingStateProps } from './types';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div<{ fullscreen: boolean; theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ fullscreen }) => fullscreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  `}
`;

const Spinner = styled.div<{ size: string; theme: Theme }>`
  width: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return theme.spacing.lg;
      case 'lg': return theme.spacing.xxl;
      default: return theme.spacing.xl;
    }
  }}px;
  height: ${({ size, theme }) => {
    switch (size) {
      case 'sm': return theme.spacing.lg;
      case 'lg': return theme.spacing.xxl;
      default: return theme.spacing.xl;
    }
  }}px;
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-top-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md}px;
`;

export const LoadingState: React.FC<LoadingStateProps> = ({
  size = 'md',
  text,
  fullscreen = false,
}) => (
  <Container fullscreen={fullscreen}>
    <Spinner size={size} />
    {text && <LoadingText>{text}</LoadingText>}
  </Container>
);
