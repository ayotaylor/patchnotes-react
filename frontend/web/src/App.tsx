import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // You'll need to create this component
import GameDetails from "pages/game/GameDetails";
import { ThemeProvider } from "shared/components/ThemeContext";
import { GameCacheProvider } from "shared/components/GameCacheContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GameCacheProvider>
        <Router>
          <Routes>
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </GameCacheProvider>
    </ThemeProvider>
  );
};

export default App;
