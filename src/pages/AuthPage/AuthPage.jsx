import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';
import SignInForm from '@widgets/SignInForm/SignInForm';
import SignUpForm from '@widgets/SignUpForm/SignUpForm';

import { signIn, getAllUsers } from '@services/api.js';
import { REQUESTS_PAGE } from '@utils/constants/routes.js';

export default function AuthPage({ setUser }) {
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState(0);
  const [users, setUsers] = useState([]);
  
  const onSignIn = (data) => {
    signIn(data).then(res => {
      if(res.status){
        setUser(res.userData);
        localStorage.setItem('supplyToken', res.userData.token);
        navigate(REQUESTS_PAGE);
      }else{
        alert('Вы неверно ввели данные!');
      }
    })
  }

  const onSignUp = (data) =>{
    console.log(data);
  }

  useEffect(() => {
    getAllUsers().then(res => setUsers(res));
  }, [])

  return (
    <Container>
      {activeForm === 0 ?
        <SignInForm users={users} setActiveForm={setActiveForm} onSignIn={onSignIn}/> :
        <SignUpForm setActiveForm={setActiveForm} onSignUp={onSignUp}/>
      }
    </Container>
  )
}
