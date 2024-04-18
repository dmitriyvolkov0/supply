import React, { useState, useEffect } from 'react';
import s from './style.module.css'

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Link  } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import LoadingData from './LoadingData/LoadingData';

// icons
import IconButton from '@mui/material/IconButton';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CachedIcon from '@mui/icons-material/Cached';

import { getMaterialsByRequestId } from '@services/api.js';

export default function SubTable({ requestId, isOpen }) {

    const [materialsList, setMaterialsList] = useState(null);

    const getMaterials = () =>
        getMaterialsByRequestId(requestId)
            .then(res => Array.isArray(res) && setMaterialsList(res));

    useEffect(() => {
        isOpen && getMaterials();
    }, [isOpen]);

    useEffect(() => {
        getMaterials();
    }, []);

    const [isRotateBut, setIsRotateBut] = useState(false);
    const refreshClickHandle = () => {
        setIsRotateBut(true);
        setTimeout(() => setIsRotateBut(false), 1000);
        getMaterials();
    }

    return (
        <TableRow sx={{background: '#ddd'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    {!materialsList || materialsList.length === 0 ? 
                            <LoadingData/>
                        :
                            <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <span>№</span>
                                                <Tooltip title="Обновить информацию">
                                                    <IconButton onClick={refreshClickHandle} className={isRotateBut && s.refreshButActive}>
                                                        <CachedIcon/>
                                                    </IconButton>  
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>Наименование</TableCell>
                                            <TableCell align="right">Кол-во</TableCell>
                                            <TableCell align="right">Склад</TableCell>
                                            <TableCell align="right">Описание</TableCell>
                                            <TableCell align="right">Влож.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            materialsList.map((data, index) => 
                                                <TableRow key={'subtable-' + index}>
                                                    <TableCell component="th" scope="row">
                                                        {++index}
                                                    </TableCell>
                                                    <TableCell>{data.name}</TableCell>
                                                    <TableCell align="right">
                                                        {data.quantity} {data.unit}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.residue}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {data.note}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <IconButton disabled={data.link.trim().length === 0 ? true : false}>
                                                            <Link to={data.link} target="_blank">
                                                                <InsertLinkIcon/>
                                                            </Link>
                                                        </IconButton>  
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }

                                    </TableBody>
                                    
                                </Table>
                            </Box>
                    }
                    
                </Collapse>
            </TableCell>
        </TableRow>
    )
}
