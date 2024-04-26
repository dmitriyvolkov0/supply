import React from 'react';
import MainLayout from '@layouts/MainLayout';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Box, Typography } from '@mui/material';

export default function ProfilePage() {
  return (
    <MainLayout>
        <Box sx={{display: 'flex', gap: '15px'}}>
            <Avatar sx={{ bgcolor: blue[400], fontSize: 45, width: 100, height: 100}}>
                ИС
            </Avatar>
            
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Typography sx={{fontSize: '25px'}}>Иванов Иван Иванович</Typography>
                <a href="mailto:ivanov@mail.ru">ivanov@mail.ru</a>
            </Box>
        </Box>
    </MainLayout>
  )
}
