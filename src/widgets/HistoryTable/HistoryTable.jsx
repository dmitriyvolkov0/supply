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

export default function HistoryTable({ history }) {
    return (
        <>
            { history === null && <Preloader/> }
            { history && history.length === 0 && <EmptyTable/> }
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
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Заявка создана</TableCell>
                                <TableCell>Андреев Андрей Андреевич</TableCell>
                                <TableCell>18.04.2024 11:42:45</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Заявка создана</TableCell>
                                <TableCell>Андреев Андрей Андреевич</TableCell>
                                <TableCell>18.04.2024 11:42:45</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Заявка создана</TableCell>
                                <TableCell>Андреев Андрей Андреевич</TableCell>
                                <TableCell>18.04.2024 11:42:45</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
}