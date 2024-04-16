import React, { useEffect, useState, useRef } from 'react';
import s from './style.module.css';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tooltip } from '@mui/material';

import AdvancedSearch from './AdvancedSearch/AdvancedSearch';

export default function SearchPanel({ props }) {
    const [isOpen, setIsOpen] = useState(false);

    const advancedSearchWrapperRef = useRef(null);

    useEffect( () => {
        document.addEventListener("click", (e) => {
            e.target === advancedSearchWrapperRef.current && setIsOpen(false);
        });
    }, []);
  
  return (
    <form onSubmit={props.onSubmitSearchForm} className={s.searchPanel}>
        <input 
            className={s.searchInput}
            value={props.searchValue}
            onInput={(e) => props.setSearchValue(e.target.value)}
            placeholder="Начните искать..."
        />

        <Tooltip title="Найти">
          <IconButton type="submit" sx={{color: '#fff'}}>
            <SearchIcon sx={{fontSize: 20}}/>
          </IconButton>
        </Tooltip>

        <Tooltip title="Расширенный поиск">
          <IconButton onClick={() => setIsOpen(true)} sx={{color: '#fff'}}>
            <MoreVertIcon sx={{fontSize: 20}}/>
          </IconButton>
        </Tooltip>

        {
          isOpen && 
            <AdvancedSearch 
              props={{...props}}
              advancedSearchWrapperRef={advancedSearchWrapperRef}
            />
        }

    </form>
  )
}
