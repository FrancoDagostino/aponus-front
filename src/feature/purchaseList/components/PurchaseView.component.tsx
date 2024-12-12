import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { ICompras } from '../../entityList/model/EntityList.model';
import { ExpandMoreOutlined } from '@mui/icons-material';


interface IPurchaseViewModalComponentProps {
    purchase: ICompras
    isOpen: boolean
    handleClose: () => void
}

export const PurchaseViewModalComponent: FC<IPurchaseViewModalComponentProps> = (props) => {


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
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel1a-content' id='panel1a-header'>
                            <Typography>Listado de Insumos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Detalle
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel2a-content' id='panel2a-header'>
                            <Typography>Listado de Pagos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Detalle
                        </AccordionDetails>
                    </Accordion>
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