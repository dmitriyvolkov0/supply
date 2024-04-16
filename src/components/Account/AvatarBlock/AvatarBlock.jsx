import React from 'react';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Tooltip } from '@mui/material';

export default function AvatarBlock({ isOpen, setIsOpen, firstLetters }) {
  return (
    <div onClick={() => setIsOpen(!isOpen)} className='md:ml-10 cursor-pointer'>
        <Tooltip title="Профиль">
            <Avatar sx={{ bgcolor: blue[400], fontSize: 15}}>
                {firstLetters}
            </Avatar>
        </Tooltip>
    </div>
  )
}
