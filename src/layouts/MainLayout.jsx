import React from 'react';
import { Container } from '@mui/material';

export default function MainLayout({ children }) {
  return (
    <Container sx={{paddingBottom: '80px'}}>
        {children}
    </Container>
  )
}
