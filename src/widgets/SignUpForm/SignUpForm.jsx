import React, { useState, useEffect } from 'react'
import s from './style.module.css';
import { TextField, Typography  } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AboutSupplyText from '@components/AboutSupplyText/AboutSupplyText';

import { Button } from '@mui/material';
import Select from '@components/Select/Select';

import { getUserDivisions, getUserRoles } from '@services/api.js';

export default function SignUpForm({setActiveForm, onSignUp}) {
  const [roles, setRoles] = useState([]);
  const [divisions, setDivisions] = useState([]);
  
  const [fields, setFields] = useState({
    fio: '',
    role: '',
    division: '',
    email: '',
    password: ''
  });

  const onSubmitHandle = (e) =>{
    e.preventDefault();
    onSignUp(fields);
  }

  useEffect(() => {
    getUserRoles()
      .then(res => setRoles(res))
      .catch(err => alert('Возникла внутренняя ошибка!'));
      
    getUserDivisions()
      .then(res => setDivisions(res))
      .catch(err => alert('Возникла внутренняя ошибка!'));
  }, []);

  return (
    <div className={s.formWrapper}>
        <form onSubmit={onSubmitHandle} className={s.form}>
            <LockOpenIcon className={s.icon}/>
            <Typography className={s.title} variant="h5" component="h5">Регистрация</Typography>
            
            <TextField 
              onInput={e => setFields({...fields, fio: e.target.value})} 
              label="Введите ваше ФИО" 
              type="name"
              value={fields.fio}
              required
            />
            
            <Select 
              value={fields.role}
              onChange={e => setFields({...fields, role: e.target.value})}
              label="Роль пользователя" 
              values={roles}
              required
            />

            <Select 
              value={fields.division}
              onChange={e => setFields({...fields, division: e.target.value})}
              label="Рабочий отдел" 
              values={divisions}
              required
            />
            
            <TextField 
              onInput={e => setFields({...fields, email: e.target.value})} 
              label="Введите ваш email" 
              type="email"
              required
            />

            <TextField 
              onInput={e => setFields({...fields, password: e.target.value})} 
              label="Пароль" 
              type="password"
              required
            />
            
            <Button type="submit" variant="contained">Зарегистрироваться</Button>
            <Button onClick={() => setActiveForm(0)}>Войти</Button>

            <AboutSupplyText/>
        </form>
    </div>
  )
}
