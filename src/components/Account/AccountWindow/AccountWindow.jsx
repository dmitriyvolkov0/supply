import React from 'react';
import s from './style.module.css';

import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Button, Typography, Tooltip } from '@mui/material';
import { PROFILE_PAGE } from '@utils/constants/routes';
import { useNavigate } from 'react-router-dom';

export default function AccountWindow({user, setUser, accountWindowWrapperRef, firstLetters}) {
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem('supplyToken');
        setUser(false);
    }

    return (
        <div ref={accountWindowWrapperRef} className={s.accountDataWrapper}>
            <div className={s.accountData}>
                <Tooltip title="Ваш отдел">
                    <p className={s.userDivision}>
                        {user.division_name}
                    </p>
                </Tooltip>

                <Avatar sx={{ background: '#ff6600', fontSize: 24, width: 55, height: 55 }}>
                    {firstLetters}
                </Avatar>
                
                <Typography className={s.userName} variant="p" component="p">{user.name}</Typography>
                
                <p className={s.userEmail}>{user.email}</p>
                
                <Tooltip title="Ваша роль" placement="right">
                    <p className={s.userRole}>{user.role_name}</p>
                </Tooltip>

                <div className={s.buttonsWrapper}>
                    <Button onClick={() => navigate(PROFILE_PAGE)} className={s.logoutBut} variant='outlined'>Открыть профиль</Button>
                    <Button onClick={logout} className={s.logoutBut} variant='outlined'>Выйти</Button>
                </div>
            </div>
        </div>
    )
}
