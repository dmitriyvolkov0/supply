import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import LeftMenu from '@components/LeftMenu/LeftMenu';
import SearchPanel from '@components/SearchPanel/SearchPanel';
import Account from '@components/Account/Account';

import { SEARCH_PAGE } from '@utils/constants/routes.js'; 

import { getFullDateByStr } from '@utils/helpers/timeFunctions.js';
import { getUserDivisions } from '@services/api.js';

export default function Header({ navTitle }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [division, setDivision] = useState('');
  const [divisionsList, setDivisionsList] = useState([]);

  const onSubmitSearchForm = (e) =>{
    e.preventDefault();
    const searchQuery = `?s=${searchValue}&startDate=${getFullDateByStr(startDate)}&endDate=${getFullDateByStr(endDate)}&division=${division}`;
    navigate(SEARCH_PAGE + searchQuery);
  }

  const resetSearchFormFilter = () => {
    setSearchValue('');
    setStartDate(null);
    setEndDate(null);
    setDivision('');
  }

  const props = {
    searchValue: searchValue, 
    setSearchValue: setSearchValue,
    onSubmitSearchForm: onSubmitSearchForm,
    startDate: startDate,
    endDate: endDate,
    setStartDate: setStartDate,
    setEndDate: setEndDate,
    resetSearchFormFilter: resetSearchFormFilter,
    division: division,
    setDivision: setDivision,
    divisionsList: divisionsList,
  }

  useEffect(() => {
    getUserDivisions()
      .then(res => setDivisionsList(res))
      .catch(err => alert('Возникла внутренняя ошибка!'));
  }, [])

  return (
    <AppBar position="fixed" >
      <Container>
        <Toolbar>
          <LeftMenu/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {navTitle}
          </Typography>
          <SearchPanel props={props}/>
          <Account/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}