import React, { useEffect, useState } from 'react';
import RequestsTable from '@widgets/RequestsTable/RequestsTable';
import { Container } from '@mui/material';
import LazyLoadingBut from '@components/LazyLoadingBut/LazyLoadingBut';

import { getUserRequests } from '@services/api.js';

export default function ArchivePage({user}) {
  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);

  // Получить все архивные заявки, доступные пользователю
  const getAllRequests = (count) => {
    getUserRequests(user.id, count, 'archive')
      .then(res => setRequests(res));
  }

  useEffect(() => {
    getAllRequests(perPage);
    const interval = setInterval(() => {
      getAllRequests(perPage);
    }, 3000);
    return () => clearInterval(interval);
  }, [perPage]);

  return (
    <Container>
      <RequestsTable requests={requests}/>
      <LazyLoadingBut
        requests={requests}
        perPage={perPage}
        setPerPage={setPerPage}/>
    </Container>
  )
}
