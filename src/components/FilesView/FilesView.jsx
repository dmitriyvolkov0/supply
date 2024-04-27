import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Tooltip } from '@mui/material';
import s from './style.module.css';
import fileSizeConverter from '@utils/helpers/fileSizeConverter.js';

export default function FilesView({ files }) {
    
    return (
        <>
            {
                files && files.length > 0 &&
                    files.map((item, index) => 
                        <div 
                            key={"file-"+index}
                            className={s.wrapper}
                        >
                            <Tooltip title="Скачать файл">
                                <IconButton href={URL.createObjectURL(item)} download>
                                    <DownloadIcon/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={item.name}>
                                <p className={s.fileName}>{item.name}</p>
                            </Tooltip>

                            <p className={s.fileSize}>
                                {fileSizeConverter(item.size)}
                            </p>
                        </div>
                    )
            }
        </>
    )
}
