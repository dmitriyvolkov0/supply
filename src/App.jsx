import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from '@contexts/User/UserContext';

import {
  AUTH_PAGE,
  REQUESTS_PAGE,
  ARCHIVE_PAGE,
  SEARCH_PAGE
} from './utils/constants/routes.js';

import AuthPage from './pages/AuthPage/AuthPage.jsx';
import RequestsPage from './pages/RequestsPage/RequestsPage.jsx';
import ArchivePage from './pages/ArchivePage/ArchivePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { checkUserAuth } from './services/api.js';

export default function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(()=> {
    let token = localStorage.getItem('supplyToken');
    if(token){
      checkUserAuth(token)
        .then(res =>  res && setUser(res))
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }else{
      setUser(false);
    }  
  }, []);
  
  return (
    <>
      <Router>
        <Routes>
          <Route path={AUTH_PAGE} element={<AuthPage setUser={ setUser }/>}/>
          <Route path={REQUESTS_PAGE} element={
            <PrivateRoute navTitle="Заявки">
              <RequestsPage user={user}/>
            </PrivateRoute>
          }/>
          <Route path={ARCHIVE_PAGE} element={<ArchivePage/>}/>
          <Route path={SEARCH_PAGE} element={<SearchPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}