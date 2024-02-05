import { createTheme, responsiveFontSizes } from '@mui/material/styles';
declare module '@mui/material/styles' {
  // eslint-disable-next-line spellcheck/spell-checker
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
    /** @deprecated in favor of desktop 1024 */
    desktop_1194: true;
    /** @deprecated in favor of tablet 768 */
    table_834: true;
    tablet_768: true;
    mobile_375: true;
  }
}

export const breakpoints = {
  desktop_1920: 1920,
  desktop_1440: 1440,
  desktop_1280: 1280,
  /** @deprecated in favor of desktop 1024 */
  desktop_1194: 1194,
  desktop_1024: 1024,
  /** @deprecated in favor of tablet 768 */
  table_834: 834,
  tablet_768: 768,
  mobile_375: 375,
};

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
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

export default lightTheme;
