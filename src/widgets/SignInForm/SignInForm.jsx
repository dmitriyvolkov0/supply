import React from 'react'
import s from './style.module.css';
import { TextField, Typography  } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AboutSupplyText from '@components/AboutSupplyText/AboutSupplyText';

import { Button } from '@mui/material';

export default function SignInForm({ setActiveForm }) {
  return (
    <div className={s.formWrapper}>
        <form className={s.form}>
            <LockOpenIcon className={s.icon}/>
            <Typography className={s.title} variant="h5" component="h5">Вход</Typography>
            <TextField label="email" type="email"/>
            <TextField label="Пароль" type="password"/>
            <Button type="submit" variant="contained">Войти</Button>
            <Button onClick={() => setActiveForm(1)}>Зарегистрироваться</Button>
            <AboutSupplyText/>
        </form>
    </div>
  )
}
