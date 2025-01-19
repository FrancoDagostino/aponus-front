import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { IPucharse } from '../model/pucharseList.model';
import { PucharseDetailComponent } from './PucharseDetail.component';
import { PucharseDetailSupplyComponent } from './PucharseDetailSupply.component';


interface IPurchaseViewModalComponentProps {
    purchase: IPucharse
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
                    <Typography fontSize={50} gutterBottom align="center" color="primary">
                        Información Detallada
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel1a-content' id='panel1a-header'>
                            <Typography>Listado de Insumos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PucharseDetailSupplyComponent details={props.purchase.detallesCompra} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel2a-content' id='panel2a-header'>
                            <Typography>Listado de Pagos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PucharseDetailComponent pucharse={props.purchase.pagos} />
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