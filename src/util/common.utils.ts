import { darken, getContrastRatio, lighten } from '@mui/system';

export const generateColorVariants = (mainColor: string): IColorSettings => {
  const lightColor = lighten(mainColor, 0.3);
  const darkColor = darken(mainColor, 0.3);

  const contrastText = getContrastRatio(mainColor, '#fff') >= 3 ? '#fff' : '#000';

  return {
    main: mainColor,
    light: lightColor,
    dark: darkColor,
    contrastText: contrastText,
  };
};

export interface IColorSettings {
  dark: string;
  main: string;
  light: string;
  contrastText: string;
}
