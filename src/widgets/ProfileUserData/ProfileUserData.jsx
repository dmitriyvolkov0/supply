import React from 'react';
import s from './style.module.css';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { REQUESTS_PAGE } from '@utils/constants/routes';

export default function ProfileUserData({ user, logout, firstLetters }) {
    const navigate = useNavigate();

    return (
        <div className={s.wrapper}>
            <Avatar className={s.avatar}>
                {firstLetters}
            </Avatar>
            
            <div className={s.dataSection}>
                <div className={s.userBlock}>
                    <div className={s.userMainData}>
                        <h2 className={s.userName + ' ' + s.title}>
                            {user.name}
                        </h2>
                        <p className={s.userEmail}>
                            {user.email}
                        </p>
                    </div>
                    
                    <div className={s.informBlock}>
                        <div className={s.informItem}>
                            <PeopleAltIcon/>
                            <p>Отдел: <span>{user.division_name}</span></p>
                        </div>
                        <div className={s.informItem}>
                            <SensorOccupiedIcon/>
                            <p>Роль: <span>{user.role_name}</span></p>
                        </div>
                    </div>
                </div>

                <div className={s.settingsBlock}>
                    <h2 className={s.title}>Настройки</h2>
                    <FormControlLabel className={s.settingsForm} control={<Checkbox defaultChecked />} label="Присылать уведомления на почту" />
                </div>

                <div className={s.rightBlock}>
                    <Button onClick={() => navigate(REQUESTS_PAGE)} variant='outlined'>К заявкам</Button>
                    <Button onClick={logout} variant='outlined'>Выйти</Button>
                </div>
            </div>
        </div>
    )
}
