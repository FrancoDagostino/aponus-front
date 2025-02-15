import { FC } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { ISale } from '../model/salesList.model';
import { SalesDetailSupplyComponent } from './SaleDetailSupply.component';
import { SaleDetailComponent } from './SaleDetail.component';


interface ISalesViewModalComponentProps {
    sales: ISale
    isOpen: boolean
    handleClose: () => void
}

export const SalesViewModalComponent: FC<ISalesViewModalComponentProps> = (props) => {


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
                            <Typography>Listado de Productos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SalesDetailSupplyComponent details={props.sales.detallesVenta} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel2a-content' id='panel2a-header'>
                            <Typography>Listado de Cuotas</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SaleDetailComponent paymentList={props.sales.cuotas} />
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