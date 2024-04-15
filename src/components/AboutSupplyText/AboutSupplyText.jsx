import React from 'react';
import { Typography  } from '@mui/material';
import s from './style.module.css';

export default function AboutSupplyText() {
  return (
    <Typography className={s.text} variant="p" component="p">Supply — сервис для работы с заявками</Typography>
  )
}
