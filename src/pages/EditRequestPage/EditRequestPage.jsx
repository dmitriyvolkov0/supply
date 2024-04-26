import React, { useState, useEffect } from 'react';
import MainLayout from '@layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import RequestFields from '@widgets/RequestFields/RequestFields';
import RequestSkeleton from '@widgets/RequestSkeleton/RequestSkeleton.jsx';

import { getRequestById, getMaterialsByRequestId, getFilesByMaterialId, saveRequest, addHistoryItem } from '@services/api.js';
import { serializeFD } from '@utils/helpers/serializeFD.js';
import { REQUESTS_PAGE } from '@utils/constants/routes.js';
import { b64toBlob } from '@utils/helpers/base64ToBlob.js';

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
  const getObjectNameHandle = () =>{
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
  const getMaterialsByRequestIdHandle = () =>{
    return getMaterialsByRequestId(requestId)
      .then(res => {
        let obj = res.map(item => ({...item, count: item.quantity}));
        setMaterials(obj);
        return obj;
      })
      .catch(err => {
        alert('Возникла внутренняя ошибка!');
        navigate(REQUESTS_PAGE);
      });
  }

  // Получить файлы
  const getFilesHandle = ( materials) => {
    materials.forEach(item => {
      let materialId = item.id;

      getFilesByMaterialId(materialId)
        .then(data => {
          let currentMaterialIndex = materials.findIndex(item => +item.id === +materialId);
  
          let newMaterials = materials;
          newMaterials[currentMaterialIndex].files = [];
          newMaterials = [...materials];
          
          data && data.forEach(file => {
            if(file){
              const blob = b64toBlob(file.content, file.type);// Создание Blob из base64 содержимого файла
              const fileObject = new File([blob], file.name, { type: file.type });
  
              newMaterials[currentMaterialIndex].files.push(fileObject);
              setMaterials(newMaterials);
            }
          });
      });
    })
  }

  // Сохранить изменения
  const submitFormHandle = (e) => {
    e.preventDefault();
    const requestFormData = serializeFD({requestId: requestId, objectName: objectName, materials: materials});

    saveRequest(requestFormData)
      .then(res => {
        if(res.status){
          alert('Изменения успешно сохранены!');
          addHistoryItem(requestId, 12, user.id);
        }else{
          alert('Во время сохранения изменений произошла ошибка!');
        }
      })
      .catch(err => alert('Возникла внутренняя ошибка!'))
      .finally(() => navigate(REQUESTS_PAGE));
  };

  useEffect(() => {
    getObjectNameHandle();
    getMaterialsByRequestIdHandle()
    .then(res=> {
      res && getFilesHandle(res);
    })
  }, []);

  return (
    <MainLayout>
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
              disableAddFileBut={true}
            />
          </form>
          :
          <RequestSkeleton/>
      }
    </MainLayout>
  )
}