import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#211634',
      },
    },
  })
);

export default darkTheme;
