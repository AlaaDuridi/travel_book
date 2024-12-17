import { FC, useState, MouseEvent, ReactNode } from 'react';
import { useCustomTheme } from '../../contexts/ThemeContext.tsx';
import {
  PaletteMode,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Fade,
} from '@mui/material';
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material';

interface ThemeOption {
  text: string;
  icon: ReactNode;
}

const ThemeToggleMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { mode, toggleTheme } = useCustomTheme();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('clicked');
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleThemeChange = (theme: string) => {
    toggleTheme(theme as PaletteMode | 'system');
    handleMenuClose();
  };

  const themeOptions: ThemeOption[] = [
    { text: 'Choose your preferred theme mode', icon: null },
    { text: 'light', icon: <LightMode /> },
    { text: 'dark', icon: <DarkMode /> },
    { text: 'system', icon: <SettingsBrightness /> },
  ];

  const currentThemeIcon = {
    light: <LightMode />,
    dark: <DarkMode />,
    system: <SettingsBrightness />,
  }[mode];

  return (
    <Box textAlign='right' pr={2}>
      <IconButton
        id='theme-toggle-button'
        edge='end'
        color='inherit'
        onClick={handleMenuOpen}
        aria-controls='theme-toggle-menu'
        aria-haspopup='true'
      >
        {currentThemeIcon}
      </IconButton>

      <Menu
        id='theme-toggle-menu'
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        MenuListProps={{
          'aria-labelledby': 'theme-toggle-button',
          role: 'listbox',
        }}
      >
        {themeOptions.map((themeItem, index) => (
          <MenuItem
            key={themeItem.text}
            disabled={index === 0}
            selected={mode === themeItem.text}
            onClick={() => handleThemeChange(themeItem.text)}
          >
            {themeItem.icon && <ListItemIcon>{themeItem.icon}</ListItemIcon>}
            <ListItemText primary={themeItem.text} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ThemeToggleMenu;
