import React from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton, Tooltip } from '@mui/material';
import s from './style.module.css';

export default function RefreshBut({ onClick, title="Обновить информацию" }) {
    const [isRotateBut, setIsRotateBut] = React.useState(false);
    const refreshClickHandle = () => {
        onClick && onClick();
        setIsRotateBut(true);
        setTimeout(() => setIsRotateBut(false), 1000);
    }
  return (
    <Tooltip title={title}>
        <IconButton 
            className={isRotateBut ? s.refreshButActive : ' '}
            onClick={refreshClickHandle} 
            color="primary" variant="outlined">
                <CachedIcon/>
        </IconButton>
    </Tooltip>
  )
}
