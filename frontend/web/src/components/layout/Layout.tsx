// components/Layout/Layout.tsx

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MainContent } from "@/styles/sharedStyles";
import {
  LayoutContainer,
  HeaderContainer,
  Header,
  Logo,
  Nav,
  NavLink,
  UserMenu,
  Avatar,
  ContentContainer,
} from "./styles";

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (to: string, state?: any) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to, { state });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <LayoutContainer>
      <HeaderContainer>
        <Header>
          <Logo to="/dashboard">PatchNotes</Logo>

          {user && (
            <Nav>
              <NavLink to="/dashboard" onClick={handleNavigate("/dashboard")}>
                Home
              </NavLink>
              <NavLink
                to={`/users/${user.username}`}
                onClick={handleNavigate(`/users/${user.username}`, { user })}
              >
                Profile
              </NavLink>
              <NavLink to={`/games`} onClick={handleNavigate("/games")}>
                Games
              </NavLink>
              <NavLink to={`/users/${user.id}/collection`}>Collection</NavLink>
              <NavLink to={`/users/${user.id}/lists`}>Lists</NavLink>
              <NavLink to={`/users/${user.id}/wishlist`}>Wishlist</NavLink>

              <UserMenu>
                <Avatar
                  src={user.pfp || "/api/placeholder/32/32"}
                  alt={user.username}
                />
                <NavLink
                  to={`/users/${user.username}`}
                  onClick={handleNavigate(`/users/${user.username}`, {
                    user,
                  })}
                >
                  {user.username}
                </NavLink>
                <NavLink to="/login" onClick={handleLogout}>
                  Logout
                </NavLink>
              </UserMenu>
            </Nav>
          )}
        </Header>
      </HeaderContainer>

      <ContentContainer>
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentContainer>
    </LayoutContainer>
  );
};

// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import {
//   LayoutContainer,
//   Header,
//   Logo,
//   Nav,
//   NavLink,
//   UserMenu,
//   Avatar,
//   MainContent,
//   HeaderContainer,
//   ContentContainer,
// } from "./styles";

// export const Layout: React.FC = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <LayoutContainer>
//       <HeaderContainer>
//         <Header>
//           <Logo to="/dashboard">PatchNotes</Logo>

//           {user && (
//             <Nav>
//               <NavLink to="/dashboard">Home</NavLink>
//               <NavLink to={`/users/${user.username}`} state={{ user }}>
//                 Profile
//               </NavLink>
//               <NavLink to={`/users/games`}>Games</NavLink>
//               <NavLink to={`/users/${user.id}/collection`}>Collection</NavLink>
//               <NavLink to={`/users/${user.id}/lists`}>Lists</NavLink>
//               <NavLink to={`/users/${user.id}/wishlist`}>Wishlist</NavLink>

//               <UserMenu>
//                 <Avatar
//                   src={user.pfp || "/api/placeholder/32/32"}
//                   alt={user.username}
//                 />
//                 <NavLink to={`/users/${user.id}/profile`}>{user.username}</NavLink>
//                 <NavLink to="/login" onClick={handleLogout}>
//                   Logout
//                 </NavLink>
//               </UserMenu>
//             </Nav>
//           )}
//         </Header>
//       </HeaderContainer>

//       <ContentContainer>
//         <MainContent>
//           <Outlet />
//         </MainContent>
//       </ContentContainer>
//     </LayoutContainer>
//   );
// };
