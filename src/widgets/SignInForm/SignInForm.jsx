import React, { useState } from 'react'
import s from './style.module.css';
import { TextField, Typography  } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AboutSupplyText from '@components/AboutSupplyText/AboutSupplyText';

import { Button } from '@mui/material';

export default function SignInForm({ setActiveForm, onSignIn }) {
  const [fields, setFields] = useState({
    email: '',
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

            <TextField 
              onInput={e => setFields({...fields, email: e.target.value})} 
              label="Введите ваш email" 
              type="email"
              required/>
              
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
