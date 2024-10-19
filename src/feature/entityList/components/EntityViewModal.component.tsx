import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Paper, Grid } from '@mui/material';
import { IEntity } from '../model/EntityList.model';


interface IEntityViewModalComponentProps {
    entity: IEntity
    isOpen: boolean
    handleClose: () => void
}

export const EntityViewModalComponent: FC<IEntityViewModalComponentProps> = (props) => {


    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: { borderRadius: 15, padding: '20px' }
                }}
            >
                <DialogTitle>
                    <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
                        Información Detallada
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                        <Grid container spacing={2}>
                            {Object.entries(props.entity).map(([key, value]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    <Box
                                        sx={{
                                            mb: 2,
                                            p: 2,
                                            backgroundColor: 'white',
                                            borderRadius: 2,
                                            boxShadow: 1
                                        }}
                                    >
                                        <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                                        </Typography>{' '}
                                        <Typography component="span">
                                            {value !== undefined ? String(value) : 'N/A'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.handleClose}
                        color="secondary"
                        variant="contained"
                        style={{ borderRadius: 20, padding: '10px 20px' }}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}