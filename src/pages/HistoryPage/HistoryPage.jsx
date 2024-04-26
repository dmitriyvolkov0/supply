import React, { useEffect, useState } from 'react';
import MainLayout from '@layouts/MainLayout';
import HistoryTable from '@widgets/HistoryTable/HistoryTable';
import { useParams } from 'react-router-dom';
import TitleBack from '@components/TitleBack/TitleBack';
import RefreshBut from '@components/RefreshBut/RefreshBut';
import Box from '@mui/material/Box';

import { getHistoryByRequestId } from '@services/api.js';

export default function HistoryPage() {
  const { requestId } = useParams();
  const [history, setHistory] = useState(null);
  
  const getHistoryByRequestIdHandle = () => {
    getHistoryByRequestId(requestId)
      .then(res => {
        if(res.status){
          setHistory(res.data);
        }else{
          setHistory([]);
          alert('При получении истории заявки возникла ошибка!');
        }
      })
      .catch((err) => alert('Возникла внутренняя ошибка!'));
  }

  useEffect(() => {
    getHistoryByRequestIdHandle();
  }, [])
  
  return (
    <MainLayout>
      <Box sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
        <TitleBack title={"Заявка №" + requestId} link={-1}/>
        <RefreshBut onClick={getHistoryByRequestIdHandle} size={32}/>
      </Box>
      <HistoryTable history={history}/>
    </MainLayout>
  )
}
