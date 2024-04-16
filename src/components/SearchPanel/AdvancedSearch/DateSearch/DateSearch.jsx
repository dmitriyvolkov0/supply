import React from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import s from './style.module.css';

import { Typography  } from '@mui/material';

export default function DateSearch({ startDate, endDate, setStartDate, setEndDate}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Typography className={s.title} variant="p" component="p">Поиск по дате:</Typography>
            <div className={s.wrapper}>
                <DatePicker 
                  format="DD/MM/YY"
                  value={startDate && startDate}
                  onChange={(e) => setStartDate(dayjs(e.$d))}
                />
                <p className='mx-[5px]'>—</p>
                <DatePicker 
                  format="DD/MM/YY"
                  value={endDate && endDate}
                  onChange={(e) => setEndDate(dayjs(e.$d))}
                />
            </div>
        </div>
    </LocalizationProvider>
  )
}
