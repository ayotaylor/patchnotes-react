import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from './types';
import { lightTheme, darkTheme } from './theme';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>(
    systemColorScheme === 'dark' ? darkTheme : lightTheme
  );

  useEffect(() => {
    if (systemColorScheme) {
      setThemeState(systemColorScheme === 'dark' ? darkTheme : lightTheme);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setThemeState(current => current.isDark ? lightTheme : darkTheme);
  };

  const setTheme = (mode: 'light' | 'dark') => {
    setThemeState(mode === 'dark' ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};