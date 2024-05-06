import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
// import LockIcon from '@mui/icons-material/Lock';

export default function Tools({ item, editClickHandle }) {
  return (
    <Box sx={{display: 'flex'}}>
        <Tooltip title="Редактировать профиль">
            <IconButton onClick={() => editClickHandle(item.id)}>
                <EditIcon/>
            </IconButton>
        </Tooltip>

        {/* <Tooltip title="Заблокировать профиль">
            <IconButton>
                <LockIcon/>
            </IconButton>
        </Tooltip> */}
    </Box>
  )
}
