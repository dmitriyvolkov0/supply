import React from 'react';
import SelectInput from '@components/Select/Select';
import s from './style.module.css';
import { Typography  } from '@mui/material';

export default function DivisionSearch({ division, setDivision, divisionsList }) {
  return (
    <div>
        <Typography className={s.title} variant="p" component="p">Отдел, от которого поступила заявка:</Typography>
        <SelectInput 
            label="Выберите отдел"
            value={division && division}  
            values={divisionsList}  
            onChange={(e) => setDivision(e.target.value)}
        />
    </div>
  )
}
