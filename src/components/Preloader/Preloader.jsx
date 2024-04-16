import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import s from './style.module.css';

export default function Preloader() {
  return (
    <div className={s.preloaderWrapper}>
        <CircularProgress/>
        <p className={s.preloaderText}>Загрузка...</p>
    </div>
  )
}
