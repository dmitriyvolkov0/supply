import React, { useState, useEffect, useContext } from 'react';
import ActionsContext from '@contexts/Actions/ActionsContext';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Tooltip } from '@mui/material';

import { Link  } from 'react-router-dom';
import LoadingData from './LoadingData/LoadingData';
import RefreshBut from '@components/RefreshBut/RefreshBut';

// icons
import IconButton from '@mui/material/IconButton';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import SummarizeIcon from '@mui/icons-material/Summarize';

import CircularProgress from '@mui/material/CircularProgress';

import { getMaterialsByRequestId, getFilesByMaterialId } from '@services/api.js';
import { b64toBlob } from '@utils/helpers/base64ToBlob.js';

export default function SubTable({ requestId, isOpen }) {
    const { actions } = useContext(ActionsContext);
    const [materialsList, setMaterialsList] = useState(null);

    // Получить материалы
    const getMaterials = () =>
        getMaterialsByRequestId(requestId)
            .then(res => {
                if(Array.isArray(res)){
                    let changedObj = res.map((item, index) => ({...item, files: null}) )
                    setMaterialsList(changedObj);
                    return changedObj;
                }
            })
            .then((res) => getFiles(res));

    // Получить файлы для каждого материала
    const getFiles = (materialsListObj) =>{
        materialsListObj && materialsListObj.map((item, index) => {
            let filesArr = [];
            getFilesByMaterialId(item.id)
                .then(files => {
                    files.map(file => {
                        const blob = b64toBlob(file.content, file.type); //Преобразовываем полученные файлы в File
                        const fileObject = new File([blob], file.name, { type: file.type });
                        filesArr.push(fileObject);
                    });
                })
                .then(() => {
                    materialsListObj[index].files = filesArr;
                    setMaterialsList([...materialsListObj]);
                })
                .catch(err => console.log('Ошибка получения вложений!'));
        });
    }

    useEffect(() => {
        isOpen && getMaterials();
    }, [isOpen]);

    useEffect(() => {
        getMaterials();
    }, []);

    const refreshClickHandle = () => getMaterials();

    return (
        <TableRow>
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
                                                <RefreshBut onClick={refreshClickHandle}/>
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
                                                        {
                                                            data.link.trim().length > 0 ?
                                                                <Tooltip title="Ссылка">
                                                                    <Link to={data.link} target="_blank">
                                                                        <IconButton color="primary">
                                                                                <InsertLinkIcon/>
                                                                        </IconButton>  
                                                                    </Link>
                                                                </Tooltip>
                                                            :
                                                                <IconButton disabled>
                                                                        <InsertLinkIcon/>
                                                                </IconButton>  
                                                                
                                                        }

                                                        {data.files === null ?
                                                            <Tooltip title="Загрузка вложения...">
                                                                    <IconButton>
                                                                        <CircularProgress style={{ width: '20px', height: '20px'}} />
                                                                    </IconButton>
                                                            </Tooltip>

                                                            : <>
                                                                {data.files.length > 0 ?
                                                                    <Tooltip title="Вложения">
                                                                        <IconButton onClick={() => actions.showFilesModal(data.files)} color="primary">
                                                                            <SummarizeIcon/>
                                                                        </IconButton> 
                                                                    </Tooltip>    
                                                                    :
                                                                    
                                                                    <IconButton disabled>
                                                                        <SummarizeIcon/>
                                                                    </IconButton> 
                                                                }
                                                            </>
                                                      
                                                        }
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
