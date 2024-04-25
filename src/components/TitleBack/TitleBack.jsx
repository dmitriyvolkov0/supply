import React from 'react';
import s from './style.module.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TitleBack({title, link}) {
    const navigate = useNavigate();
    return (
        <div className={s.titleWrapper}>
            <IconButton onClick={() => navigate(link)}>
                <KeyboardBackspaceIcon/>
            </IconButton>
            <h1 className={s.title}>{title}</h1>
        </div>
    )
}
