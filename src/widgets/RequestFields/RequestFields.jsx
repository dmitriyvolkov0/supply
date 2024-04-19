import React from 'react';
import { TextField, IconButton, Button } from '@mui/material';
import s from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { REQUESTS_PAGE } from '@utils/constants/routes.js';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Accordion from '@components/Accordion/Accordion';

export default function RequestFields({ title, objectName, setObjectName, materials, setMaterials, emptyMaterial }) {
    const navigate = useNavigate();

    const addMaterial = () => {
        setMaterials([...materials, emptyMaterial]);
    }

    return (
        <>
            <h1 className={s.title}>
                <IconButton onClick={() => navigate(REQUESTS_PAGE)}>
                    <KeyboardBackspaceIcon/>
                </IconButton>
                {title}
            </h1>

            <div className={s.form}>
                <TextField 
                    required
                    label="Наименование объекта"
                    value={objectName} 
                    onChange={e => setObjectName(e.target.value)}
                />

                <Accordion 
                    materials={materials}
                    setMaterials={setMaterials}
                />
                
                <div className={s.formButtons}>
                    <Button type="submit" variant="contained">Создать заявку</Button>
                    <Button onClick={addMaterial} variant="contained" color="secondary">Добавить материал</Button>
                </div>
            </div>
        </>
    )
}
