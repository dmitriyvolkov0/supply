import React from 'react';
import { Box, Button } from '@mui/material';
import { CREATE_REQUEST_PAGE } from '@utils/constants/routes';
import { useNavigate } from 'react-router-dom';
import RefreshBut from '@components/RefreshBut/RefreshBut';

export default function RequestsToolBar({ getAllRequests }) {
    const navigate = useNavigate();
    return (
        <Box sx={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
            <Button onClick={() => navigate(CREATE_REQUEST_PAGE)} variant="outlined">Создать заявку</Button>
            <RefreshBut 
                onClick={getAllRequests}
                color="primary"    
            />
        </Box>
    )
}
