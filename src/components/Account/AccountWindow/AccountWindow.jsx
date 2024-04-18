import React from 'react';
import s from './style.module.css';

import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Button, Typography, Tooltip } from '@mui/material';

export default function AccountWindow({user, setUser, accountWindowWrapperRef, firstLetters}) {
    const logout = () => {
        localStorage.removeItem('supplyToken');
        setUser(false);
    }

    return (
        <div ref={accountWindowWrapperRef} className={s.accountDataWrapper}>
            <div className={s.accountData}>
                <p className={s.userDivision}>
                    {user.division_name}
                </p>
                <Avatar sx={{ bgcolor: blue[400], fontSize: 24, width: 55, height: 55 }}>
                    {firstLetters}
                </Avatar>
                <Typography className={s.userName} variant="p" component="p">{user.name}</Typography>
                <p className={s.userEmail}>{user.email}</p>
                <Tooltip title="Ваша роль">
                    <p className={s.userRole}>{user.role_name}</p>
                </Tooltip>

                <Button onClick={logout} className={s.logoutBut} variant='outlined'>Выйти</Button>
            </div>
        </div>
    )
}
