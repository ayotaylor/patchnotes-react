import React, { useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
// You can keep the CSS import if needed
import './App.css';
import { darkTheme, lightTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={currentTheme}>
      <AppRoutes />;
    </ThemeProvider>
  )
}

export default App;