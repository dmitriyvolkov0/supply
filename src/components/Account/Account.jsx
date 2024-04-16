import React, { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '@contexts/User/UserContext';

import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { Tooltip, Button, Typography } from '@mui/material';

import AccountWindow from './AccountWindow/AccountWindow';


export default function Account() {
    const {user, setUser} = useContext(UserContext);
    const firstLetters = user.name.split(' ')[0][0] + user.name.split(' ')[1][0];
    const [isOpen, setIsOpen] = useState(false);

    const accountWindowWrapperRef = useRef(null);

    useEffect( () => {
        document.addEventListener("click", (e) => {
            e.target === accountWindowWrapperRef.current && setIsOpen(false);
        });
    }, []);

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)} className='md:ml-10 cursor-pointer'>
                <Tooltip title="Профиль">
                    <Avatar sx={{ bgcolor: blue[400], fontSize: 15}}>
                        {firstLetters}
                    </Avatar>
                </Tooltip>
            </div>

            {
                isOpen && 
                    <AccountWindow
                        user={user}
                        setUser={setUser}
                        accountWindowWrapperRef={accountWindowWrapperRef}
                        firstLetters={firstLetters}
                    />
            }
        </>
    )
}
