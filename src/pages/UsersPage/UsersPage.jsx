import React, { useEffect, useState } from 'react';
import UsersTable from '@widgets/UsersTable/UsersTable';
import MainLayout from '@layouts/MainLayout';
import { getAllUsers } from '@services/api.js'; 

export default function UsersPage() {
    const [users, setUsers] = useState(null);

    const getUsers = () => {
        getAllUsers()
            .then(res => setUsers(res.sort((a, b) => a.id - b.id)))
            .catch(err => {
                alert('Ошибка получения пользователей!');
                console.log(err);
            })
    }

    useEffect(() => {
        getUsers();
    }, [])
    
    return (
        <MainLayout>
            <UsersTable data={users}/>
        </MainLayout>
    )
}
