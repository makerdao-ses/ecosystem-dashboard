import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import { CuTable } from './stories/containers/cu-table/cu-table';
import { HOME_ROUTE, ABOUT_ROUTE } from './config/routes';
import CuAbout from './stories/pages/page/cu-about/cu-about';
import { HeaderWrapper } from './stories/containers/dashboard-wrapper/header-wrapper';

function App() {
  return (
    <Router>
      <HeaderWrapper>
        <Routes>
          <Route path={HOME_ROUTE} element={<CuTable/>}/>
          <Route path={ABOUT_ROUTE} element={<CuAbout />} />
        </Routes>
      </HeaderWrapper>
    </Router>
  );
}

export default App;
