import React, { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '@contexts/User/UserContext';

import AvatarBlock from './AvatarBlock/AvatarBlock';
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
            <AvatarBlock 
                isOpen={isOpen} 
                firstLetters={firstLetters}
                setIsOpen={setIsOpen}
            />

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
