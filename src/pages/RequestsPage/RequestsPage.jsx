import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import RequestsTable from '@components/RequestsTable/RequestsTable';
import { getUserRequests } from '@services/api.js';

export default function RequestsPage({ user }) {
  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);
  
  useEffect(() => {
    let status = 'active';
    getUserRequests(`requests?status=${status}&userId=${user.id}&count=${perPage}`)
      .then(res => setRequests(res));
  }, []);

  return (
    <Container>
      <RequestsTable requests={requests}/>
    </Container>
  )
}
