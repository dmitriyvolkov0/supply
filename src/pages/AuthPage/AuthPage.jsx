import React, { useState } from 'react';
import { Container } from '@mui/material';

import SignInForm from '@widgets/SignInForm/SignInForm';
import SignUpForm from '@widgets/SignUpForm/SignUpForm';

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState(0);
  return (
    <Container>
      {activeForm === 0?
        <SignInForm setActiveForm={setActiveForm}/> :
        <SignUpForm setActiveForm={setActiveForm}/>
      }
    </Container>
  )
}
