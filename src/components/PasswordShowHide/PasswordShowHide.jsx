import React, { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconButton, Box } from '@mui/material';

export default function PasswordShowHide({ value }) {
    const [isShow, setIsShow] = useState(false);

    const onShowClick = () => {
        setIsShow(true);
        setTimeout(() => setIsShow(false), 3000);
    }

    return (
        <div>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {
                    isShow ?
                        <p>{value}</p> 
                    :
                        <IconButton onClick={onShowClick}>
                            <RemoveRedEyeIcon/>
                        </IconButton>
                }
                
            </Box>
        </div>
    )
}
