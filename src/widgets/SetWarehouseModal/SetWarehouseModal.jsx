import React from 'react';
import Modal from '@components/Modal/Modal';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function IndicateBalancesModal({title, warehouses, setWarehouse, isOpen, setIsOpen}) {
    const buttons = () => {
        return <>
            <Button onClick={() => setIsOpen(false)}>Отмена</Button>
            <Button type="submit">Указать склад</Button>
        </>
    }

    const [radioValue, setRadioValue] = React.useState(1);
    
    const handleClose = () => {
        setIsOpen(false);
    };

    const onSubmitForm = () => {
        let requestId = isOpen[1];
        setWarehouse(requestId, radioValue);
        handleClose();
    }    

    return (
        <Modal 
            title={title}
            isOpen={isOpen && isOpen[0]}
            setIsOpen={setIsOpen}
            buttons={buttons()}
            onSubmitForm={onSubmitForm}
        >
            {
                <RadioGroup
                    defaultValue="1"
                    value={radioValue}
                    onChange={(e) => setRadioValue(+e.target.value)}
                >
                    {
                        warehouses && warehouses.map(item => 
                            <FormControlLabel 
                                key={item.id}
                                value={item.id} 
                                control={<Radio />} 
                                label={item.name} 
                            />
                        )
                    }
                </RadioGroup>
            }
        </Modal>
    )
}
