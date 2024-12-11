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

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.default};
  text-decoration: none;

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

// import styled from "styled-components";
// import { Link } from "react-router-dom";

// export const LayoutContainer = styled.div`
//   width: 100vw;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   background-color: ${({ theme }) => theme.colors.background.default};
//   margin: 0;
//   padding: 0;
// `;

// export const HeaderContainer = styled.div`
//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.surface.default};
//   border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
// `;

// export const Header = styled.header`
//   max-width: 1200px;
//   width: 100%;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
//   background-color: ${({ theme }) => theme.colors.surface.default};
//   border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
// `;

// export const HeaderContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// export const Logo = styled(Link)`
//   font-size: ${({ theme }) => theme.typography.fontSize.xl};
//   font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
//   color: ${({ theme }) => theme.colors.primary};
// `;

// export const Nav = styled.nav`
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing.md};
// `;

// export const NavLink = styled(Link)`
//   color: ${({ theme }) => theme.colors.text.secondary};
//   font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
//   transition: color ${({ theme }) => theme.transitions.default};

//   &:hover {
//     color: ${({ theme }) => theme.colors.text.primary};
//   }
// `;

// export const UserMenu = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing.sm};
// `;

// export const Avatar = styled.img`
//   width: 32px;
//   height: 32px;
//   border-radius: ${({ theme }) => theme.borderRadius.full};
//   object-fit: cover;
// `;

// export const ContentContainer = styled.div`
//   width: 100%;
//   flex: 1;
//   background-color: ${({ theme }) => theme.colors.background.default};
// `;

// export const MainContent = styled.main`
//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.surface.default};
//   border-radius: ${({ theme }) => theme.borderRadius.lg};
//   box-shadow: ${({ theme }) => theme.shadows.md};
//   padding: ${({ theme }) => theme.spacing.xl};
// `;
