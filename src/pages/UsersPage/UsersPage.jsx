import React, { useEffect, useState } from 'react';
import UsersTable from '@widgets/UsersTable/UsersTable';
import MainLayout from '@layouts/MainLayout';
import { 
    getAllUsers, 
    getUserDivisions, 
    getUserRoles,
    createUser
} from '@services/api.js'; 
import UsersToolBar from '@widgets/UsersToolBar/UsersToolBar';
import CreateUserModal from '@widgets/CreateUserModal/CreateUserModal';

export default function UsersPage() {
    const [users, setUsers] = useState(null);
    const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
    
    const [divisions, setDivisions] = useState([]);
    const [roles, setRoles] = useState([]);

    // Получить всех пользователей
    const getAllUsersHandle = () => {
        return getAllUsers()
            .then(res => {
                setUsers(res.sort((a, b) => a.id - b.id));
                return res;
            })
            .catch(err => {
                alert('Ошибка получения пользователей!');
                console.log(err);
            })
    }

    // Получить доступные отделы
    const getUserDivisionsHandle = () =>{
        getUserDivisions()
            .then(res => setDivisions(res))
            .catch(err => {
                alert('Возникла ошибка при получении отделов');
                console.log(err);
            });
    }

    // Получить доступные роли пользователей
    const getUserRolesHandle = () =>{
        getUserRoles()
            .then(res => setRoles(res))
            .catch(err => {
                alert('Возникла ошибка при получении ролей!');
                console.log(err);
            });
    }

    // Создать пользователя
    const createUserHandle = (name, email, password, division, role) => {
        createUser(name, email, password, division, role)
            .then(res => {
                if(res.status){
                    alert('Пользователь успешно создан!');
                    getAllUsersHandle();
                    setIsOpenCreateUserModal(false);
                }else{
                    alert(res.message);
                }
            })
            .catch(err => {
                alert('Возникла ошибка при создании пользователя!');
                console.log(err);
            });
    }

    useEffect(() => {
        getAllUsersHandle();
        getUserDivisionsHandle();
        getUserRolesHandle();
    }, []);
    
    return (
        <MainLayout>
            <UsersToolBar setIsOpenCreateUserModal={setIsOpenCreateUserModal}/>
            <UsersTable 
                data={users}
            />
            <CreateUserModal
                createUserHandle={createUserHandle}
                divisions={divisions}
                roles={roles}
                title="Создать нового пользователя"
                isOpen={isOpenCreateUserModal}
                setIsOpen={setIsOpenCreateUserModal}
            />
        </MainLayout>
    )
}
