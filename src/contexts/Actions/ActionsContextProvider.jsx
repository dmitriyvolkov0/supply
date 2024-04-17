import { useState } from "react";
import ActionsContext from './ActionsContext';

const ActionsProvider = ({ children }) => {
    const [actions, setActions] = useState(null);
    
    return (
        <ActionsContext.Provider value={{ actions, setActions }}>
            {children}
        </ActionsContext.Provider>
    );
}

export default ActionsProvider;