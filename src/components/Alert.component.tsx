import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'

interface AlertModalProps {
    open: boolean
    onClose: () => void
    title: string
    message: string
    type: 'alert' | 'warning',
    confirmButton?: (() => void) | undefined

}

const AlertModal: React.FC<AlertModalProps> = ({ open, onClose, title, message, type, confirmButton }) => {
    const isAlert = type === 'alert'
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: isAlert ? '#ffebee' : '#fff3e0',
                    borderTop: `4px solid ${isAlert ? '#f44336' : '#ff9800'}`,
                },
            }}
        >
            <DialogTitle style={{ display: 'flex', alignItems: 'center', color: isAlert ? '#d32f2f' : '#f57c00' }}>
                {isAlert ? <ErrorIcon style={{ marginRight: '8px' }} /> : <WarningIcon style={{ marginRight: '8px' }} />}
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                {confirmButton && (
                    <Button
                        onClick={() => {
                            confirmButton(), onClose()
                        }}
                        color="primary"
                        variant="contained"
                    >
                        "Confirmar"
                    </Button>
                )}
                <Button onClick={onClose} color={isAlert ? 'error' : 'warning'} variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertModal

