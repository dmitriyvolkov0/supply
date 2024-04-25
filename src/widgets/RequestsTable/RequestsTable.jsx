import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Row from './Row/Row';

import Preloader from '@components/Preloader/Preloader';
import EmptyTable from '@components/EmptyTable/EmptyTable';

export default function RequestsTable({ requests, hideButtons }) {
  return (
    <>
      { requests === null && <Preloader/>}
      { requests && requests.length === 0 && <EmptyTable/> }
      { requests && requests.length > 0 && 
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">№</TableCell>
                <TableCell align="right">Отдел</TableCell>
                <TableCell align="right">Заказчик</TableCell>
                <TableCell align="right">Объект</TableCell>
                <TableCell align="right">Затребовал</TableCell>
                <TableCell align="center">Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                requests && requests.map((item, index) => 
                  <Row data={item} hideButtons={hideButtons} key={'row-' + index}/>
                )
              }
            </TableBody>
          </Table>
        </TableContainer> 
      }
    </>
  );
}