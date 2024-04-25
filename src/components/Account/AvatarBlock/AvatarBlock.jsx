import React from 'react';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Box, Tooltip } from '@mui/material';

export default function AvatarBlock({ isOpen, setIsOpen, firstLetters }) {
  return (
    <Box onClick={() => setIsOpen(!isOpen)} sx={{cursor: 'pointer'}}>
        <Tooltip title="Профиль">
            <Avatar sx={{ bgcolor: blue[400], fontSize: 15}}>
                {firstLetters}
            </Avatar>
        </Tooltip>
    </Box>
  )
}
