import { createTheme, responsiveFontSizes } from '@mui/material/styles';

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
  })
);

export default darkTheme;
