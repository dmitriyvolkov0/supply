import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionsContext from '@contexts/Actions/ActionsContext';

import { Container } from '@mui/material';
import { 
  getUserRequests, 
  deleteRequestById, 
  setStatus, 
  getMaterialsByRequestId, 
  setBalances 
} from '@services/api.js';

import RequestsTable from '@components/RequestsTable/RequestsTable';
import IndicateBalancesModal from '@widgets/IndicateBalancesModal/IndicateBalancesModal';

export default function RequestsPage({ user }) {
  const { setActions } = useContext(ActionsContext); //контекст с методами изменения состояния заявки
  const navigate = useNavigate();

  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);

  // modals
  const [isModalIndicateBalancesOpen, setIsModalIndicateBalancesOpen] = useState(false); 
  
  const [materials, setMaterials] = useState([]); //Массив материалов, для которых будут указываться остатки

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
        setStatus(requestId, 2)
          .then(res => {
            if(res.status){
              alert('Вы успешно приняли заявку в обработку!');
            }else{
              alert('Во время принятия заявки в обработку произошла ошибка!');
            }
          })
          .catch(err => alert('Возникла внутренняя ошибка!'));
      }
    }

      // Получить список материалов, принадлежащих выбранной заявке для установки остатков
    const getMaterials = (requestId) => {
      getMaterialsByRequestId(requestId)
        .then(res => {
          setMaterials(res);
        }).catch(err => alert('Возникла внутренняя ошибка!'));
    }

    // Указать остатки материалов на складе (открыть модальное окно)
    const indicateBalances = (requestId) => {
      setIsModalIndicateBalancesOpen(true);
      getMaterials(requestId);
    }

    // Установить указанные остатки материалов в бд
    const setBalancesHandle = (materials) => {
      let requestId = materials[0].request_id;

      setBalances(materials)
        .then(res => {
          if(res.status){
            alert('Остатки успешно указаны!');
            setIsModalIndicateBalancesOpen(false);
          }else{
            alert('Возникла ошибка при указании остатков!');
          }
        })

        .then(() => {
          setStatus(requestId, 3)
            .then(res => {
              if(!res.status){

              }
            })
            .catch(err => alert('Возникла внутренняя ошибка!'));
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
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
      <IndicateBalancesModal
        title="Укажите остатки материалов"
        materials={materials}
        setMaterials={setMaterials}
        setBalancesHandle={setBalancesHandle}
        isOpen={isModalIndicateBalancesOpen}
        setIsOpen={setIsModalIndicateBalancesOpen}
      />
    </Container>
  )
}
