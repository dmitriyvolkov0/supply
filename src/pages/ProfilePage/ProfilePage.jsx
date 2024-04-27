import React from 'react';
import MainLayout from '@layouts/MainLayout';

import ProfileHeader from '@widgets/ProfileHeader/ProfileHeader';
import ProfileUserData from '@widgets/ProfileUserData/ProfileUserData';

import { changeEmailNotificationsStatus } from '@services/api.js';

export default function ProfilePage({ user, setUser, updateUserData }) {
  const firstLetters = user.name.split(' ')[0][0] + user.name.split(' ')[1][0];

  const logout = () => {
    localStorage.removeItem('supplyToken');
    setUser(false);
  }

  const changeEmailNotificationsStatusHandle = (status) =>{
    status = status ? 1 : 0;
    changeEmailNotificationsStatus(user.id, status)
    .then(res => {
        if(res.status){
          updateUserData();
        }
      })
      .catch(err => alert('Произошла ошибка при смене статуса!'));
  }

  return (
    <MainLayout>
      <ProfileHeader/>
      <ProfileUserData 
        firstLetters={firstLetters}
        user={user} 
        logout={logout}
        changeEmailNotificationsStatusHandle={changeEmailNotificationsStatusHandle}  
      />
    </MainLayout>
  )
}
