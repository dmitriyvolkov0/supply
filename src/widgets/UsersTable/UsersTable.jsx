import * as React from 'react';
import s from './style.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Preloader from '@components/Preloader/Preloader';
import EmptyTable from '@components/EmptyTable/EmptyTable';

import { useNavigate } from 'react-router-dom';
import { USERS_PAGE } from '@utils/constants/routes.js';
import PasswordShowHide from '@components/PasswordShowHide/PasswordShowHide';
import Tools from './Tools/Tools';

import { getFullDateByStrFromDb } from '@utils/helpers/timeFunctions.js';

export default function HistoryTable({ data, blockUnblockProfileHandle }) {
    const navigate = useNavigate();
    const editClickHandle = (id) => navigate(USERS_PAGE + "/" + id);

    return (
        <>
            { data === null && <Preloader/> }
            { data && data.length === 0 && <EmptyTable title="Пользователи не найдены!"/> }
            { data && data.length > 0 && 
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>id</TableCell>
                                <TableCell>ФИО</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Пароль</TableCell>
                                <TableCell>Роль</TableCell>
                                <TableCell>Отдел</TableCell>
                                <TableCell>Создан</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((item, index) => 
                                    <TableRow key={'users-'+index} className={s.itemRow}>
                                        <TableCell>
                                            <div className={s.itemTools}>
                                                <Tools 
                                                    item={item} 
                                                    editClickHandle={editClickHandle}
                                                    blockUnblockProfileHandle={blockUnblockProfileHandle}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            <PasswordShowHide value={item.password}/>
                                        </TableCell>
                                        <TableCell>{item.role_name}</TableCell>
                                        <TableCell>{item.division_name}</TableCell>
                                        <TableCell>{getFullDateByStrFromDb(item.created_at)}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                
            }
        </>
    );
}