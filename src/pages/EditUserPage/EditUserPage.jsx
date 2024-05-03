import React, { useState, useEffect } from 'react';
import MainLayout from '@layouts/MainLayout';
import TitleBack from '@components/TitleBack/TitleBack';
import EditUserFields from '@widgets/EditUserFields/EditUserFields';
import { USERS_PAGE } from '@utils/constants/routes.js';
import { useParams, useNavigate } from 'react-router-dom';

import { 
    getUserDivisions, 
    getUserRoles,
    getUserById,
    saveUser
} from '@services/api.js'; 

export default function EditUserPage() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(null);
    const [divisions, setDivisions] = useState([]);
    const [roles, setRoles] = useState([]);

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

    // Получить выбранного пользователя
    const getUserByIdHandle = () =>{
        getUserById(userId)
            .then(res => {
                setCurrentUser(...res);
            })
            .catch(err => {
                alert('Произошла ошибка при получении информации пользователя!');
                console.log(err);
            });
    }

    // Отменить сохранения
    const abortClickHandle = () => {
        let isAbort = window.confirm('Вы действительно хотите отменить все изменения?');
        isAbort && navigate(USERS_PAGE);
    }

    // Сохранить изменения
    const saveUserHandle = (name, email, password, division, role) => {
        saveUser(userId, name, email, password, division, role)
            .then(res => {
                if(res.status){
                    alert('Изменения успешно сохранены!');
                }else{
                    alert('Возникла ошибка при сохранении изменений!');
                    console.log(res);
                }
            })
            .catch(err=> {
                alert('Возникла ошибка при сохранении изменений!');
                console.log(err);
            })
            .finally(() => navigate(USERS_PAGE))
    }

    useEffect(() => {
        getUserDivisionsHandle();
        getUserRolesHandle();
        getUserByIdHandle();
    }, []);
        
    return (
        <MainLayout>
            <TitleBack title="Редактирование пользователя" link={ USERS_PAGE }/>
            <EditUserFields 
                currentUser={currentUser}
                divisions={divisions}
                roles={roles}
                abortClickHandle={abortClickHandle}
                saveUserHandle={saveUserHandle}
            />
        </MainLayout>
    )
}
