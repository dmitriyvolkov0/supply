import React from 'react';
import s from './style.module.css';

export default function Status({statusId, statusName, warehouseName}) {
    let colorClass;
    switch (+statusId) {
        case 2:
            colorClass = s.cl_2;
            break;
        case 3:
            colorClass = s.cl_3;
            break;
        case 4:
            colorClass = s.cl_4;
            break;
        case 5:
            colorClass = s.cl_5;
            break;
        case 6:
            colorClass = s.cl_6;
            break;
        case 7:
            colorClass = s.cl_7;
            break;
        case 8:
            colorClass = s.cl_8;
            break;
        case 9:
            colorClass = s.cl_9;
            break;
        case 10:
            colorClass = s.cl_10;
            break;
        case 11:
            colorClass = s.cl_11;
            break;
        default:
            colorClass = s.cl_1;
    }
    
    return (
        <div>
            <div className={`${colorClass} ${s.status}`}>
                {statusName}
                
                {/* {+statusId === 8 && warehouseName &&  */}
                {(+statusId === 8 || +statusId === 10 || +statusId === 11) && warehouseName && 
                    <p className={s.warehouseText}>
                        {warehouseName}
                    </p>
                }
            </div>
        </div>
    )
}
