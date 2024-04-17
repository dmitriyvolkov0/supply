import React from 'react';
import s from './style.module.css';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Tools from './Tools/Tools';
import Status from './Status/Status';
import SubTable from './SubTable/SubTable';

import { getFullDateByStrFromDb } from '@utils/helpers/timeFunctions.js';

export default function Row({ data, hideButtons }) {
    const [isOpen, setOpen] = React.useState(false);
    return (
        <>
            <TableRow>
                <TableCell>
                    <div className={s.tools}>
                        <Tools 
                            data={data} 
                            isOpen={isOpen} 
                            setOpen={setOpen}
                            hideButtons={hideButtons}
                        />
                    </div>

                </TableCell>
                <TableCell align="right">{data.id}</TableCell>
                <TableCell align="right">{data.division_name}</TableCell>
                <TableCell align="right">{data.user_name}</TableCell>
                <TableCell align="right">{data.text}</TableCell>
                <TableCell align="right">{getFullDateByStrFromDb(data.created_at)}</TableCell>
                <TableCell align="center">
                    <Status statusId={data.status_id} statusName={data.status_name} warehouseName={data.warehouse_name}/>
                </TableCell>
            </TableRow>   

            <SubTable requestId={data.id} isOpen={isOpen}/>
        </>
    )
}
