import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FC, useEffect, useState } from 'react';

interface ISnackBarComponentProps {
    message: string
    isOpen: boolean
}

export const SnackBarComponent: FC<ISnackBarComponentProps> = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.isOpen)
    }, [props.isOpen])

    const handleClose = (
        _?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}