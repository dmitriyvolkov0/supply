import React from 'react';
import { Button } from '@mui/material';
import { CREATE_REQUEST_PAGE } from '@utils/constants/routes';
import { useNavigate } from 'react-router-dom';
import RefreshBut from '@components/RefreshBut/RefreshBut';
import s from './style.module.css';

export default function RequestsToolBar({ getAllRequests }) {
    const navigate = useNavigate();
    return (
        <div class={s.wrapper}>
            <Button onClick={() => navigate(CREATE_REQUEST_PAGE)} variant="outlined">Создать заявку</Button>
            <RefreshBut 
                onClick={getAllRequests}
                color="primary"    
            />
        </div>
    )
}
