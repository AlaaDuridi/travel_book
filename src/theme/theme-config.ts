import {createTheme, PaletteMode, Shadows} from '@mui/material';
import {AlertProps} from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        toast: {
            success: string;
            error: string;
            info: string;
            warning: string;
        };
    }

    interface PaletteOptions {
        toast?: {
            success: string;
            error: string;
            info: string;
            warning: string;
        };
    }
}
type OwnerState = Pick<AlertProps, 'severity'>;

import {
    indigo as muiIndigo,
    red as muiRed,
    green as muiGreen,
    yellow as muiYellow,
    grey as muiGrey,
    blueGrey as muiBlueGrey,
} from '@mui/material/colors';


// Shadows
const defaultShadows = createTheme().shadows;
const customShadows: Shadows = [...defaultShadows];
customShadows[1] = '0 4px 16px rgba(0, 0, 0, 0.2)';

// Get Theme Options
export const getThemeOptions = (mode: PaletteMode) => {
    console.log('theme mode withing the theme config is', mode)
    const isDark = mode === 'dark';

    type SEVERITY_STATES = 'success' | 'info' | 'warning' | 'error' | 'secondary' | 'primary' | 'dark';

    const ALERT_BACKGROUND: Record<SEVERITY_STATES, string> = {
        success: isDark ? "#2b4c4f" : "#dff9ec",
        primary: isDark ? "#30405f" : "#e5edfc",
        warning: isDark ? "#4a4544" : "#fff2e1",
        error: isDark ? "#4a3848" : "#ffe5e5",
        secondary: isDark ? "#323e52" : "#e7ebef",
        info: isDark ? "#224a5c" : "#d6f7fa",
        dark: isDark ? "#4a5262" : "#e2e4e6"
    };

    const ALERT_COLOR: Record<SEVERITY_STATES, string> = {
        success: isDark ? "#39da8a" : "#39da8a",
        primary: isDark ? "#5a8dee" : "#5a8dee",
        warning: isDark ? "#fdac41" : "#fdac41",
        error: isDark ? "#ff5b5c" : "#ff5b5c",
        secondary: isDark ? "#69809a" : "#69809a",
        info: isDark ? "#00cfdd" : "#00cfdd",
        dark: isDark ? "#fff" : "#495563"
    };
    return {
        palette: {
            mode,
            primary: {
                light: muiIndigo[200],
                main: muiIndigo[500],
                dark: muiIndigo[800],
                contrastText: '#fff',
            },
            secondary: {
                light: muiBlueGrey[200],
                main: muiBlueGrey[500],
                dark: muiBlueGrey[800],
                contrastText: '#fff',
            },
            error: {
                light: muiRed[200],
                main: muiRed[500],
                dark: muiRed[800],
            },
            warning: {
                light: muiYellow[200],
                main: muiYellow[500],
                dark: muiYellow[800],
            },
            success: {
                light: muiGreen[200],
                main: muiGreen[500],
                dark: muiGreen[800],
            },
            grey: muiGrey,
            background: {
                default: isDark ? muiGrey[900] : '#fff',
                paper: isDark ? muiGrey[800] : muiGrey[50],
            },
            text: {
                primary: isDark ? '#fff' : muiGrey[900],
                secondary: isDark ? muiGrey[500] : muiGrey[700],
            },
            toast: {
                success: ALERT_COLOR['success'],
                error: ALERT_COLOR['error'],
                info: ALERT_COLOR['info'],
                warning: ALERT_COLOR['warning'],
                primary: ALERT_COLOR['primary'],
                secondary: ALERT_COLOR['secondary'],
                dark: ALERT_COLOR['dark'],
            },
        },
        typography: {
            fontFamily: '"Inter", "sans-serif"',
            h1: {fontSize: '3rem', fontWeight: 600},
            h2: {fontSize: '2.25rem', fontWeight: 600},
            h3: {fontSize: '1.875rem'},
            body1: {fontSize: '1rem'},
            body2: {fontSize: '0.875rem'},
        },
        shape: {
            borderRadius: 10,
        },
        shadows: customShadows,
        components: {
            MuiAlert: {
                styleOverrides: {
                    root: ({ownerState}: { ownerState: OwnerState }) => ({
                        backgroundColor: ALERT_BACKGROUND[ownerState.severity as SEVERITY_STATES],
                        color: ALERT_COLOR[ownerState.severity as SEVERITY_STATES],
                    }),
                },
            },

        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
                    borderRadius: '18px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '18px',
                    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '24px',
                    paddingBlock: '.9rem',
                    paddingInline: '1.5rem',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {},
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '18px',
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: '4px',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: ``,
        },
    };
};

export const theme = (mode: PaletteMode) => createTheme(getThemeOptions(mode));
