import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from '@contexts/User/UserContext';

import {
  AUTH_PAGE,
  REQUESTS_PAGE,
  CREATE_REQUEST_PAGE,
  EDIT_REQUEST_SINGLE_PAGE,
  ARCHIVE_PAGE,
  SEARCH_PAGE,
  HISTORY_SINGLE_PAGE,
  PROFILE_PAGE,
  USERS_PAGE,
  USERS_SINGLE_PAGE
} from './utils/constants/routes.js';

import AuthPage from './pages/AuthPage/AuthPage.jsx';
import RequestsPage from './pages/RequestsPage/RequestsPage.jsx';
import CreateRequestPage from './pages/CreateRequestPage/CreateRequestPage.jsx';
import EditRequestPage from './pages/EditRequestPage/EditRequestPage.jsx';
import ArchivePage from './pages/ArchivePage/ArchivePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import HistoryPage from './pages/HistoryPage/HistoryPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import UsersPage from './pages/UsersPage/UsersPage.jsx';
import EditUserPage from './pages/EditUserPage/EditUserPage.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { checkUserAuth } from './services/api.js';

export default function App() {
  const { user, setUser } = useContext(UserContext);

  const updateUserData = () => {
    let token = localStorage.getItem('supplyToken');
    if(token){
      checkUserAuth(token)
        .then(res =>  res && setUser(res))
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }else{
      setUser(false);
    }  
  }

  useEffect(()=> {
    updateUserData();
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

          <Route path={CREATE_REQUEST_PAGE} element={
            <PrivateRoute navTitle="Создать заявку">
              <CreateRequestPage user={user}/>
            </PrivateRoute>
          }/>

          <Route path={EDIT_REQUEST_SINGLE_PAGE} element={
            <PrivateRoute navTitle="Редактировать заявку">
              <EditRequestPage user={user}/>
            </PrivateRoute>
          }/>

          <Route path={HISTORY_SINGLE_PAGE} element={
            <PrivateRoute navTitle="История">
              <HistoryPage/>
            </PrivateRoute>
          }/>

          <Route path={ARCHIVE_PAGE} element={
            <PrivateRoute navTitle="Архив">
              <ArchivePage user={user}/>
            </PrivateRoute>
          }/>

          <Route path={SEARCH_PAGE} element={
            <PrivateRoute navTitle="Поиск">
              <SearchPage user={user}/>
            </PrivateRoute>
          }/>

          <Route path={PROFILE_PAGE} element={
            <PrivateRoute navTitle="Мой профиль">
              <ProfilePage 
                user={user} 
                setUser={setUser}
                updateUserData={updateUserData}  
              />
            </PrivateRoute>
          }/>

          <Route path={USERS_PAGE} element={
            <PrivateRoute navTitle="Управление пользователями">
              <UsersPage/>
            </PrivateRoute>
          }/>

          <Route path={USERS_SINGLE_PAGE} element={
            <PrivateRoute navTitle="Редактирование пользователя">
              <EditUserPage/>
            </PrivateRoute>
          }/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}