import React from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { DashboardWrapper } from './stories/containers/dashboard-wrapper/dashboard-wrapper';
import { CUTable } from './stories/containers/cutable/cutable';
import { HOME_ROUTE } from './config/routes';

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <DashboardWrapper>
          <Routes>
            <Route path={HOME_ROUTE} element={<CUTable />} />
          </Routes>
        </DashboardWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
