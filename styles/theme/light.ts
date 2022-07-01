import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#1AAB9B',
      },
    },
  })
);

export default lightTheme;
