import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, PaletteMode, useMediaQuery } from '@mui/material';
import { getThemeOptions } from '../theme';
import Cookies from 'js-cookie';

interface CustomThemeContextProps {
  mode: PaletteMode | 'system'; // Allow "system" as an option
  toggleTheme: (mode: PaletteMode | 'system') => void;
}

const CustomThemeContext = createContext<CustomThemeContextProps | undefined>(undefined);
export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode | 'system'>(() => {
    const savedMode = Cookies.get('themeMode') as PaletteMode | 'system';
    return savedMode || 'system';
  });
  const toggleTheme = (newMode: PaletteMode | 'system') => {
    setMode(newMode);
  };
  const theme = useMemo(() => {
    console.log('mode is', mode);
    console.log('system prefer is', systemPrefersDark);
    const resolvedMode: PaletteMode =
      mode === 'system' ? (systemPrefersDark ? 'dark' : 'light') : (mode as PaletteMode);
    return createTheme(getThemeOptions(resolvedMode));
  }, [systemPrefersDark, mode]);

  useEffect(() => {
    Cookies.set('themeMode', mode, { expires: 365 });
  }, [mode]);

  return (
    <CustomThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
