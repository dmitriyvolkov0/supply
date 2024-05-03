import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';

export default function Tools({ item, editClickHandle, blockUnblockProfileHandle }) {
  return (
    <Box sx={{display: 'flex'}}>
        <Tooltip title="Редактировать профиль">
            <IconButton onClick={() => editClickHandle(item.id)}>
                <EditIcon/>
            </IconButton>
        </Tooltip>

        <Tooltip title="Заблокировать профиль">
            <IconButton onClick={() => blockUnblockProfileHandle(item.id, item.isBlocked)}>
                <LockIcon/>
            </IconButton>
        </Tooltip>
    </Box>
  )
}
