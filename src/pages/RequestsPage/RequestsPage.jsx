import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionsContext from '@contexts/Actions/ActionsContext';

import { Container } from '@mui/material';
import RequestsTable from '@components/RequestsTable/RequestsTable';
import { getUserRequests, deleteRequestById } from '@services/api.js';

export default function RequestsPage({ user }) {
  const { setActions } = useContext(ActionsContext); //контекст с методами изменения состояния заявки
  const navigate = useNavigate();

  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);
  
  // Получить все заявки, доступные пользователю
  const getAllRequests = (count) => {
    getUserRequests(user.id, count, 'active')
      .then(res => setRequests(res));
  }

    // Удалить заявку
    const deleteRequest = (requestId) => {
      let isDelete = window.confirm("Вы уверены, что хотите удалить данную заявку?");
      if(isDelete){
        deleteRequestById(requestId)
        .then(res => {
          if(res.status){
            alert('Заявка успешно удалена!');
          }else{
            alert('При удалении заявки возникла ошибка!');
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'))
      }
    }

    // Изменить заявку
    const editRequest = (requestId) => {
      console.log('Изменить');
    }

    // Принять в обработку (на складе)
    const handleRequestWarehouse = (requestId) => {
      let isHandle = window.confirm("Принять в обработку?");
      if(isHandle){
        console.log('Принято в обработку складом');
      }
    }

    // Указать остатки на складе
    const indicateBalances = (requestId) => {
      console.log('Указаны остатки');
    }

  useEffect(() => {
    let actions = {
      deleteRequest: deleteRequest,
      editRequest: editRequest,
      handleRequestWarehouse: handleRequestWarehouse,
      indicateBalances: indicateBalances,
      handleRequestSnab: 'handleRequestSnab',
      handleRequestControlBut: 'handleRequestControlBut',
      materialsArrivedWarehouse: 'materialsArrivedWarehouse',
      materialsArrivedObject: 'materialsArrivedObject',
      arrivedInWarehouse: 'arrivedInWarehouse',
      materialTransferred: 'materialTransferred',
      inArchive: 'inArchive'
    };
    
    setActions(actions);
    getAllRequests(perPage);
  }, []);

  return (
    <Container>
      <RequestsTable requests={requests}/>
    </Container>
  )
}
