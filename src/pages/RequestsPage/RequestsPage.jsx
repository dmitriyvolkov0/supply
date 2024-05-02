import React, { useEffect, useState } from 'react';
import MainLayout from '@layouts/MainLayout';
import Actions from '@layouts/Actions';

import { getUserRequests } from '@services/api.js';

import RequestsTable from '@widgets/RequestsTable/RequestsTable';
import RequestsToolBar from '@widgets/RequestsToolBar/RequestsToolBar';

import LazyLoadingBut from '@components/LazyLoadingBut/LazyLoadingBut';

export default function RequestsPage({ user }) {
  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);

  // Получить все заявки, доступные пользователю
  const getAllRequests = (count) => {
    getUserRequests(user.id, count, 'active')
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
    <MainLayout>
      <Actions user={user}>
        <RequestsToolBar getAllRequests={() => getAllRequests(perPage)}/>
        <RequestsTable requests={requests}/>
        <LazyLoadingBut
          requests={requests}
          perPage={perPage}
          setPerPage={setPerPage}/>
      </Actions>
    </MainLayout>
  )
}
