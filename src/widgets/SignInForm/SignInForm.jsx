import React, { useState } from 'react'
import s from './style.module.css';

import { Button } from '@mui/material';
import { TextField, Typography  } from '@mui/material';
import Select from '@components/Select/Select';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AboutSupplyText from '@components/AboutSupplyText/AboutSupplyText';

export default function SignInForm({ users, setActiveForm, onSignIn }) {
  const [fields, setFields] = useState({
    userId: '',
    password: ''
  });

  const onSubmitHandle = (e) =>{
    e.preventDefault();
    onSignIn(fields);
  }
  
  return (
    <div className={s.formWrapper}>
        <form onSubmit={onSubmitHandle} className={s.form}>
            <LockOpenIcon className={s.icon}/>
            <Typography className={s.title} variant="h5" component="h5">Вход</Typography>

            <Select
              value={fields.userId}
              onChange={e => setFields({...fields, userId: +e.target.value})}
              label="Выберите пользователя" 
              values={users}
              required
            />
              
            <TextField 
              onInput={e => setFields({...fields, password: e.target.value})} 
              label="Пароль" 
              type="password"
              required
            />
            
            <Button type="submit" variant="contained">Войти</Button>
            <Button onClick={() => setActiveForm(1)}>Зарегистрироваться</Button>
            <AboutSupplyText/>
        </form>
    </div>
  )
}
