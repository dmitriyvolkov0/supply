import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadFileBut({ materialIndex, uploadFilesHandle }) {
    const handleFileUpload = (event) => {
        let files = Array.from(event.target.files);
        uploadFilesHandle(files, materialIndex);
    };

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{marginTop: '10px'}}
                startIcon={<CloudUploadIcon />}
                >
                    Прикрепить файлы
                    <VisuallyHiddenInput type="file" multiple onChange={handleFileUpload} />
            </Button>
        </>
    );
}