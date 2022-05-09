import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#1AAB9B',
      dark: '#008E7B',
      light: '#087C6D',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#D5D9E0',
      light: '#7E7E87',
      dark: '#231536',
    },
    background: {
      default: '#F7F8F9',
      paper: '#FFF',
    },
    error: {
      main: '#ae3c4b',
    },
    text: {
      primary: '#434358',
    },
    warning: {
      main: '#CB532D',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Inter',
  },
});

export default mainTheme;
