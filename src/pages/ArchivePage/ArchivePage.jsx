import React, { useEffect, useState, useContext } from 'react';
import RequestsTable from '@widgets/RequestsTable/RequestsTable';
import { Container } from '@mui/material';
import LazyLoadingBut from '@components/LazyLoadingBut/LazyLoadingBut';
import FilesModal from '@widgets/FilesModal/FilesModal';
import { getUserRequests } from '@services/api.js';
import ActionsContext from '@contexts/Actions/ActionsContext';

export default function ArchivePage({user}) {
  const { setActions } = useContext(ActionsContext);

  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);

  const [isModalFilesOpen, setIsModaFilesOpen] = useState(false);
  const [files, setFiles] = useState(null); //Вложения

  // Получить все архивные заявки, доступные пользователю
  const getAllRequests = (count) => {
    getUserRequests(user.id, count, 'archive')
      .then(res => setRequests(res));
  }

  // Открыть модальное окно просмотра вложений
  const showFilesModal = (files) => {
    setIsModaFilesOpen(true);
    setFiles(files);
  }

  useEffect(() => {
    getAllRequests(perPage);
    const interval = setInterval(() => {
      getAllRequests(perPage);
    }, 3000);
    return () => clearInterval(interval);
  }, [perPage]);

  useEffect(() => {
    let actions = {
      showFilesModal: showFilesModal
    };
    setActions(actions);
  }, []);

  return (
    <Container>
      <RequestsTable requests={requests}/>

      <LazyLoadingBut
        requests={requests}
        perPage={perPage}
        setPerPage={setPerPage}
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
