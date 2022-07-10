import { css } from '@emotion/css';
import React from 'react';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import BaseAuthenticatedPage from './components/BaseAuthenticatedPage';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { createBrowserHistory } from "history";

export const history = createBrowserHistory()

function App() {
  return (
    <div className={container}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<BaseAuthenticatedPage authPage={<Auth/>} page={<Dashboard/>} />} />
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;

const container = css`
  display: flex;
  flex-direction: column;
`;