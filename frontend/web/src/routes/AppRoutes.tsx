import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Dashboard } from "../components/dashboard/Dashboard";
// import { GameDetails } from '../components/games/GameDetails';
// import { UserProfile } from '../components/user/UserProfile';
// import { GameCollection } from '../components/games/GameCollection';
// import { Wishlist } from '../components/games/Wishlist';
// import { Lists } from '../components/lists/Lists';
// import { ListDetails } from '../components/lists/ListDetails';
import { PrivateRoute } from "../components/routing/PrivateRoute";
import { PublicRoute } from "../components/routing/PublicRoute";
import { Layout } from "../components/layout/Layout";
import { UserProfile } from "@/components/profile/UserProfile";
import GamesPage from "@/components/games/GamesPage";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/games" element={<GamesPage />} />
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/users/:username"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/games/:gameId"
            element={
              <PrivateRoute>
                <GameDetails />
              </PrivateRoute>
            }
          /> */
          /*
          <Route
            path="/users/:userId/collection"
            element={
              <PrivateRoute>
                <GameCollection />
              </PrivateRoute>
            }
          />

          <Route
            path="/users/:userId/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />

          <Route
            path="/users/:userId/lists"
            element={
              <PrivateRoute>
                <Lists />
              </PrivateRoute>
            }
          />

          <Route
            path="/lists/:listId"
            element={
              <PrivateRoute>
                <ListDetails />
              </PrivateRoute>
            }
          /> */}

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
