import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#211634',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
  })
);

export default darkTheme;
