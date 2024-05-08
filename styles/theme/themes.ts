import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { colorPalette } from './colorPalette';
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    desktop_1920: true;
    desktop_1440: true;
    desktop_1280: true;
    desktop_1024: true;
    tablet_768: true;
    mobile_375: true;

    // legacy breakpoints
    desktop_1194: true;
    table_834: true;
  }

  type ColorPalette = {
    isLight: boolean;
    colorPalette: typeof colorPalette;
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends ColorPalette {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends ColorPalette {}
}

export const breakpoints = {
  desktop_1920: 1920,
  desktop_1440: 1440,
  desktop_1280: 1280,
  desktop_1024: 1024,
  tablet_768: 768,
  mobile_375: 375,

  // legacy breakpoints
  desktop_1194: 1194,
  table_834: 834,
};

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      isLight: true,
      colorPalette,
      primary: {
        main: '#1AAB9B',
      },
      background: {
        default: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    breakpoints: {
      values: {
        ...breakpoints,
      },
    },
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: ({ theme, ownerState }) =>
            theme.unstable_sx({
              backgroundColor: '#ECF1F3',
              borderRadius: ownerState.variant === 'rounded' ? '64px' : undefined,
            }),
        },
      },
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      isLight: false,
      colorPalette,
      mode: 'dark',
      primary: {
        main: '#211634',
      },
      background: {
        default: '#000000',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    breakpoints: {
      values: {
        ...breakpoints,
      },
    },
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: ({ theme, ownerState }) =>
            theme.unstable_sx({
              backgroundColor: '#31424E',
              borderRadius: ownerState.variant === 'rounded' ? '64px' : undefined,
            }),
        },
      },
    },
  })
);

export default lightTheme;
