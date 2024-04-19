import React, { useState } from 'react';
import { Container } from '@mui/material';
import RequestFields from '@widgets/RequestFields/RequestFields';
import { createRequest } from '@services/api.js';

export default function CreateRequestPage() {
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

  const submitFormHandle = (e) =>{
    e.preventDefault();
    createRequest(objectName, materials)
      .then(res => console.log(res))
      .catch(err => alert('Возникла ошибка!'));
  }
    

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
