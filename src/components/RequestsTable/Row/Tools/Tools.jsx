import React from 'react';
import { useNavigate } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactoryIcon from '@mui/icons-material/Factory';
import HistoryIcon from '@mui/icons-material/History';


export default function Tools({ isOpen, setOpen }) {
    const navigate = useNavigate();
    return (
        <>
            <Tooltip title="Развернуть список материалов">
                <IconButton
                    size="small"
                    onClick={() => setOpen(!isOpen)}
                >
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Tooltip>

            <Tooltip title="История">
                <IconButton
                    size="small"
                    // onClick={() => navigate(`${HISTORY_PAGE + data.blank_id}`)}
                >
                    <HistoryIcon/>
                </IconButton>
            </Tooltip>   
        </>
    )
}
