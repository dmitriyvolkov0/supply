import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContextProvider from './contexts/User/UserContextProvider';
import ActionsContextProvider from './contexts/Actions/ActionsContextProvider';
import {ThemeProvider} from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#f98130',
      main: '#ff6600',
      dark: '#cb5303',
      contrastText: '#fff',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <ActionsContextProvider>
          <App />
        </ActionsContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

