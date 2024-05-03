import React from 'react';
import MainToolbar from '@components/MainToolbar/MainToolbar';
import { Button } from '@mui/material';

export default function UsersToolBar() {
  return (
    <MainToolbar>
        <Button variant='outlined'>Создать пользователя</Button>
    </MainToolbar>
  )
}
