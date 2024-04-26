import React from 'react';
import { Box, Button } from '@mui/material';

export default function LazyLoadingBut({requests, perPage, setPerPage}) {
  return (
    <>
      {
        requests && requests.length >= perPage &&
          <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Button variant="contained" onClick={() => {setPerPage(perPage + 10); }}>Вывести еще 10</Button>
              <Button variant="contained" onClick={() => {setPerPage(perPage + 100); }}>Вывести еще 100</Button>
          </Box>
      }
    </>
  )
}
