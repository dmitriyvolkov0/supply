import React from 'react'
import s from './style.module.css';
import { TextField, Typography  } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AboutSupplyText from '@components/AboutSupplyText/AboutSupplyText';

import {Button} from '@mui/material';

export default function SignUpForm({setActiveForm}) {
  return (
    <div className={s.formWrapper}>
        <form className={s.form}>
            <LockOpenIcon className={s.icon}/>
            <Typography className={s.title} variant="h5" component="h5">Регистрация</Typography>
            <TextField label="email" type="email"/>
            <TextField label="Пароль" type="password"/>
            <Button type="submit" variant="contained">Зарегистрироваться</Button>
            <Button onClick={() => setActiveForm(0)}>Войти</Button>
            <AboutSupplyText/>
        </form>
    </div>
  )
}
