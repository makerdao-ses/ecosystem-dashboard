import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import { EXAMPLE2_ROUTE, EXAMPLE_ROUTE, HOME_ROUTE } from './config/routes';
import { Page } from './stories/pages/page/Page';
import { Counter } from './stories/containers/counter/counter';

function App() {
  return (
        <div className="App">
            <Router>
                <ul style={{ listStyle: 'none' }}>
                    <li><Link to={HOME_ROUTE}>Home Page</Link></li>
                    <li><Link to={EXAMPLE_ROUTE}>Example Page</Link></li>
                    <li><Link to={EXAMPLE2_ROUTE}>Example with redux, material and formik</Link></li>
                </ul>
                <Routes>
                    <Route path={HOME_ROUTE} element={<Home/>}/>
                    <Route path={EXAMPLE_ROUTE} element={<Page/>}/>
                    <Route path={EXAMPLE2_ROUTE} element={<Counter/>}/>
                </Routes>
            </Router>
        </div>
  );
}

const Home: () => JSX.Element = () => {
  return <header className="App-header">
        MakerDao SES Dashboard
        <ul>
        </ul>
    </header>;
};

export default App;
