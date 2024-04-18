import React from 'react';
import Modal from '@components/Modal/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function IndicateBalancesModal({title, materials, setMaterials, setBalancesHandle, isOpen, setIsOpen}) {
    const buttons = () => {
        return <>
            <Button onClick={() => setIsOpen(false)}>Отмена</Button>
            <Button type="submit">Указать остатки</Button>
        </>
    }

    const changeInputHandle = (e, index) =>{
        materials[index].residue = e.target.value;
        setMaterials([...materials]);
    }

    const onSubmitForm = (e)=>{
        setBalancesHandle(materials);
    }

    return (
        <Modal 
            title={title}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            buttons={buttons()}
            onSubmitForm={onSubmitForm}
        >
            {
                materials &&
                    materials.map((item, index) => 
                        <TextField
                            key={'field-' + index}
                            margin='dense'
                            autoFocus
                            required
                            label={item.name}
                            onInput={(e) => changeInputHandle(e, index)}
                            value={materials[index].residue}
                            fullWidth
                        />
                    )
            }
        </Modal>
    )
}
