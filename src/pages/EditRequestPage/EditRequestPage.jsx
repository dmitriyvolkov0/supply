import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import RequestFields from '@widgets/RequestFields/RequestFields';
import { getRequestById, getMaterialsByRequestId } from '@services/api.js';
import { serializeFD } from '@utils/helpers/serializeFD.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { REQUESTS_PAGE } from '@utils/constants/routes.js';
import RequestSkeleton from '@widgets/RequestSkeleton/RequestSkeleton.jsx';

export default function EditRequestPage({ user }) {
  const navigate = useNavigate();
  let { requestId } = useParams();
  
  let emptyMaterial = {
    name: 'Название материала', 
    count: 1,
    unit: 'шт',
    note: '',
    link: '',
    files: []
  };

  // Наименование объекта
  const [objectName, setObjectName] = useState('');

  // Вложенные материалы
  const [materials, setMaterials] = useState(null);

  // Получить наименование объекта
  const getObjectName = () =>{
    getRequestById(requestId)
    .then(res => {
      if(res.status){
        setObjectName(res.data.text);
      }else{
        alert('Возникла ошибка при получении данных заявки!');
      }
    })
    .catch(err => {
      alert('Возникла внутренняя ошибка! Возможно такой заявки не существует!')
      navigate(REQUESTS_PAGE);
    });
  }

  // Получить материалы текущей заявки
  const getMaterials = () =>{
    getMaterialsByRequestId(requestId)
      .then(res => {
        let obj = res.map(item => ({...item, count: item.quantity}));
        setMaterials(obj);
      })
      .catch(err => alert('Возникла внутренняя ошибка!'));
  }

  // Сохранить изменения
  const submitFormHandle = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getObjectName();
    getMaterials();
  }, []);

  return (
    <Container>
      {
        materials ?
          <form onSubmit={submitFormHandle}>
            <RequestFields
              objectName={objectName} 
              setObjectName={setObjectName}
              materials={materials} 
              setMaterials={setMaterials}
              title="Редактирование бланка заявки на стройматериалы"
              emptyMaterial={emptyMaterial}
              sendFormButTitle="Сохранить изменения"
            />
          </form>
          :
          <RequestSkeleton/>
      }
    </Container>
  )
}