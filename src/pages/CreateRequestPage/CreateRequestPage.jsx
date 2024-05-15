import React, { useState } from 'react';
import MainLayout from '@layouts/MainLayout';

import RequestFields from '@widgets/RequestFields/RequestFields';
import { createRequest, addHistoryItem, sendMailToUser } from '@services/api.js';
import { serializeFD } from '@utils/helpers/serializeFD.js';
import { useNavigate } from 'react-router-dom';
import { REQUESTS_PAGE } from '@utils/constants/routes.js';

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
          addHistoryItem(res.createRequest.requestId, 1, user.id); //Добавляем историю в бд

          //Отправляем сообщение на почту кладовщикам (divisionId 5 - кладовщики)
          sendMailToUser(null, 5, 'Создана новая заявка! Обработайте её.');
            
          navigate(REQUESTS_PAGE);
        }else{ alert('Возникла ошибка при создании заявки!'); }
      })
      .catch(err => alert('Возникла внутренняя ошибка!'));
  };

  return (
    <MainLayout>
      <form onSubmit={submitFormHandle}>
        <RequestFields
          objectName={objectName} 
          setObjectName={setObjectName}
          materials={materials} 
          setMaterials={setMaterials}
          title="Создание бланка заявки на стройматериалы"
          emptyMaterial={emptyMaterial}
          sendFormButTitle="Создать заявку"
        />
      </form>
    </MainLayout>
  )
}