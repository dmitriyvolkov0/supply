import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Select from '@components/Select/Select';


export default function EditUserFields({ currentUser, divisions, roles, abortClickHandle, saveUserHandle }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [division, setDivision] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        currentUser && setName(currentUser.name);
        currentUser && setEmail(currentUser.email);
        currentUser && setPassword(currentUser.password);
        currentUser && setDivision(currentUser.division_id);
        currentUser && setRole(currentUser.role_id);
    }, [currentUser]);

    const onSaveClick = () =>{
        saveUserHandle(name, email, password, division, role);
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <TextField 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                label="ФИО пользователя"
            />
            
            <TextField 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                label="Email"
            />
            
            <TextField 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                label="Пароль"
                type="password"
            />
            
            <Select 
                value={division} 
                values={divisions}
                onChange={e => setDivision(e.target.value)}
            />
            
            <Select 
                value={role} 
                values={roles}
                onChange={e => setRole(e.target.value)}
            />

            <Box sx={{display: 'flex', gap: '10px'}}>
                <Button 
                    onClick={onSaveClick}
                    variant='contained'
                >
                    Сохранить изменения
                </Button>

                <Button 
                    onClick={abortClickHandle}
                    variant='contained' 
                    color="secondary"
                >
                    Отмена
                </Button>
            </Box>
        </Box>
    )
}
