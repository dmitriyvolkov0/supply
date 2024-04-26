import React from 'react';
import Modal from '@components/Modal/Modal';
import Button from '@mui/material/Button';
import FilesView from '@components/FilesView/FilesView';

export default function IndicateBalancesModal({title, files, isOpen, setIsOpen}) {
    const buttons = () => {
        return <>
            <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
        </>
    }
    
    const handleClose = () => {
        setIsOpen(false);
    };

    const onSubmitForm = () => {
        handleClose();
    }    

    return (
        <Modal 
            title={title}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            buttons={buttons()}
            onSubmitForm={onSubmitForm}
        >
            <FilesView files={files}/>
        </Modal>
    )
}
