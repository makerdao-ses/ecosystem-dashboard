import { createTheme, styled } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import WrapperMain from './components/WrapperMain';

const theme = createTheme();

function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <WrapperMain open={open} setOpen={setOpen} />
      </Router>
    </ThemeProvider>
  );
}
const drawerWidth = 259;
const Main = styled('main', {
  shouldForwardProp: (prop: string) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Home: () => JSX.Element = () => {
  return (
    <header className="App-header">
      MakerDao SES Dashboard
      <ul></ul>
    </header>
  );
};

export default App;
