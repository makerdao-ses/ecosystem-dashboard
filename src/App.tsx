import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { DashboardWrapper } from './stories/containers/dashboard-wrapper/dashboard-wrapper';
import { CUTable } from './stories/containers/cutable/cutable';
import { HOME_ROUTE } from './config/routes';

function App() {
  return (
    <Router>
      <DashboardWrapper>
        <Routes>
          <Route path={HOME_ROUTE} element={<CUTable/>}/>
        </Routes>
      </DashboardWrapper>
    </Router>
  );
}

export default App;
