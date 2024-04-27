import React from 'react';
import s from './style.module.css'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import UploadFileBut from '@components/UploadFileBut/UploadFileBut';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

export default function MaterialsAccordion({ materials, setMaterials, disableAddFileBut }) {
    const deleteMaterial = (index) => {
        const newMaterials = [...materials];
        newMaterials.splice(index, 1);
        setMaterials(newMaterials);
    }

    const changeNameInput = (e, index) => {
        const newMaterials = [...materials];
        newMaterials[index] = {
            ...newMaterials[index],
            name: e.target.value
        };
        setMaterials(newMaterials);
    }
    
    const changeCountInput = (e, index) => {
        const newMaterials = [...materials];
        newMaterials[index] = {
            ...newMaterials[index],
            count: e.target.value
        };
        setMaterials(newMaterials);
    }
    
    const changeUnitInput = (e, index) => {
        const newMaterials = [...materials];
        newMaterials[index] = {
            ...newMaterials[index],
            unit: e.target.value
        };
        setMaterials(newMaterials);
    }
    
    const changeNoteInput = (e, index) => {
        const newMaterials = [...materials];
        newMaterials[index] = {
            ...newMaterials[index],
            note: e.target.value
        };
        setMaterials(newMaterials);
    }
    
    const changeLinkInput = (e, index) => {
        const newMaterials = [...materials];
        newMaterials[index] = {
            ...newMaterials[index],
            link: e.target.value
        };
        setMaterials(newMaterials);
    }

    const uploadFilesHandle = (files, index) =>{
        const newMaterials = [...materials];
        newMaterials[index] = {
            ...newMaterials[index],
            files: [...newMaterials[index].files, ...files]
        };
        setMaterials(newMaterials);
    }

    const deleteUploadFile = (materialIndex, fileIndex) => {
        const newMaterials = [...materials];
        const newFiles = [...newMaterials[materialIndex].files];
        newFiles.splice(fileIndex, 1);
        newMaterials[materialIndex] = {
            ...newMaterials[materialIndex],
            files: newFiles
        };
        setMaterials(newMaterials);
    }
    
    return (
        <div>
            {
                materials && materials.map((item, index) => 
                    <Accordion key={'material-'+index}>
                        <AccordionSummary sx={{ flexDirection: 'row-reverse', gap: 1 }} expandIcon={<ExpandMoreIcon />}>
                            
                            <div className={s.accordionTitle}>
                                <Typography>{item.name}</Typography>
                                {
                                    materials.length > 1 &&
                                        <IconButton onClick={() => deleteMaterial(index)} sx={{marginLeft: 'auto'}}>
                                            <DeleteIcon sx={{fontSize: '20px'}}/>
                                        </IconButton>
                                }
                            </div>
                            
                        </AccordionSummary>

                        <AccordionDetails>
                            <div className={s.fieldsWrapper}>
                                <TextField
                                    required
                                    value={materials[index].name}
                                    onInput={(e) => changeNameInput(e, index)}
                                    label="Наименование материала"
                                    type="text"
                                    className={s.materialNameField}
                                />
                                <TextField
                                    required
                                    value={materials[index].count}
                                    onInput={(e) => changeCountInput(e, index)}
                                    label="Кол-во"
                                    type="number"
                                    className={s.countField}
                                />
                                <TextField
                                    required
                                    value={materials[index].unit}
                                    onInput={(e) => changeUnitInput(e, index)}
                                    label="Единица измерения"
                                    type="text"
                                    className={s.unitField}
                                />
                            </div>

                            <TextField
                                value={materials[index].note}
                                onInput={(e) => changeNoteInput(e, index)}
                                sx={{marginTop: 1}}
                                label="Примечание (необязательно)"
                                type="text"
                                multiline
                                fullWidth
                                rows={3}
                            />

                            <TextField
                                value={materials[index].link}
                                onInput={(e) => changeLinkInput(e, index)}
                                sx={{marginTop: 1}}
                                label="Ссылка (необязательно)"
                                type="text"
                                fullWidth
                            />

                            <UploadFileBut 
                                materialIndex={index}
                                uploadFilesHandle={uploadFilesHandle}
                                disableAddFileBut={disableAddFileBut}
                            />


                            { materials[index].files && 
                                (
                                    materials[index].files.length > 0 ?
                                    <div className={s.filesWrapper}>
                                        <h3 className={s.filesTitle}>Прикрепленные файлы:</h3>
                                        {
                                            materials[index].files.map((item, fileIndex) => 
                                                <div className={s.fileItem} key={'file-' + fileIndex}>
                                                    <IconButton href={URL.createObjectURL(item)} download>
                                                        <DownloadIcon/>
                                                    </IconButton>
                                                    <p className={s.fileItemName}>
                                                        {item.name}
                                                    </p>
                                                    <IconButton disabled={disableAddFileBut} onClick={() => deleteUploadFile(index, fileIndex)}>
                                                        <CloseIcon 
                                                            disabled={disableAddFileBut} 
                                                            fontSize="small" 
                                                            sx={disableAddFileBut ? {} : {color: 'red'}}/>
                                                    </IconButton>
                                                </div>
                                            )
                                        }
                                    </div>
                                    :
                                    <div className={s.filesWrapper}>
                                        <p className={s.filesInform}>
                                            <InsertDriveFileIcon/>
                                            <span>Файлы не прикреплены!</span>
                                        </p>
                                    </div>
                                )
                            }

                        </AccordionDetails>
                    </Accordion>
                )
            }
        </div>
    )
}
