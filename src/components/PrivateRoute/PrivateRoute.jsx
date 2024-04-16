import { useEffect, useContext } from 'react';
import UserContext from '@contexts/User/UserContext';
import { useNavigate } from 'react-router-dom';
import { AUTH_PAGE } from '@utils/constants/routes.js';
import Preloader from '@components/Preloader/Preloader';

export default function PrivateRoute({navTitle, children }) {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(user === false){
            navigate(AUTH_PAGE);
        }
    }, [user]);
    
    if(user === null){
        return <Preloader/>
    } 

    if(user){
        return(
            <div className='pt-[60px]'>
                {/* <Header navTitle={navTitle}/> */}
                { children }
            </div>
        )
    }
    
}