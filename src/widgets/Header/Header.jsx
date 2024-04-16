import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import LeftMenu from '@components/LeftMenu/LeftMenu';
import SearchPanel from '@components/SearchPanel/SearchPanel';

import Account from '@components/Account/Account';

export default function Header({ navTitle }) {
  return (
    <AppBar position="fixed" >
      <Container>
        <Toolbar>
          <LeftMenu/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {navTitle}
          </Typography>
          <SearchPanel/>
          <Account/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}