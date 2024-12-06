// import React, { useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
// You can keep the CSS import if needed
import './App.css';
// import { darkTheme, lightTheme } from './styles/theme';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext'

function App() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const currentTheme = isDarkMode ? darkTheme : lightTheme;
  return (
    <CustomThemeProvider>
      <AppRoutes />
    </CustomThemeProvider>
  )
}

export default App;