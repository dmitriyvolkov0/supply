import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';
import SignInForm from '@widgets/SignInForm/SignInForm';

import { signIn, getAllUsers, checkUserAuth } from '@services/api.js';
import { REQUESTS_PAGE } from '@utils/constants/routes.js';

export default function AuthPage({ setUser }) {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  
  const onSignIn = (data) => {
    signIn(data).then(res => {
      if(res.status){
        checkUserAuth(res.data.token)
          .then(userData => {
            setUser(userData);
            localStorage.setItem('supplyToken', res.data.token);
            navigate(REQUESTS_PAGE);
          })
          .catch();
      }else{
        alert('Вы неверно ввели данные!');
      }
    })
  }

  useEffect(() => {
    getAllUsers().then(res => setUsers(res));
  }, [])

  return (
    <Container>
        <SignInForm users={users} onSignIn={onSignIn}/>
    </Container>
  )
}
