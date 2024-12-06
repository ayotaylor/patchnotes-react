import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutContainer,
  Header,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  UserMenu,
  Avatar,
  MainContent,
} from "./styles";

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo to="/dashboard">GameTracker</Logo>

          {user && (
            <Nav>
              <NavLink to="/dashboard">Home</NavLink>
              <NavLink to={`/users/${user.id}/collection`}>Collection</NavLink>
              <NavLink to={`/users/${user.id}/lists`}>Lists</NavLink>
              <NavLink to={`/users/${user.id}/wishlist`}>Wishlist</NavLink>

              <UserMenu>
                <Avatar
                  src={user.avatarUrl || "/api/placeholder/32/32"}
                  alt={user.username}
                />
                <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
                <NavLink to="#" onClick={handleLogout}>
                  Logout
                </NavLink>
              </UserMenu>
            </Nav>
          )}
        </HeaderContent>
      </Header>

      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
