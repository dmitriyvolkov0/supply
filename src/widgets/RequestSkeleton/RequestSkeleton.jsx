import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

export default function RequestSkeleton() {
  return (
    <Box>
        <Skeleton sx={{margin: '20px 0 30px 0'}} variant="rectangular" width='100%' height={60} />
        <Skeleton variant="rectangular" width='100%' height={56} />
        <Skeleton sx={{margin: '5px 0'}} variant="rectangular" width='100%' height={56} />
        <Skeleton sx={{margin: '5px 0'}} variant="rectangular" width='100%' height={56} />
        <Skeleton sx={{margin: '5px 0'}} variant="rectangular" width='100%' height={56} />
        <Skeleton sx={{margin: '5px 0'}} variant="rectangular" width='100%' height={56} />
        <Box sx={{display: 'flex', gap: '10px'}}>
            <Skeleton sx={{margin: '5px 0'}} variant="rectangular" width='210px' height={56} />
            <Skeleton sx={{margin: '5px 0'}} variant="rectangular" width='190px' height={56} />
        </Box>
    </Box>
  )
}
