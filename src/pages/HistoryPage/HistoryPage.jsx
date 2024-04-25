import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import HistoryTable from '@widgets/HistoryTable/HistoryTable';
import { useParams } from 'react-router-dom';
import TitleBack from '@components/TitleBack/TitleBack';
import { REQUESTS_PAGE } from '@utils/constants/routes.js';
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
    <Container>
      <Box sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
        <TitleBack title={"Заявка №" + requestId} link={REQUESTS_PAGE}/>
        <RefreshBut onClick={getHistoryByRequestIdHandle} size={32}/>
      </Box>
      <HistoryTable history={history}/>
    </Container>
  )
}
