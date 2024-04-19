import React, { useContext }  from 'react';
import UserContext from '@contexts/User/UserContext';
import ActionsContext from '@contexts/Actions/ActionsContext';
import { useNavigate } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FactoryIcon from '@mui/icons-material/Factory';
import HistoryIcon from '@mui/icons-material/History';

const ButtonSkeleton = ({title, icon, onClick}) => {
    return <Tooltip title={title}>
                <IconButton 
                    onClick={onClick}
                    aria-label={title}
                >
                    {icon}
                </IconButton>
            </Tooltip>
}

const EditBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Редактировать запись" icon={<EditIcon />}/>
}

const DeleteBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Удалить запись" icon={<DeleteIcon />}/>
}

const InArchiveBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Закрыть и перенести в архив" icon={<DoneAllIcon />}/>
}

// Принять в обработку (склад)
const HandleRequestWarehouseBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Принять в обработку" icon={<AppRegistrationIcon />}/>
}

const IndicateBalancesBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Указать остатки" icon={<DoneAllIcon />}/>
} 

const ArrivedInWarehouseBut = ({onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Материалы готовы к выдаче" icon={<DoneAllIcon />}/>
} 

const MaterialTransferredBut  = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Материал выдан/получен" icon={<DoneAllIcon />}/>
} 
// ================

// Принять в обработку (снабжение)
const HandleRequestSnabBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Принять в обработку" icon={<AppRegistrationIcon />}/>
}

//Указать,что материалы прибыли на склад
const MaterialsArrivedWarehouseBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Материалы прибыли на склад" icon={<WarehouseIcon />}/>
}

//Указать,что материалы прибыли на объект
const MaterialsArrivedObjectBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Материалы прибыли на объект" icon={<FactoryIcon />}/>
}

// Принять в обработку (контроль)
const HandleRequestControlBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Принять в обработку" icon={<AppRegistrationIcon />}/>
}

//Информация была исправлена контролёром
const MaterialsEditControlBut = ({ onClick }) => {
    return <ButtonSkeleton onClick={onClick} title="Подтвердить и отправить снабжению" icon={<DoneAllIcon />}/>
}


// Кнопки заказчика
const UserButtons = ({requestId, statusId}) => {
    const { actions } = useContext(ActionsContext);
    switch(statusId){// Выводим кнопки в зависимости от статуса заявки
        case 1:
            return <>
                <DeleteBut onClick={() => actions.deleteRequest(requestId)}/>
                <EditBut onClick={() => actions.editRequest(requestId)}/>
            </>
        case 10:
            return +statusId !== 11 && <InArchiveBut onClick={() => actions.inArchive(requestId)}/>
        default:
            break;
    }
}

// Кнопки зав.складом
const WarehouseButtons = ({requestId, statusId}) => {
    const { actions } = useContext(ActionsContext);
    switch (statusId) {
        case 1:
            return <HandleRequestWarehouseBut onClick={() => actions.handleRequestWarehouse(requestId)}/>
        case 2:
            return <IndicateBalancesBut onClick={() => actions.indicateBalances(requestId)}/>
        case 7:
            return <ArrivedInWarehouseBut onClick={() => actions.arrivedInWarehouse(requestId)}/>
        case 8:
            return <MaterialTransferredBut onClick={() => actions.materialTransferred(requestId)}/>
        case 9:
            return <MaterialTransferredBut onClick={() => actions.materialTransferred(requestId)}/>
        default:
            break;
    }
}

// Кнопки снабжения
const SnabButtons = ({ requestId, statusId }) => {
    const { actions } = useContext(ActionsContext);
    switch (statusId) {
        case 5:
            return <>
                <EditBut onClick={() => actions.editRequest(requestId)}/> 
                <HandleRequestSnabBut onClick={() => actions.handleRequestSnab(requestId)}/>
            </>;
        case 6:
            return <>
                <EditBut onClick={() => actions.editRequest(requestId)}/> 
                <MaterialsArrivedWarehouseBut onClick={() => actions.materialsArrivedWarehouse(requestId)}/>
                <MaterialsArrivedObjectBut onClick={() => actions.materialsArrivedObject(requestId)}/>
            </>
    
        default:
            break;
    }
}

// Кнопки контролёра
const ControlButtons = ({ requestId, statusId }) => {
    const { actions } = useContext(ActionsContext);
    switch (statusId) {
        case 3:
            return <>
                <HandleRequestControlBut onClick={() => actions.handleRequestControl(requestId)}/>
            </>;
        case 4:
            return <>
                <EditBut onClick={() => actions.editRequest(requestId)}/> 
                <MaterialsEditControlBut onClick={() => actions.confirmAndSendToSnab(requestId)}/> 
            </>
    
        default:
            break;
    }
}


export default function Tools({ data, isOpen, setOpen, hideButtons }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <>
            <Tooltip title="Развернуть список материалов">
                <IconButton
                    size="small"
                    onClick={() => setOpen(!isOpen)}
                >
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Tooltip>

            <Tooltip title="История">
                <IconButton
                    size="small"
                    // onClick={() => navigate(`${HISTORY_PAGE + data.blank_id}`)}
                >
                    <HistoryIcon/>
                </IconButton>
            </Tooltip>   

            {!hideButtons && 
                <>
                    {+user.role_id === 2 &&
                        <UserButtons requestId={+data.id} statusId={+data.status_id}/>
                    }
        
                    {+user.role_id === 3 &&
                        <WarehouseButtons requestId={+data.id} statusId={+data.status_id}/>
                    }
        
                    {+user.role_id === 4 &&
                        <SnabButtons requestId={+data.id} statusId={+data.status_id}/>
                    }
        
                    {+user.role_id === 5 &&
                        <ControlButtons requestId={+data.id} statusId={+data.status_id}/>
                    }
                
                </>
            }
        </>
    )
}
