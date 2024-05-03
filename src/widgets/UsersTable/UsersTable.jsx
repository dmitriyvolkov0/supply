import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Preloader from '@components/Preloader/Preloader';
import EmptyTable from '@components/EmptyTable/EmptyTable';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import s from './style.module.css';

import { getFullDateByStrFromDb } from '@utils/helpers/timeFunctions.js';

export default function HistoryTable({ data }) {
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
                                            <IconButton className={s.itemButton}>
                                                <EditIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.password}</TableCell>
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