import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserContextProvider from './contexts/User/UserContextProvider';
import ActionsContextProvider from './contexts/Actions/ActionsContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ActionsContextProvider>
        <App />
      </ActionsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

