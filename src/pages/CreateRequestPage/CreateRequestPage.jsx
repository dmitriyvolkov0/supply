import React, { useState } from 'react';
import { Container } from '@mui/material';
import RequestFields from '@widgets/RequestFields/RequestFields';
import { createRequest } from '@services/api.js';
import { serializeFD } from '@utils/helpers/serializeFD.js';
import { useNavigate } from 'react-router-dom';

export default function CreateRequestPage({ user }) {
  let emptyMaterial = {
    name: 'Название материала', 
    count: 1,
    unit: 'шт',
    note: '',
    link: '',
    files: []
  };

  const navigate = useNavigate();

  // Наименование объекта
  const [objectName, setObjectName] = useState('');

  // Вложенные материалы
  const [materials, setMaterials] = useState([ emptyMaterial ]);

  const submitFormHandle = (e) => {
    e.preventDefault();

    const fd = serializeFD({objectName: objectName, userId: user.id, materials: materials});
    createRequest(fd)
      .then(res => {
        if(res.createRequest.status){
          alert('Заявка успешно создана!');
          navigate('/');
        }else{ alert('Возникла ошибка при создании заявки!'); }
      })
      .catch(err => alert('Возникла внутренняя ошибка!'));
  };

  return (
    <Container>
      <form onSubmit={submitFormHandle}>
        <RequestFields
          objectName={objectName} 
          setObjectName={setObjectName}
          materials={materials} 
          setMaterials={setMaterials}
          title="Создание бланка заявки на стройматериалы"
          emptyMaterial={emptyMaterial}
        />
      </form>
    </Container>
  )
}