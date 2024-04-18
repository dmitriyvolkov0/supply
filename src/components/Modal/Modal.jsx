import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ title="Введите данные", isOpen, setIsOpen, size="xs", children, buttons, onSubmitForm }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    onSubmitForm(e);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={size}
        PaperProps={{
            component: 'form',
            onSubmit: onSubmitHandle
        }}
      >
        <DialogTitle>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>{title}</span>
                <IconButton onClick={handleClose}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box sx={{marginTop: 1}}>{children}</Box>
        </DialogContent>
        <DialogActions>
          {buttons}
        </DialogActions>
      </Dialog>
    </>
  );
}