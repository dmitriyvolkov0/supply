import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  AUTH_PAGE,
  REQUESTS_PAGE,
  ARCHIVE_PAGE,
  SEARCH_PAGE} from './utils/constants/routes.js';

import AuthPage from './pages/AuthPage/AuthPage';
import RequestsPage from './pages/RequestsPage/RequestsPage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import SearchPage from './pages/SearchPage/SearchPage';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={AUTH_PAGE} element={<AuthPage/>}/>
          <Route path={REQUESTS_PAGE} element={<RequestsPage/>}/>
          <Route path={ARCHIVE_PAGE} element={<ArchivePage/>}/>
          <Route path={SEARCH_PAGE} element={<SearchPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}