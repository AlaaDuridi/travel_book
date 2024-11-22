import {createTheme, PaletteMode, Shadows} from '@mui/material';
import {AlertProps} from '@mui/material';
import {ThemeOptions} from '@mui/material/styles';

type OwnerState = Pick<AlertProps, 'severity'>;
declare module '@mui/material/styles' {
    interface TypeBackground {
        default: string;
        paper: string;
    }

    interface Palette {
        bright: Palette['primary'];
    }

    interface PaletteOptions {
        bright: PaletteOptions['primary'];

    }
}
import {
    red as muiRed,
    green as muiGreen,
    yellow as muiYellow,
} from '@mui/material/colors';
import {generateColorVariants, IColorSettings} from "../util/common.utils.ts";


// Shadows
const defaultShadows = createTheme().shadows;
const customShadows: Shadows = [...defaultShadows];
customShadows[1] = '0 4px 16px rgba(0, 0, 0, 0.2)';

// Get Theme Options
export const getThemeOptions = (mode: PaletteMode): ThemeOptions => {
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
   

    const background = {
        light: '#FFFFFF',
        dark: '#1A202C',
    };

    const primaryColor = "#827a9f";
    // const primaryColor = "#eeaf02";
    const secondaryColor = "#436d93";
    // const secondaryColor = "#05787b";
    const primaryVariants = generateColorVariants(primaryColor) as IColorSettings;
    const secondaryVariants = generateColorVariants(secondaryColor) as IColorSettings;

    return {
        palette: {
            mode,
            contrastThreshold: 2,
            primary: primaryVariants,
            secondary: secondaryVariants,
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
            grey: {
                50: '#FAFAFA',
                100: '#F5F5F5',
                200: '#EEEEEE',
                300: '#E0E0E0',
                400: '#BDBDBD',
                500: '#9E9E9E',
            },
            background: {
                default: isDark ? background.dark : background.light,
                paper: isDark ? '#2D3748' : '#F7FAFC',
            },
            text: {
                primary: isDark ? '#FFFFFF' : '#1A202C',
                secondary: isDark ? '#A0AEC0' : '#718096',
            },
            bright: {
                main: '#ffffff',
                light: '#ffffff',
                dark: '#ffffff',
                contrastText: '#000000',
            },
            divider: '#E9EAF2',
        },
        typography: {
            fontFamily: '"Inter", "sans-serif"',
            h1: {fontSize: '3rem', fontWeight: 600},
            h2: {fontSize: '2.25rem', fontWeight: 600},
            h3: {fontSize: '1.875rem'},
            body1: {fontSize: '1rem'},
            body2: {fontSize: '0.875rem'},
            h6: {
                fontSize: '1rem',
            },
            h5: {
                fontSize: '1.3rem',
            },
            h4: {
                fontSize: '1.7rem',
                marginBottom: '1.5rem',
            },
            allVariants: {
                textTransform: 'none',
            },
        },
        components: {
            MuiAlert: {
                styleOverrides: {
                    root: ({ownerState}: { ownerState: OwnerState }) => ({
                        backgroundColor: ALERT_BACKGROUND[ownerState.severity as keyof typeof ALERT_BACKGROUND],
                        color: ALERT_COLOR[ownerState.severity as keyof typeof ALERT_COLOR],
                    }),
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
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: '18px',
                    },
                },
            },
        },
    };
};

export const theme = (mode: PaletteMode) => createTheme(getThemeOptions(mode));
