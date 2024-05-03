import React, { useState } from 'react';
import Modal from '@components/Modal/Modal';
import { Box, TextField, Button } from '@mui/material';
import Select from '@components/Select/Select';

export default function CreateUserModal({ createUserHandle, divisions, roles, title, isOpen, setIsOpen }) {
    const buttons = () => {
        return <>
            <Button onClick={() => setIsOpen(false)}>Отмена</Button>
            <Button type="submit">Создать пользователя</Button>
        </>
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [division, setDivision] = useState('');
    const [role, setRole] = useState('');

    const onSubmitForm = () => createUserHandle(name, email, password, division, role);
    
    return (
        <Modal 
            title={title} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
            buttons={buttons()}
            onSubmitForm={onSubmitForm}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <TextField 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    label='ФИО пользователя'
                    required
                />

                <TextField 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    label='Email'
                    required
                />

                <TextField 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" 
                    label='Пароль'
                    required
                />

                <Select
                    value={division}
                    values={divisions}
                    onChange={e => setDivision(e.target.value)}
                    label="Выберите отдел" 
                    required
                />

                <Select
                    value={role}
                    values={roles}
                    onChange={e => setRole(e.target.value)}
                    label="Выберите роль" 
                    required
                />
            </Box>
        </Modal>
    )
}
