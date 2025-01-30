import React from 'react'
import { Snackbar, SnackbarContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Toast = ({ message, open, onClose, type = 'success' }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <SnackbarContent
        sx={{
          backgroundColor: type === 'error' ? 'error.main' : 'success.main',
          color: 'common.white',
          fontSize: '1rem',
          padding: '1rem',
          minWidth: '20rem',
          borderRadius: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        message={message}
        action={
          <IconButton onClick={onClose} sx={{ color: 'white' }} size="small">
            <CloseIcon />
          </IconButton>
        }
      />
    </Snackbar>
  )
}

export default Toast
