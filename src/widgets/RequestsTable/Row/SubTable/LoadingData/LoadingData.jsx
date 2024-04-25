import React from 'react';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';

export default function LoadingData() {
  return (
    <Box sx={{paddingTop: '10px', display: 'flex', alignItems: 'center', gap: '10px', color: '#777'}}>
        <HelpIcon/>
        <h3>Информация загружается</h3>                            
    </Box>
  )
}
