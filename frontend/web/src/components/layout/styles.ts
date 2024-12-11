// components/Layout/styles.ts

import styled from "styled-components";
import { Link } from "react-router-dom";
import { ContentContainer, media } from "@/styles/sharedStyles";

export const LayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.default};
  margin: 0;
  padding: 0;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const Header = styled.header`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface.default};

  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  ${media.mobile} {
    display: none; // Consider implementing a mobile menu
  }
`;

interface NavLinkProps {
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

export const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.default};
  text-decoration: none;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: ${({ theme }) => theme.spacing.md};
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  object-fit: cover;
`;

export { ContentContainer };
