import React from 'react';
import MainLayout from '@layouts/MainLayout';

import ProfileHeader from '@widgets/ProfileHeader/ProfileHeader';
import ProfileUserData from '@widgets/ProfileUserData/ProfileUserData';

export default function ProfilePage({ user, setUser }) {
  const firstLetters = user.name.split(' ')[0][0] + user.name.split(' ')[1][0];

  const logout = () => {
    localStorage.removeItem('supplyToken');
    setUser(false);
}
  
  return (
    <MainLayout>
      <ProfileHeader/>
      <ProfileUserData 
        firstLetters={firstLetters}
        user={user} 
        logout={logout}/>
    </MainLayout>
  )
}
