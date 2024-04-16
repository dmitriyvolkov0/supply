import React from 'react';
import { Container } from '@mui/material';
import RequestsTable from '@components/RequestsTable/RequestsTable';
import { getUserRequests } from '@services/api.js';

export default function RequestsPage() {
  getUserRequests()
    .then(res => console.log(res));
    
  return (
    <Container>
      <RequestsTable/>
    </Container>
  )
}
