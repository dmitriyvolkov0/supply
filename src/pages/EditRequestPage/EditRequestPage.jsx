import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import RequestFields from '@widgets/RequestFields/RequestFields';
import { getRequestById, getMaterialsByRequestId } from '@services/api.js';
import { serializeFD } from '@utils/helpers/serializeFD.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
  const [materials, setMaterials] = useState([ emptyMaterial ]);

  const submitFormHandle = (e) => {
    e.preventDefault();
  };

  // TODO: доделать вывод фалов и сохранение измененной заявки
  useEffect(() => {
    getMaterialsByRequestId(requestId)
      .then(res => {
        let obj = res.map(item => ({...item, count: item.quantity}));
        setMaterials(obj);
      })
      .catch(err => alert('Возникла внутренняя ошибка!'));
  }, []);

  console.log(materials);

  return (
    <Container>
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
    </Container>
  )
}