import React from 'react';
import { Typography  } from '@mui/material';
import s from './style.module.css';

import DateSearch from './DateSearch/DateSearch';
import DivisionSearch from './DivisionSearch/DivisionSearch';
import { Button } from '@mui/material';

export default function AdvancedSearch({ props, advancedSearchWrapperRef }) {
  return (
    <div className={s.wrapper} ref={advancedSearchWrapperRef}>
      <div className={s.block}>
        <Typography className={s.title} variant="p" component="p">Расширенный поиск</Typography>

        <div className={s.inputs}>
          <DateSearch
            startDate={props.startDate} 
            setStartDate={props.setStartDate} 
            endDate={props.endDate}
            setEndDate={props.setEndDate}
          />

          <DivisionSearch
            division={props.division} 
            setDivision={props.setDivision}
            divisionsList={props.divisionsList}
          />

          <Button onClick={props.resetSearchFormFilter} variant="outlined">Сбросить фильр</Button>
          <Button type="sumbit" variant="outlined">Поиск</Button>

        </div>
      </div>
    </div>
  )
}
