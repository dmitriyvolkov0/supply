import React from 'react';
import s from './style.module.css';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tooltip } from '@mui/material';

export default function SearchPanel() {
  return (
    <form className={s.searchPanel}>
        <input 
            className={s.searchInput}
            placeholder="Начните искать..."
        />

        <Tooltip title="Найти">
          <IconButton type="submit" sx={{color: '#fff'}}>
            <SearchIcon sx={{fontSize: 20}}/>
          </IconButton>
        </Tooltip>

        <Tooltip title="Расширенный поиск">
          <IconButton sx={{color: '#fff'}}>
            <MoreVertIcon sx={{fontSize: 20}}/>
          </IconButton>
        </Tooltip>

    </form>
  )
}
