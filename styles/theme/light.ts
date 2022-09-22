import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    desktop_1920: true;
    desktop_1440: true;
    desktop_1280: true;
    desktop_1194: true;
    table_834: true;
    table_375: true;
  }
}
const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#1AAB9B',
      },
    },
    breakpoints: {
      values: {
        desktop_1920: 1920,
        desktop_1440: 1440,
        desktop_1280: 1280,
        desktop_1194: 1194,
        table_834: 834,
        table_375: 375,
      },
    },
  })
);

export default lightTheme;
