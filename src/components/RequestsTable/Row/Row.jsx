import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';

export default function Row() {
  return (
    <>
        <TableRow>
            <TableCell>
                <Box className='flex justify-start items-center'>
                    {/* <Tools 
                        data={data} 
                        isOpen={isOpen} 
                        setOpen={setOpen}
                        hideButtons={hideButtons}
                    /> */}
                </Box>

            </TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">Склад</TableCell>
            <TableCell align="right">Иванов Иван Иванович</TableCell>
            <TableCell align="right">Объект</TableCell>
            <TableCell align="right">24.02.2022 16:32</TableCell>
            <TableCell align="center">
                Статус
                {/* <Status statusId={data.status_id} statusText={data.status_name} warehouseName={data.warehouse_name}/> */}
            </TableCell>
        </TableRow>   
    </>
  )
}
