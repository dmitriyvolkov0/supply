import React from 'react';
import s from './style.module.css';
import SummarizeIcon from '@mui/icons-material/Summarize';

export default function EmptyTable({title="Здесь пока нет записей"}) {
  return (
    <div className={s.wrapper}>
        <SummarizeIcon className={s.icon}/>
        <p className={s.title}>{title}</p>
    </div>
  )
}
