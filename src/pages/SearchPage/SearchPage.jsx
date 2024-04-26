import React, {useEffect, useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@layouts/MainLayout';
import RequestsTable from '@widgets/RequestsTable/RequestsTable';
import LazyLoadingBut from '@components/LazyLoadingBut/LazyLoadingBut';
import FilesModal from '@widgets/FilesModal/FilesModal';
import TitleBack from '@components/TitleBack/TitleBack';

import ActionsContext from '@contexts/Actions/ActionsContext';

import { REQUESTS_PAGE } from '@utils/constants/routes.js';
import { getUserRequests } from '@services/api.js';

export default function SearchPage({ user }) {
  const { setActions } = useContext(ActionsContext);

  const [requests, setRequests] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [files, setFiles] = useState(null); //Вложения
  const [isModalFilesOpen, setIsModaFilesOpen] = useState(false);
  
  const location = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [division, setDivision] = useState('');

    const getFilteredRequests = () => {
      getUserRequests(user.id, perPage, 'all', searchValue, startDate, endDate, division)
        .then(res => {
          setRequests(res)
        })
        .catch(err => alert('Возникла ошибка при получении заявок!'));
    }

    // Открыть модальное окно просмотра вложений
    const showFilesModal = (files) => {
      setIsModaFilesOpen(true);
      setFiles(files);
    }

    useEffect(() => {
      let actions = {
        showFilesModal: showFilesModal
      };
      setActions(actions);
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setSearchValue(searchParams.get('s'));
        setStartDate(searchParams.get('startDate'));
        setEndDate(searchParams.get('endDate'));
        setDivision(searchParams.get('division'));
    }, [location]);

    useEffect(() => {
        getFilteredRequests();
    }, [perPage, searchValue, startDate, endDate, division])


  return (
    <MainLayout>
      <TitleBack title="Результаты поиска:" link={ REQUESTS_PAGE }/>
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
    </MainLayout>
  )
}
