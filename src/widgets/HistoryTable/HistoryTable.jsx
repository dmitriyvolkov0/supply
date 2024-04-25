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

import { getFullDateByStrFromDb } from '@utils/helpers/timeFunctions.js';

export default function HistoryTable({ history }) {
    return (
        <>
            { history === null && <Preloader/> }
            { history && history.length === 0 && <EmptyTable title="История для данной заявки не найдена!"/> }
            { history && history.length > 0 && 
                
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell>Статус заявки</TableCell>
                                <TableCell>Кем обработана</TableCell>
                                <TableCell>Дата и время</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                history.map((item, index) => 
                                    <TableRow key={'history-'+index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{item.status_name}</TableCell>
                                        <TableCell>{item.user_name}</TableCell>
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