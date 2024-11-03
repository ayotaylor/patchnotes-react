import React from 'react';
import styled, { css } from 'styled-components';
import { Theme } from 'theme/types';
import { FilterButtonProps } from 'types/filterButtonProps';

const StyledButton = styled.button<{
  theme: Theme;
  active: boolean;
  size: string;
  variant: string;
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${({ theme, size }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.xs}px ${theme.spacing.md}px;
          font-size: ${theme.typography.fontSize.sm}px;
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.md}px ${theme.spacing.xl}px;
          font-size: ${theme.typography.fontSize.lg}px;
        `;
      default:
        return css`
          padding: ${theme.spacing.sm}px ${theme.spacing.lg}px;
          font-size: ${theme.typography.fontSize.md}px;
        `;
    }
  }}

  ${({ theme, variant, active }) => {
    switch (variant) {
      case 'outlined':
        return css`
          border: 2px solid ${active ? theme.colors.primary.main : theme.colors.border.main};
          background: transparent;
          color: ${active ? theme.colors.primary.main : theme.colors.text.secondary};
          &:hover:not(:disabled) {
            border-color: ${theme.colors.primary.main};
            color: ${theme.colors.primary.main};
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${active ? theme.colors.primary.main : theme.colors.text.secondary};
          &:hover:not(:disabled) {
            background: ${theme.colors.background.card};
          }
        `;
      default:
        return css`
          background: ${active ? theme.colors.primary.main : theme.colors.background.card};
          color: ${active ? theme.colors.primary.contrast : theme.colors.text.secondary};
          &:hover:not(:disabled) {
            background: ${active ? theme.colors.primary.dark : theme.colors.background.paper};
          }
        `;
    }
  }}
`;

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  children,
  active = false,
  icon,
  onPress,
  onClick,
  disabled = false,
  size = 'md',
  variant = 'filled',
}) => {
  const handleClick = onClick || onPress;

  return (
    <StyledButton
      onClick={handleClick}
      active={active}
      disabled={disabled}
      size={size}
      variant={variant}
    >
      {icon}
      {children || label}
    </StyledButton>
  );
};
