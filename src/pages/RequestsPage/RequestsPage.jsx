import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionsContext from '@contexts/Actions/ActionsContext';

import { Container } from '@mui/material';
import { 
  getUserRequests, 
  deleteRequestById, 
  setStatus, 
  getMaterialsByRequestId, 
  setBalances,
  getUserByRequestId,
  getWarehouses,
  setWarehouse,
  addHistoryItem
} from '@services/api.js';

import RequestsTable from '@widgets/RequestsTable/RequestsTable';
import RequestsToolBar from '@widgets/RequestsToolBar/RequestsToolBar';

// modals
import IndicateBalancesModal from '@widgets/IndicateBalancesModal/IndicateBalancesModal';
import SetWarehouseModal from '@widgets/SetWarehouseModal/SetWarehouseModal';
import FilesModal from '@widgets/FilesModal/FilesModal';

import { EDIT_REQUEST_PAGE } from '@utils/constants/routes';

export default function RequestsPage({ user }) {
  const { setActions } = useContext(ActionsContext); //контекст с методами изменения состояния заявки
  const navigate = useNavigate();

  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);

  // modals
  const [isModalIndicateBalancesOpen, setIsModalIndicateBalancesOpen] = useState(false); 
  const [isModalSetWarehouseOpen, setIsModalSetWarehouseOpen] = useState(false); 
  const [isModalFilesOpen, setIsModaFilesOpen] = useState(false); 
  
  const [materials, setMaterials] = useState([]); //Массив материалов, для которых будут указываться остатки
  const [warehouses, setWarehouses] = useState([]);

  const [files, setFiles] = useState(null); //Вложения

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
          addHistoryItem(requestId, 13, user.id);
        }else{
          alert('При удалении заявки возникла ошибка!');
        }
      })
      .catch(err => alert('Возникла внутренняя ошибка!'))
    }
  }

  // Изменить заявку
  const editRequest = (requestId) => {
    navigate(EDIT_REQUEST_PAGE + '/' + requestId);
  }

  // Принять в обработку (на складе)
  const handleRequestWarehouse = (requestId) => {
    let isHandle = window.confirm("Принять в обработку?");
    if(isHandle){
      setStatus(requestId, 2)
        .then(res => {
          if(res.status){
            alert('Вы успешно приняли заявку в обработку!');
            addHistoryItem(requestId, 2, user.id);
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
    if(materials.length !== 0) {
      let requestId = materials[0].request_id;

      getUserByRequestId(requestId) // получить пользователя по id заявки
        .then(res => {
          if(res.status){
            const userDivisionId = +res.userData.division_id;
            
            setBalances(materials) //устанавливаем остатки
              .then(res => {
                if(res.status){
                  alert('Остатки успешно указаны!');
                  addHistoryItem(requestId, 3, user.id);
                  setIsModalIndicateBalancesOpen(false);
                }else{
                  alert('Возникла ошибка при указании остатков!');
                }
              })
      
              .then(() => { 
                // Меняем статус. Если пользователь принадлежит отделу "стройка (9) или завод (7), 
                // то передаем в обработку к контролёру (статус заявки 3), иначе отправляем на обработку снабжению (статус 5)"
                if(userDivisionId === 7 || userDivisionId === 9 ){
                  setStatus(requestId, 3)
                    .then(res => !res.status && alert('При изменении статуса заявки возникла ошибка!'))
                    .catch(err => alert('Возникла внутренняя ошибка!'));
                  }else{
                  setStatus(requestId, 5)
                    .then(res => !res.status && alert('При изменении статуса заявки возникла ошибка!'))
                    .catch(err => alert('Возникла внутренняя ошибка!'));
                }
              })
              .catch(err => alert('Возникла внутренняя ошибка!'));
          } 
        });
    }else{
      alert('Информация о материалах не найдена! Пожалуйста сообщите об этом нам. ');
    }
  }

  // Принять в обработку (контролёр)
  const handleRequestControl  = (requestId) => {
    let isHandle = window.confirm("Принять в обработку?");
    if(isHandle){
      setStatus(requestId, 4)
        .then(res => {
          if(res.status){
            alert('Вы успешно приняли заявку в обработку!');
            addHistoryItem(requestId, 4 , user.id);
          }else{
            alert('Во время принятия заявки в обработку произошла ошибка!')
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }
  } 

  // Подтвердить и отправить снабжению
  const confirmAndSendToSnab  = (requestId) => {
    let isHandle = window.confirm("Подтвердить информацию и направить её снабжению?");
    if(isHandle){
      setStatus(requestId, 5)
        .then(res => {
          if(res.status){
            alert('Вы успешно подтвердили информацию! Заявка отправлена на обработку снабжению.');
            addHistoryItem(requestId, 5, user.id);
          }else{
            alert('Во время обработки заявки произошла ошибка!')
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }
  } 

  // Принять в обработку (снабжение)
  const handleRequestSnab = (requestId) =>{
    let isHandle = window.confirm("Принять в обработку?");
    if(isHandle){
      setStatus(requestId, 6)
        .then(res => {
          if(res.status){
            alert('Вы успешно приняли заявку в обработку!');
            addHistoryItem(requestId, 6, user.id);
          }else{
            alert('Во время принятия заявки в обработку произошла ошибка!')
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }
  }

  // Материалы прибыли на склад
  const materialsArrivedWarehouse = (requestId) =>{
    let isHandle = window.confirm("Материалы прибыли на склад?");
    if(isHandle){
      setStatus(requestId, 7)
        .then(res => {
          if(res.status){
            alert('Заявка успешно обработана!');
            addHistoryItem(requestId, 7, user.id);
          }else{
            alert('Во время обработки заявки произошла ошибка!')
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }
  }

  // Получить список складов
  const getWarehousesHandle = () => {
    getWarehouses()
      .then(res => setWarehouses(res))
      .catch(err => alert('Возникла внутренняя ошибка!'));
  }

  // Материалы готовы к выдаче на складе
  const arrivedInWarehouse = (requestId) => {
    getWarehousesHandle();
    setIsModalSetWarehouseOpen([true, requestId]);
  }

  // Указать на какой склад прибыли материалы
  const setWarehouseHandle = (requestId, warehouseId) => {
    setWarehouse(requestId, warehouseId)
      .then(res => {
        if(res.status){
          
          setStatus(requestId, 8)
            .then(res => {
              if(res.status){
                alert('Склад успешно указан!');
                addHistoryItem(requestId, 9, user.id);
              }else{
                alert('Во время обработки заявки произошла ошибка!')
              }
            })
            .catch(err => alert('Возникла внутренняя ошибка!'));
            
        }else{
          alert('Возникла внутренняя ошибка!')
        }
      })
      .catch(err => alert('Возникла внутренняя ошибка!'));
  }

  // Материалы прибыли на объект
  const materialsArrivedObject = (requestId) =>{
    let isHandle = window.confirm("Материалы прибыли на объект?");
    if(isHandle){
      setStatus(requestId, 9)
        .then(res => {
          if(res.status){
            alert('Заявка успешно обработана!');
            addHistoryItem(requestId, 8, user.id);
          }else{
            alert('Во время обработки заявки произошла ошибка!')
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }
  }

  // Материалы выданы / получены
  const materialTransferred = (requestId) =>{
    let isHandle = window.confirm("Материалы выданы?");
    if(isHandle){
      setStatus(requestId, 10)
        .then(res => {
          if(res.status){
            alert('Заявка успешно обработана!');
            addHistoryItem(requestId, 10, user.id);
          }else{
            alert('Во время обработки заявки произошла ошибка!')
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }
  }

  // Переместить в архив
  const inArchive = (requestId) =>{
    let isHandle = window.confirm("Переместить в архив?");
    if(isHandle){
      setStatus(requestId, 11)
        .then(res => {
          if(res.status){
            alert('Заявка успешно перемещена в архив!');
            addHistoryItem(requestId, 11, user.id);
          }else{
            alert('Во время перемещение заявки в архив произошла ошибка!')
          }
        })
        .catch(err => alert('Возникла внутренняя ошибка!'));
    }
  }

  // Открыть модальное окно просмотра вложений
  const showFilesModal = (files) => {
    setIsModaFilesOpen(true);
    setFiles(files);
  }
  
  useEffect(() => {
    let actions = {
      deleteRequest: deleteRequest,
      editRequest: editRequest,
      handleRequestWarehouse: handleRequestWarehouse,
      indicateBalances: indicateBalances,
      handleRequestControl: handleRequestControl,
      handleRequestSnab: handleRequestSnab,
      confirmAndSendToSnab: confirmAndSendToSnab,
      materialsArrivedWarehouse: materialsArrivedWarehouse,
      materialsArrivedObject: materialsArrivedObject,
      arrivedInWarehouse: arrivedInWarehouse,
      materialTransferred: materialTransferred,
      inArchive: inArchive,
      showFilesModal: showFilesModal
    };
    
    setActions(actions);
  }, []);

  useEffect(() => {
    getAllRequests(perPage);
    const interval = setInterval(() => {
      getAllRequests(perPage);
    }, 3000);
    return () => clearInterval(interval);
  }, [perPage]);

  return (
    <Container>
      <RequestsToolBar getAllRequests={() => getAllRequests(perPage)}/>
      <RequestsTable requests={requests}/>
      <IndicateBalancesModal
        title="Укажите остатки материалов"
        materials={materials}
        setMaterials={setMaterials}
        setBalancesHandle={setBalancesHandle}
        isOpen={isModalIndicateBalancesOpen}
        setIsOpen={setIsModalIndicateBalancesOpen}
      />
      <SetWarehouseModal
        title="На какой склад прибыли материалы?"
        warehouses={warehouses}
        setWarehouseHandle={setWarehouseHandle}
        isOpen={isModalSetWarehouseOpen}
        setIsOpen={setIsModalSetWarehouseOpen}
      />
      <FilesModal
        title="Вложения"
        files={files}
        isOpen={isModalFilesOpen}
        setIsOpen={setIsModaFilesOpen}
      />
    </Container>
  )
}
