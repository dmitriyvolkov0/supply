import React, { useState } from 'react';
import { Container } from '@mui/material';

import SignInForm from '@widgets/SignInForm/SignInForm';
import SignUpForm from '@widgets/SignUpForm/SignUpForm';

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState(0);

  const onSignIn = (fields) => {
    console.log(fields);
  }

  const onSignUp = (fields) =>{
    console.log(fields);
  }

  return (
    <Container>
      {activeForm === 0?
        <SignInForm setActiveForm={setActiveForm} onSignIn={onSignIn}/> :
        <SignUpForm setActiveForm={setActiveForm} onSignUp={onSignUp}/>
      }
    </Container>
  )
}
