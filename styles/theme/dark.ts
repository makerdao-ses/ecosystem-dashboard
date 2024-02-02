import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { breakpoints } from './light';

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
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

export default darkTheme;
