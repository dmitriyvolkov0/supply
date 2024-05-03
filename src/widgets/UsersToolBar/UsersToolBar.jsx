import React from 'react';
import MainToolbar from '@components/MainToolbar/MainToolbar';
import { Button } from '@mui/material';

export default function UsersToolBar({ setIsOpenCreateUserModal }) {
  return (
    <MainToolbar>
        <Button onClick={() => setIsOpenCreateUserModal(true)} variant='outlined'>Создать пользователя</Button>
    </MainToolbar>
  )
}
