import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, IconButton, Tooltip } from '@mui/material';

export default function FilesView({ files }) {
    return (
        <>
            {
                files && files.length > 0 &&
                    files.map((item, index) => 
                        <Box key={"file-"+index} sx={{display: 'flex', alignItems: 'center', gap: '10px', width:"350px", maxWidth: '100%'}}>
                            <Tooltip title="Скачать файл">
                                <IconButton href={URL.createObjectURL(item)} download>
                                    <DownloadIcon/>
                                </IconButton>
                            </Tooltip>
                            <p>
                                {item.name}
                            </p>
                        </Box>
                    )
            }
        </>
    )
}
